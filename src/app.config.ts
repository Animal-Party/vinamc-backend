import * as path from 'path';
import * as fs from 'fs';

// Load configuration from JSON file properly
const configPath = path.join(process.cwd(), 'public', 'config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData);

const AppConfig = {
    ...config
};

export default AppConfig;