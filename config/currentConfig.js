require("dotenv").config()
const dbConf = require('./dbConf');

const environment = process.env.NODE_ENV || 'dev';

const currentConfig = dbConf[environment];

if (!currentConfig) {
    throw new Error(`No database configuration found for environment: ${environment}`);
}

module.exports = currentConfig;