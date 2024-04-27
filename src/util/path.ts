import path from 'path';

export const rootDir = require.main ? path.dirname(require.main.filename) : __dirname;