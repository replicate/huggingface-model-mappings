import { type InferenceModel, inferenceModels } from './models.js';
import { type InferenceTag, inferenceTags } from './tags.js';

import HFInferenceProviderClient from './hf.js';

const hf = new HFInferenceProviderClient({provider: 'replicate'});

// Only some tasks are supported by HF's Inference Providers API
const supportedTasks = [
    'audio-text-to-text',
    'automatic-speech-recognition',
    'conversational',
    'feature-extraction',
    'fill-mask',
    'image-classification',
    'image-segmentation',
    'image-to-image',
    'object-detection',
    'question-answering',
    'summarization',
    'table-question-answering',
    'text-classification',
    'text-generation',
    'text-to-image',
    'text-to-speech',
    'text-to-video',
    'token-classification',
    'translation',
    'zero-shot-classification',
];

// Hit the Replicate API to get the warm/cold status for the given model
const getModelStatus = async (model: InferenceModel) => {
	try {
		const [modelName, _modelVersion] = model.providerModel.split(":");
		const modelUrl = `https://replicate.com/${modelName}/status`;

		const response = await fetch(modelUrl);
		const { status } = await response.json() as { status: string };

		return status === 'online' ? 'live' : 'staging';
	} catch {
		return 'staging';
	}
};

// Hit the Hugging Face API to get the Task™ type for the given model,
// e.g. "text-to-image", "image-to-image", "text-to-video", etc.
const getModelTask = async (model: InferenceModel) => {
	const response = await fetch(`https://huggingface.co/api/models/${model.hfModel}`);
	const data = await response.json() as { pipeline_tag: string };
	return data.pipeline_tag;
};

// Get Replicate model warm/cold statuses and Hugging Face tasks in parallel
const [statuses, tasks] = await Promise.all([
	Promise.all(inferenceModels.map(getModelStatus)),
	Promise.all(inferenceModels.map(getModelTask))
]);

// Set status and task (unless they're already manually defined on the model object)
const replicateModels = inferenceModels.map((model, index) => ({
    ...model,
    status: model.status ?? statuses[index],
    task: model.task ?? tasks[index],
}));

console.log("\n\nReplicate model mappings:");
console.log(replicateModels);

// Filter out models with unsupported task types before registering them
const unsupportedModels = replicateModels.filter(model => !supportedTasks.includes(model.task ?? ''));
const supportedModels = replicateModels.filter(model => supportedTasks.includes(model.task ?? ''));

if (unsupportedModels.length > 0) {
    console.log("\n\nDiscarding models with unsupported task types:");
    for (const model of unsupportedModels) {
        console.log(`${model.hfModel} - unsupported task: ${model.task}`);
    }
}

// Use only supported models for mapping operations
const existingHFModelIds = await hf.listMappingIds();

console.log("\n\nExisting HF model IDs:");
console.log(existingHFModelIds);

const newMappings = supportedModels.filter(model => !existingHFModelIds.includes(model.hfModel));
const existingMappings = supportedModels.filter(model => existingHFModelIds.includes(model.hfModel));

if (newMappings.length > 0) {
	console.log("\n\nAdding new mappings:");
    for (const model of newMappings) {
        console.log(`${model.hfModel} - ${model.status}`);
        try {
            await hf.registerMappingItem(model);
        } catch (error) {
            if (error instanceof Error && error.message.includes('409 Conflict')) {
                console.log(`Skipping existing mapping for model: ${model.hfModel}`);
                continue;
            }
            throw error;
        }
    }
} else {
	console.log("\n\nNo new mappings to add.");
}

if (existingMappings.length > 0) {
	console.log(`\n\nUpdating statuses for ${existingMappings.length} existing mappings:`);
    for (const model of existingMappings) {
        console.log(`${model.hfModel} - ${model.status}`);
        await hf.updateMappingItemStatus({
            hfModel: model.hfModel,
            status: model.status,
        });
    }
} else {
	console.log("\n\nNo existing mappings to update.");
}

// Handle tag mappings
console.log("\n\nReplicate tag mappings:");
console.log(inferenceTags);

// Register tag mappings
if (inferenceTags.length > 0) {
    console.log("\n\nAdding tag mappings:");
    for (const tag of inferenceTags) {
        console.log(`${tag.tags.join(', ')} - ${tag.status ?? 'live'}`);
        try {
            await hf.registerMappingItem(tag);
        } catch (error) {
            if (error instanceof Error && error.message.includes('409 Conflict')) {
                console.log(`Skipping existing mapping for tags: ${tag.tags.join(', ')}`);
                continue;
            }
            throw error;
        }
    }
} else {
    console.log("\n\nNo tag mappings to add.");
}

console.log("\n\nDone!");