export interface InferenceTag {
    type: 'tag-filter';
    task: string;
    tags: string[];
    providerModel: string;
    adapterType: 'lora';
    status?: 'live' | 'staging';
}

export const inferenceTags: InferenceTag[] = [
    {
        type: 'tag-filter',
        task: 'text-to-image',
        tags: ['lora', 'base_model:adapter:black-forest-labs/FLUX.1-dev'],
        providerModel: 'black-forest-labs/flux-dev-lora',
        adapterType: 'lora',
        status: 'live',
    }
];
