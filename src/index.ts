import { type InferenceModel, inferenceModels } from './models.js';

import HFInferenceProviderClient from './hf.js';

const hf = new HFInferenceProviderClient({provider: 'replicate'});

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

// Get Replicate model warm/cold statuses in parallel
const statuses = await Promise.all(inferenceModels.map(getModelStatus));

// Add status to each model object
const replicateModels = inferenceModels.map((model, index) => ({
    ...model,
    status: statuses[index],
}));

console.log("\n\nReplicate model mappings:");
console.log(replicateModels);

// Get all mappings from Hugging Face
const existingHFModelIds = await hf.listMappingIds();

console.log("\n\nExisting HF model IDs:");
console.log(existingHFModelIds);

const newMappings = replicateModels.filter(model => !existingHFModelIds.includes(model.hfModel));

const existingMappings = replicateModels.filter(model => existingHFModelIds.includes(model.hfModel));

if (newMappings.length > 0) {
	console.log("\n\nAdding new mappings:");
    for (const model of newMappings) {
        console.log(`${model.hfModel} - ${model.status}`);
        await hf.registerMappingItem(model);
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

console.log("\n\nDone!");