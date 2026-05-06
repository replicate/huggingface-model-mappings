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
        hfModel: "tencent/HunyuanImage-2.1",
        providerModel: "tencent/hunyuan-image-2.1",
    },
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
        hfModel: "black-forest-labs/FLUX.2-klein-9B",
        providerModel: "black-forest-labs/flux-2-klein-9b",
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
    {
        hfModel: "ResembleAI/chatterbox",
        providerModel: "resemble-ai/chatterbox-turbo",
        task: "text-to-speech",
    },
    {
        hfModel: "ResembleAI/chatterbox-turbo",
        providerModel: "resemble-ai/chatterbox-turbo",
        task: "text-to-speech",
    },

    // Automatic Speech Recognition models
    {
        hfModel: "openai/whisper-large-v3",
        providerModel: "openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e",
        task: "automatic-speech-recognition",
    },
];
