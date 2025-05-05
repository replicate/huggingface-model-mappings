import HFInferenceProviderClient from '../src/hf.js';

const mappingId = process.argv[2];

if (!mappingId) {
    console.error('Please provide a mapping ID as an argument');
    console.error('Usage: npm run delete-mapping -- <mapping-id>');
    process.exit(1);
}

const hf = new HFInferenceProviderClient();

const deleteMapping = async () => {
    console.log(`\nDeleting mapping: ${mappingId}`);
    try {
        await hf.deleteMappingItem(mappingId);
        console.log('Successfully deleted mapping');
    } catch (error) {
        console.error(`Error deleting mapping ${mappingId}:`, error);
        process.exit(1);
    }
};

await deleteMapping(); 