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
    {
        hfModel: "ByteDance/SDXL-Lightning",
        providerModel: "bytedance/sdxl-lightning-4step",
    },
    {
        hfModel: "ByteDance/Hyper-SD",
        providerModel: "bytedance/hyper-flux-16step",
    },
    {
        hfModel: "playgroundai/playground-v2.5-1024px-aesthetic",
        providerModel: "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24",
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
    {
        hfModel: "stabilityai/stable-diffusion-xl-base-1.0",
        providerModel: "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
    },
    {
        hfModel: "tencent/HunyuanImage-2.1",
        providerModel: "tencent/hunyuan-image-2.1",
    },
    {
        hfModel: "tencent/HunyuanImage-3.0",
        providerModel: "tencent/hunyuan-image-3",
    },
    {
        hfModel: "zeke/rider-waite-tarot-flux",
        providerModel: "tarot-cards/rider-waite:6d77a07ef88e8a09389385cb14d98b12629a4b23b0537b01dfeb833c32827546",
    },
    {
        hfModel: "Tongyi-MAI/Z-Image-Turbo",
        providerModel: "prunaai/z-image-turbo:7ea16386290ff5977c7812e66e462d7ec3954d8e007a8cd18ded3e7d41f5d7cf",
    },
    {
        hfModel: "black-forest-labs/FLUX.2-dev",
        providerModel: "black-forest-labs/flux-2-dev",
    },

    // Text-to-Video models
    {
        hfModel: "Wan-AI/Wan2.1-T2V-14B",
        providerModel: "wavespeedai/wan-2.1-t2v-480p",
        task: "text-to-video",
    },
    {
        hfModel: "Wan-AI/Wan2.1-T2V-1.3B",
        providerModel: "wan-video/wan-2.1-1.3b",
        task: "text-to-video",
    },
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
    {
        hfModel: "akhaliq/veo3.1-fast",
        providerModel: "google/veo-3.1-fast",
        task: "text-to-video",
    },

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

    // Text-to-Speech models
    {
        hfModel: "hexgrad/Kokoro-82M",
        providerModel: "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13",
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
