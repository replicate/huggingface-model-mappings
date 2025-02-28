# Hugging Face Model Mappings 🤗

In January 2025, Hugging Face announced [Inference Providers](https://huggingface.co/blog/inference-providers), a new feature that allows you to run models on Replicate (and other providers) right from the Hugging Face website.

## What is this repo?

This repo contains a [mapping](src/models.ts) of Replicate models to Hugging Face models, so we can tell Hugging Face when to display a Replicate inference widget on its model pages.

This repo also includes tooling to keep those mappings up to date using Hugging Face's Model Mappings API.

## Adding a new model

To add a new model mapping, edit the `src/models.ts` file and add the new model to the `inferenceModels` array, like so:

```typescript
{
    hfModel: "black-forest-labs/FLUX.1-schnell",      // Hugging Face model name
    providerModel: "black-forest-labs/flux-schnell",  // Replicate model name
    task: "text-to-image",                            // Task name
}
```

To see allowable values for `task`, refer to [huggingface.co/tasks](https://huggingface.co/tasks).

## Updating model mappings

To fetch Replicate model statuses and post updates to the Hugging Face model mappings API:

1. Make sure your user is a member of the [replicate organization](https://huggingface.co/organizations/replicate) on Hugging Face.
1. Create a [Hugging Face token](https://huggingface.co/settings/tokens/new?tokenType=fineGrained). It doesn't need to have any specific permissions.
1. Set the `HF_TOKEN` environment variable.
    ```bash
    export HF_TOKEN=<your-huggingface-token>
    ```
1. Run this command:
    ```bash
    npm install
    npm start
    ```
