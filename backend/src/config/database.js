const config = {
    development: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'cloud_calculator',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    test: {
        host: process.env.TEST_DB_HOST || 'localhost',
        port: process.env.TEST_DB_PORT || 5432,
        database: process.env.TEST_DB_NAME || 'cloud_calculator_test',
        username: process.env.TEST_DB_USER || 'postgres',
        password: process.env.TEST_DB_PASSWORD || 'password',
        dialect: 'postgres',
        logging: false
    },

    production: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: 'postgres',
        logging: false,
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 60000,
            idle: 10000
        }
    }
};

const currentConfig = config[process.env.NODE_ENV || 'development'];

module.exports = {
    config,
    currentConfig,

    // Database connection test function
    testConnection: async function() {
        try {
            console.log('Testing database connection...');
            console.log('Config:', {
                host: currentConfig.host,
                database: currentConfig.database,
                username: currentConfig.username,
                dialect: currentConfig.dialect
            });
            return { success: true, message: 'Database configuration loaded' };
        } catch (error) {
            console.error('Database connection test failed:', error);
            return { success: false, error: error.message };
        }
    }
};