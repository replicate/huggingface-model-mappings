export interface InferenceModel {
    hfModel: string;
    providerModel: string;
    task?: string;

    // You can set this to force the value, e.g. to keep a model as 'staging' even if it's
    // warm/live on Replicate. If not set, the status will be inferred from the provider model
    status?: 'live' | 'staging';
}

export const inferenceModels: InferenceModel[] = [
    {
        hfModel: "deepseek-ai/DeepSeek-R1",
        providerModel: "deepseek-ai/deepseek-r1",
        status: "staging",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-dev",
        providerModel: "black-forest-labs/flux-dev",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-schnell",
        providerModel: "black-forest-labs/flux-schnell",
    },
    {
        hfModel: "ByteDance/Hyper-SD",
        providerModel: "bytedance/hyper-flux-16step:382cf8959fb0f0d665b26e7e80b8d6dc3faaef1510f14ce017e8c732bb3d1eb7",
    },
    {
        hfModel: "ByteDance/SDXL-Lightning",
        providerModel: "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
    },
    {
        hfModel: "playgroundai/playground-v2.5-1024px-aesthetic",
        providerModel: "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-large-turbo",
        providerModel: "stability-ai/stable-diffusion-3.5-large-turbo",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-large",
        providerModel: "stability-ai/stable-diffusion-3.5-large",
    },
    {
        hfModel: "stabilityai/stable-diffusion-3.5-medium",
        providerModel: "stability-ai/stable-diffusion-3.5-medium",
    },
    {
        hfModel: "stabilityai/stable-diffusion-xl-base-1.0",
        providerModel: "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
    },
    {
        hfModel: "Efficient-Large-Model/Sana_Sprint_1.6B_1024px_diffusers",
        providerModel: "nvidia/sana-sprint-1.6b",
    },
    {
        hfModel: "OuteAI/OuteTTS-0.3-500M",
        providerModel: "jbilcke/oute-tts:39a59319327b27327fa3095149c5a746e7f2aee18c75055c3368237a6503cd26",
    },
    {
        hfModel: "genmo/mochi-1-preview",
        providerModel: "genmoai/mochi-1:1944af04d098ef69bed7f9d335d102e652203f268ec4aaa2d836f6217217e460",
    },
    {
        hfModel: "Wan-AI/Wan2.1-T2V-14B",
        providerModel: "wavespeedai/wan-2.1-t2v-480p",
        task: "text-to-video",
    },
    // {
    //     hfModel: "Wan-AI/Wan2.1-I2V-14B-480P",
    //     providerModel: "wavespeedai/wan-2.1-i2v-480p",
    //     task: "image-to-video",
    // },
    // {
    //     hfModel: "Wan-AI/Wan2.1-I2V-14B-720P",
    //     providerModel: "wavespeedai/wan-2.1-i2v-720p",
    //     task: "image-to-video",
    // },
    {
        hfModel: "Wan-AI/Wan2.1-T2V-1.3B",
        providerModel: "wan-video/wan-2.1-1.3b",
    },
    {
        hfModel: "Lightricks/LTX-Video",
        providerModel: "lightricks/ltx-video:8c47da666861d081eeb4d1261853087de23923a268a69b63febdf5dc1dee08e4",
    },
    {
        hfModel: "zeke/rider-waite-tarot-flux",
        providerModel: "tarot-cards/rider-waite:6d77a07ef88e8a09389385cb14d98b12629a4b23b0537b01dfeb833c32827546",
    },
    {
        hfModel: "stepfun-ai/Step1X-Edit",
        providerModel: "zsxkib/step1x-edit",
    },
    {
        hfModel: "black-forest-labs/FLUX.1-Kontext-dev",
        providerModel: "black-forest-labs/flux-kontext-dev",
        task: "image-to-image",
    },
    {
        hfModel: "ResembleAI/chatterbox",
        providerModel: "resemble-ai/chatterbox",
    },
    {
        hfModel: "MeiGen-AI/MeiGen-MultiTalk",
        providerModel: "zsxkib/multitalk",
    },
    {
        hfModel: "Qwen/Qwen-Image",
        providerModel: "qwen/qwen-image",
    }
];
