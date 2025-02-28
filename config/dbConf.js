const dbConfigs = {
    dev: {
        user: 'dev',
        host: 'localhost',
        database: 'students_db_dev',
        password: 'Dbpass2',
        port: 5432,
    },
    release: {
        user: 'release',
        host: 'localhost',
        database: 'students_db_release',
        password: 'release_password',
        port: 5432,
    },
    main: {
        user: 'user',
        host: 'prod-db-host.example.com',
        database: 'prod_db',
        password: 'prod_password',
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

module.exports = dbConfigs;