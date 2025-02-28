# Hugging Face Model Mappings

This repo contains a [mapping](src/models.ts) of Replicate models to Hugging Face models, for use with the [Inference Providers](https://huggingface.co/blog/inference-providers) feature on Hugging Face.

It also includes tooling to keep those mappings up to date using Hugging Face's API.

![screenshot](https://github.com/user-attachments/assets/5c742c5c-b8dd-4830-9a83-e05f5c9402c8)

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
