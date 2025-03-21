const { Pool } = require('pg');
const dbConfig = require('../config/currentConfig.js');

const connection = new Pool(dbConfig);

connection.on('connect', () => {
    console.log('Database connected successfully');
});

connection.on('error', (err) => {
    console.error('Unexpected database error', err);
    process.exit(-1);
});

module.exports = connection;
