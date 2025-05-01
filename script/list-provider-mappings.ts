import HFInferenceProviderClient from '../src/hf.js';

const provider = process.argv[2];

if (!provider) {
    console.error('Please provide a provider ID as an argument');
    console.error('Usage: npm run list-provider-mappings -- <provider-id>');
    process.exit(1);
}

const hf = new HFInferenceProviderClient();

const listProviderMappings = async () => {
    console.log(`\nFetching mappings for provider: ${provider}`);
    try {
        const mappings = await hf.getMappingsByProvider(provider);
        console.log(JSON.stringify(mappings, null, 2));
    } catch (error) {
        console.error(`Error fetching mappings for ${provider}:`, error);
        process.exit(1);
    }
};

await listProviderMappings(); 