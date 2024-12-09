/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.config().parsed;

const targetPath = './src/environments/environment.prod.ts';

const envVariables = `
export const environment = {
  production: true,
  API_URL: '${envConfig.API_URL || 'http://localhost:8080'}',
  appVersion: '1.0.0',
  debug: false,
};
`;

fs.writeFileSync(targetPath, envVariables, { encoding: 'utf8' });
