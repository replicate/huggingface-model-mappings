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
    // Removed 2026-05-06: these route through pinned/community Replicate models.
    // HF's Replicate adapter cannot reliably serve those because pinned requests go
    // through /v1/predictions and unpinned community models do not expose deployments.
    // Re-enable only if they get official deployment endpoints or HF supports pinned routes.
    //   - ByteDance/SDXL-Lightning -> bytedance/sdxl-lightning-4step
    //   - ByteDance/Hyper-SD -> bytedance/hyper-flux-16step
    //   - playgroundai/playground-v2.5-1024px-aesthetic -> playgroundai/playground-v2.5-1024px-aesthetic
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
    // Not adding Qwen/Qwen-Image-Edit-2509 or Qwen/Qwen-Image-Edit-2511 yet:
    // those Replicate schemas expect `image` as an array, while HF's current
    // image-to-image adapter sends `image` as a string and `images` as an array.
    // Re-test after the adapter can target array-valued image inputs.
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
    // Removed 2026-05-06: stability-ai/sdxl has the same pinned/community routing issue
    // described above for the ByteDance and Playground mappings.
    //   - stabilityai/stable-diffusion-xl-base-1.0 -> stability-ai/sdxl
    {
        hfModel: "tencent/HunyuanImage-2.1",
        providerModel: "tencent/hunyuan-image-2.1",
    },
    {
        hfModel: "tencent/HunyuanImage-3.0",
        providerModel: "tencent/hunyuan-image-3",
    },
    // Removed 2026-05-06: community model with no unpinned deployment endpoint.
    //   - zeke/rider-waite-tarot-flux -> tarot-cards/rider-waite
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
    // Removed 2026-05-06: Wan2.1 variants exceed Replicate's 60s sync wait limit,
    // so HF receives incomplete predictions and reports malformed text-to-video output.
    //   - Wan-AI/Wan2.1-T2V-14B -> wavespeedai/wan-2.1-t2v-480p
    //   - Wan-AI/Wan2.1-T2V-1.3B -> wan-video/wan-2.1-1.3b
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
    // Removed 2026-05-06: Veo is gated on Replicate, so HF cannot create predictions.
    //   - akhaliq/veo3.1-fast -> google/veo-3.1-fast

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
    {
        hfModel: "black-forest-labs/FLUX.2-klein-base-9B",
        providerModel: "black-forest-labs/flux-2-klein-9b-base",
        task: "image-to-image"
    },

    // Text-to-Speech models
    // Removed 2026-05-06: Kokoro is a pinned community model with no HF-compatible
    // deployment route. Chatterbox covers the high-impact TTS slot with a compatible schema.
    //   - hexgrad/Kokoro-82M -> jaaari/kokoro-82m
    {
        hfModel: "ResembleAI/chatterbox",
        providerModel: "resemble-ai/chatterbox-turbo",
        task: "text-to-speech",
    },

    // Automatic Speech Recognition models
    // Removed 2026-05-06: cold pinned community ASR mapping; re-test with an audio
    // fixture before re-enabling.
    //   - microsoft/Phi-4-multimodal-instruct -> microsoft/phi-4-multimodal-instruct
    {
        hfModel: "openai/whisper-large-v3",
        providerModel: "openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e",
        task: "automatic-speech-recognition",
    },
];
