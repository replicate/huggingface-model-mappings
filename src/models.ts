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
        hfModel: "stabilityai/stable-diffusion-xl-base-1.0",
        providerModel: "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
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
        hfModel: "black-forest-labs/FLUX.1-schnell",
        providerModel: "black-forest-labs/flux-schnell",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-dev",
        providerModel: "black-forest-labs/flux-dev",
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
        hfModel: "zeke/rider-waite-tarot-flux",
        providerModel: "tarot-cards/rider-waite:6d77a07ef88e8a09389385cb14d98b12629a4b23b0537b01dfeb833c32827546",
    },
    {
        hfModel: "playgroundai/playground-v2.5-1024px-aesthetic",
        providerModel: "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24",
        status: "staging",
    },
    {
        hfModel: "Qwen/Qwen-Image",
        providerModel: "qwen/qwen-image",
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
        hfModel: "Lightricks/LTX-Video",
        providerModel: "lightricks/ltx-video:8c47da666861d081eeb4d1261853087de23923a268a69b63febdf5dc1dee08e4",
        task: "text-to-video",
    },
    {
        hfModel: "genmo/mochi-1-preview",
        providerModel: "genmoai/mochi-1:1944af04d098ef69bed7f9d335d102e652203f268ec4aaa2d836f6217217e460",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "BAAI/nova-d48w1024-osp480",
        providerModel: "chenxwh/nova-t2v",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "fofr/hunyuan-cyberpunk-mod",
        providerModel: "fofr/hunyuan-cyberpunk-mod",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "fofr/wan-14b-laezel",
        providerModel: "fofr/wan-14b-laezel",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "FastVideo/FastHunyuan",
        providerModel: "jzhang38/fast-hunyuan-video",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "FastVideo/FastMochi-diffusers",
        providerModel: "jzhang38/fast-mochi",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "tencent/HunyuanVideo",
        providerModel: "tencent/hunyuan-video",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "zai-org/CogVideoX-5b",
        providerModel: "thudm/cogvideox-t2v",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "rhymes-ai/Allegro",
        providerModel: "zsxkib/allegro",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "rain1011/pyramid-flow-sd3",
        providerModel: "zsxkib/pyramid-flow",
        task: "text-to-video",
        status: "staging",
    },
    {
        hfModel: "Wan-AI/Wan2.2-T2V-A14B",
        providerModel: "wan-video/wan-2.2-t2v-fast"
    },
    {
        hfModel: "Wan-AI/Wan2.2-I2V-A14B",
        providerModel: "wan-video/wan-2.2-i2v-fast",
    }

    // Image-to-Image models
    {
        hfModel: "black-forest-labs/FLUX.1-Kontext-dev",
        providerModel: "black-forest-labs/flux-kontext-dev",
        task: "image-to-image",
        status: "live",
    },

    // Text-to-Speech models
    {
        hfModel: "hexgrad/Kokoro-82M",
        providerModel: "jaaari/kokoro-82m:dfdf537ba482b029e0a761699e6f55e9162cfd159270bfe0e44857caa5f275a6",
        task: "text-to-speech",
        status: "staging",
    },

    // Automatic Speech Recognition models
    {
        hfModel: "pyannote/speaker-diarization-3.1",
        providerModel: "konieshadow/speaker-diarization",
        task: "automatic-speech-recognition",
        status: "staging",
    },
    {
        hfModel: "microsoft/Phi-4-multimodal-instruct",
        providerModel: "lucataco/phi-4-multimodal-instruct",
        task: "automatic-speech-recognition",
        status: "staging",
    },
    {
        hfModel: "openai/whisper-large-v3",
        providerModel: "openai/whisper",
        task: "automatic-speech-recognition",
        status: "staging",
    },
];
