import { readFile } from 'node:fs/promises';

const modelsJson = await readFile(new URL('./models.json', import.meta.url), 'utf-8');
const models = JSON.parse(modelsJson);



console.log(models);
