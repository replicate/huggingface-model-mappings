# Hugging Face Model Mappings 🤗

In January 2025, Hugging Face announced [Inference Providers](https://huggingface.co/blog/inference-providers), a new feature that allows you to run models on Replicate (and other providers) right from the Hugging Face website.

## What is this repo?

This repo contains a [mapping](src/models.ts) of Replicate models to Hugging Face models, so we can tell Hugging Face when to display a Replicate inference widget on its model pages.

This repo also includes tooling to keep those mappings up to date using Hugging Face's [Model Mappings API](https://huggingface.co/docs/inference-providers/register-as-a-provider#3-model-mapping-api).

## Adding a new model

To add a new model mapping, edit [src/models.ts](src/models.ts) 

Add your new model to the `inferenceModels` array, like so:

```typescript
{
    hfModel: "black-forest-labs/FLUX.1-schnell",      // Hugging Face model name
    providerModel: "black-forest-labs/flux-schnell",  // Replicate model name
    task: "text-to-image",                            // Task name
}
```

To see allowable values for `task`, refer to [huggingface.co/tasks](https://huggingface.co/tasks).

## Adding a new tag mapping

To add a new tag mapping, edit [src/tags.ts](src/tags.ts)

Add your new tag to the `inferenceTags` array, like so:

```typescript
{
    type: 'tag-filter',
    task: 'text-to-image',
    tags: ['flux', 'lora'],
    providerModel: 'black-forest-labs/flux-dev-lora',
    adapterType: 'lora',
    status: 'live',
}
```

Tag mappings allow you to map multiple Hugging Face models to a single Replicate model based on their tags. This is useful when you have a single Replicate model that can handle multiple variations of a model (like different LoRA adapters).

## Updating model mappings

This repo uses a [GitHub Actions workflow](.github/workflows/sync.yml) to keep the model mappings up to date, as well as model warm/cold states.

The workflow runs on a schedule and is triggered on every push to the main branch, so **you probably don't need to do anything!**.

But if you need to run the sync manually, here's how:

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
