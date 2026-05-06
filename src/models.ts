export interface InferenceModel {
    hfModel: string;
    providerModel: string;
    task?: string;

    // You can set this to force the value, e.g. to keep a model as 'staging' even if it's
    // warm/live on Replicate. If not set, the status will be inferred from the provider model
    status?: 'live' | 'staging';
}

export const inferenceModels: InferenceModel[] = [
    // Text-to-Image models
    {
        hfModel: "black-forest-labs/FLUX.1-dev",
        providerModel: "black-forest-labs/flux-dev",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-Krea-dev",
        providerModel: "black-forest-labs/flux-krea-dev",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-schnell",
        providerModel: "black-forest-labs/flux-schnell",
    },
    {
        hfModel: "briaai/FIBO",
        providerModel: "bria/fibo",
    },
    // REMOVED 2026-05-06 — these Replicate models are version-pinned community models.
    // HF's inference router rejects pinned `version:` requests ("Model not supported by provider replicate"),
    // and Replicate returns 404 for unpinned `v1/models/<m>/predictions` because they have no deployment endpoint.
    // Healthcheck (script/healthcheck.ts) proved no path can route HF inference to these models.
    // Re-enable when these get a deployment endpoint on Replicate or when HF allows pinned predictions.
    //   - ByteDance/SDXL-Lightning  → bytedance/sdxl-lightning-4step
    //   - ByteDance/Hyper-SD        → bytedance/hyper-flux-16step
    //   - playgroundai/playground-v2.5-1024px-aesthetic → playgroundai/playground-v2.5-1024px-aesthetic
    {
        hfModel: "HiDream-ai/HiDream-I1-Fast",
        providerModel: "prunaai/hidream-l1-fast",
    },
    {
        hfModel: "Qwen/Qwen-Image",
        providerModel: "qwen/qwen-image",
    },
    {
        hfModel: "Qwen/Qwen-Image-Edit",
        providerModel: "qwen/qwen-image-edit",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3-medium",
        providerModel: "stability-ai/stable-diffusion-3",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-medium",
        providerModel: "stability-ai/stable-diffusion-3.5-medium",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-large",
        providerModel: "stability-ai/stable-diffusion-3.5-large",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-large-turbo",
        providerModel: "stability-ai/stable-diffusion-3.5-large-turbo",
    },
    // REMOVED 2026-05-06 — see ByteDance block above. stability-ai/sdxl has no unpinned endpoint
    // and pinned versions are rejected by the HF router.
    //   - stabilityai/stable-diffusion-xl-base-1.0 → stability-ai/sdxl
    {
        hfModel: "tencent/HunyuanImage-2.1",
        providerModel: "tencent/hunyuan-image-2.1",
    },
    {
        hfModel: "tencent/HunyuanImage-3.0",
        providerModel: "tencent/hunyuan-image-3",
    },
    // REMOVED 2026-05-06 — see ByteDance block above (no unpinned endpoint).
    //   - zeke/rider-waite-tarot-flux → tarot-cards/rider-waite
    {
        hfModel: "Tongyi-MAI/Z-Image-Turbo",
        providerModel: "prunaai/z-image-turbo",
    },
    {
        hfModel: "black-forest-labs/FLUX.2-dev",
        providerModel: "black-forest-labs/flux-2-dev",
    },
    {
        hfModel: "Qwen/Qwen-Image-2512",
        providerModel: "qwen/qwen-image-2512",
    },

    // Text-to-Video models
    // REMOVED 2026-05-06 — Wan2.1 models exceed Replicate's 60s sync wait limit (1.3b takes ~108s).
    // HF's adapter receives an incomplete prediction and throws "malformed response from text-to-video API".
    // Re-enable when a faster Wan2.1 variant exists on Replicate.
    //   - Wan-AI/Wan2.1-T2V-14B  → wavespeedai/wan-2.1-t2v-480p
    //   - Wan-AI/Wan2.1-T2V-1.3B → wan-video/wan-2.1-1.3b
    {
        hfModel: "Wan-AI/Wan2.2-T2V-A14B",
        providerModel: "wan-video/wan-2.2-t2v-fast",
        task: "text-to-video",
    },
    {
        hfModel: "Wan-AI/Wan2.2-TI2V-5B",
        providerModel: "wan-video/wan-2.2-5b-fast",
        task: "text-to-video",
    },
    {
        hfModel: "Wan-AI/Wan2.2-T2V-A14B-Diffusers",
        providerModel: "wan-video/wan-2.2-t2v-fast",
        task: "text-to-video",
    },
    // Removed akhaliq/veo3.1-fast → google/veo-3.1-fast: HF inference proxy is denied POST access
    // (Veo on Replicate is gated; HF cannot create predictions). Verified by healthcheck.

    // Image-to-Video models
    {
        hfModel: "Wan-AI/Wan2.2-I2V-A14B",
        providerModel: "wan-video/wan-2.2-i2v-fast",
    },
    {
        hfModel: "Lightricks/LTX-Video",
        providerModel: "lightricks/ltx-video",
    },

    // Image-to-Image models
    {
        hfModel: "black-forest-labs/FLUX.1-Kontext-dev",
        providerModel: "black-forest-labs/flux-kontext-dev",
        task: "image-to-image",
    },
    {
        hfModel: "black-forest-labs/FLUX.2-klein-4B",
        providerModel: "black-forest-labs/flux-2-klein-4b",
        task: "image-to-image"
    },
    {
        hfModel: "black-forest-labs/FLUX.2-klein-base-4B",
        providerModel: "black-forest-labs/flux-2-klein-4b-base",
        task: "image-to-image"
    },

    // Text-to-Speech models
    {
        hfModel: "ResembleAI/chatterbox",
        providerModel: "resemble-ai/chatterbox-turbo",
        task: "text-to-speech",
    },

    // Automatic Speech Recognition models
    {
        hfModel: "microsoft/Phi-4-multimodal-instruct",
        providerModel: "microsoft/phi-4-multimodal-instruct:40c8f5c03ce250441855e776528bafd11cdb302c6677613acc0942c58dbd0afa",
        task: "automatic-speech-recognition",
    },
    {
        hfModel: "openai/whisper-large-v3",
        providerModel: "openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e",
        task: "automatic-speech-recognition",
    },
];
