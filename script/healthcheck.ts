/**
 * Health-check live Replicate mappings by sending tiny test inferences via HF's inference router.
 * For each live mapping, fires a 60-90s test request, categorizes:
 *   - ok: HF returned successful output
 *   - timeout: request exceeded timeout (likely cold or slow)
 *   - error: HF / Replicate returned an error
 *   - skipped: requires binary input we can't easily synthesize (image-to-image, ASR)
 *
 * Usage:  HF_TOKEN=... npx tsx script/healthcheck.ts
 *         HF_TOKEN=... npx tsx script/healthcheck.ts --concurrency=4 --timeout=90
 */
import { InferenceClient } from '@huggingface/inference';

if (!process.env.HF_TOKEN) {
    console.error('HF_TOKEN env var required');
    process.exit(1);
}

const args = Object.fromEntries(
    process.argv.slice(2)
        .filter(a => a.startsWith('--'))
        .map(a => {
            const [k, v] = a.replace(/^--/, '').split('=');
            return [k, v ?? 'true'];
        })
);

const concurrency = parseInt(args.concurrency || '4', 10);
const timeoutMs = parseInt(args.timeout || '90', 10) * 1000;
const onlyTask = args.task as string | undefined;

const hf = new InferenceClient(process.env.HF_TOKEN!);

interface Mapping {
    hfModel: string;
    task: string;
    providerId: string;
}

interface Result {
    hfModel: string;
    task: string;
    providerId: string;
    status: 'ok' | 'timeout' | 'error' | 'skipped';
    detail: string;
    durationMs: number;
}

const fetchLiveMappings = async (): Promise<Mapping[]> => {
    // Read all hfModels from src/models.ts and resolve their live mapping on HF
    const fs = await import('node:fs/promises');
    const src = await fs.readFile('src/models.ts', 'utf8');
    const ids = Array.from(src.matchAll(/hfModel:\s*"([^"]+)"/g)).map(m => m[1]);
    const out: Mapping[] = [];
    for (const id of ids) {
        const r = await fetch(`https://huggingface.co/api/models/${id}?expand[]=inferenceProviderMapping`);
        const data = await r.json() as any;
        const mapping = data.inferenceProviderMapping?.replicate;
        if (mapping?.status === 'live') {
            out.push({ hfModel: id, task: mapping.task, providerId: mapping.providerId });
        }
    }
    return out;
};

const withTimeout = <T>(p: Promise<T>, ms: number, label: string): Promise<T> => {
    return Promise.race([
        p,
        new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timeout after ${ms}ms (${label})`)), ms)),
    ]);
};

const testMapping = async (m: Mapping): Promise<Result> => {
    const start = Date.now();
    const baseResult = { hfModel: m.hfModel, task: m.task, providerId: m.providerId };

    try {
        let detail = '';
        switch (m.task) {
            case 'text-to-image': {
                const blob = await withTimeout(
                    hf.textToImage({ provider: 'replicate', model: m.hfModel, inputs: 'a small red cube' }),
                    timeoutMs, m.hfModel,
                );
                detail = `image ${blob.type} ${blob.size}b`;
                break;
            }
            case 'text-to-video': {
                const blob = await withTimeout(
                    hf.textToVideo({ provider: 'replicate', model: m.hfModel, inputs: 'a small red cube on a table' }),
                    timeoutMs, m.hfModel,
                );
                detail = `video ${blob.type} ${blob.size}b`;
                break;
            }
            case 'text-to-speech': {
                const blob = await withTimeout(
                    hf.textToSpeech({ provider: 'replicate', model: m.hfModel, inputs: 'Hello world' }),
                    timeoutMs, m.hfModel,
                );
                detail = `audio ${blob.type} ${blob.size}b`;
                break;
            }
            case 'image-to-image':
            case 'image-to-video':
            case 'automatic-speech-recognition':
                return { ...baseResult, status: 'skipped', detail: `requires binary input`, durationMs: 0 };
            default:
                return { ...baseResult, status: 'skipped', detail: `untested task: ${m.task}`, durationMs: 0 };
        }
        return { ...baseResult, status: 'ok', detail, durationMs: Date.now() - start };
    } catch (e: any) {
        const msg = (e.message || String(e)).slice(0, 250);
        const isTimeout = /timeout/i.test(msg);
        return {
            ...baseResult,
            status: isTimeout ? 'timeout' : 'error',
            detail: msg,
            durationMs: Date.now() - start,
        };
    }
};

// Simple concurrency pool
const pool = async <T, R>(items: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> => {
    const results: R[] = new Array(items.length);
    let cursor = 0;
    const workers = Array.from({ length: Math.min(n, items.length) }, async () => {
        while (cursor < items.length) {
            const i = cursor++;
            results[i] = await fn(items[i]);
        }
    });
    await Promise.all(workers);
    return results;
};

console.log('Loading live mappings...');
const mappings = (await fetchLiveMappings()).filter(m => !onlyTask || m.task === onlyTask);
console.log(`Found ${mappings.length} live mappings to test (task filter: ${onlyTask ?? 'any'})\n`);

const results = await pool(mappings, concurrency, async (m) => {
    process.stdout.write(`→ ${m.hfModel} (${m.task})... `);
    const r = await testMapping(m);
    const icon = r.status === 'ok' ? '✓' : r.status === 'skipped' ? '–' : '✗';
    console.log(`${icon} ${r.status} (${r.durationMs}ms) ${r.detail.slice(0, 100)}`);
    return r;
});

console.log('\n\n===== SUMMARY =====');
const grouped = results.reduce((acc, r) => {
    (acc[r.status] ??= []).push(r);
    return acc;
}, {} as Record<string, Result[]>);

for (const k of ['ok', 'timeout', 'error', 'skipped']) {
    console.log(`\n${k.toUpperCase()} (${grouped[k]?.length ?? 0}):`);
    for (const r of grouped[k] ?? []) {
        console.log(`  ${r.hfModel.padEnd(50)} ${r.task.padEnd(28)} ${r.detail.slice(0, 80)}`);
    }
}

console.log('\nFor failures, consider deleting the mapping with: npm run delete-mapping -- <hfModel>');
