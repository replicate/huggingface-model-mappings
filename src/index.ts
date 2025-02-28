import { type InferenceModel, inferenceModels } from './models.js';

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

const getAllModelStatuses = async () => {
	const statuses = await Promise.all(inferenceModels.map(getModelStatus));

const models = inferenceModels.map((model, index) => ({
    ...model,
    status: statuses[index],
	}));

	return models;
};


const models = await getAllModelStatuses();

console.log(models);