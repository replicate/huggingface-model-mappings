const providers = [
    'cerebras',
    'cohere',
    'fal-ai',
    'fireworks',
    'hyperbolic',
    'hf-inference',
    'nebius',
    'novita',
    'replicate',
    'sambanova',
    'together'
] as const;

console.log(JSON.stringify(providers, null, 2)); 