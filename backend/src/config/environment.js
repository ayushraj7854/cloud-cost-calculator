const path = require('path');

// Load environment variables
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const environment = {
    // Application settings
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT) || 5000,
    HOST: process.env.HOST || 'localhost',

    // API settings
    API_VERSION: process.env.API_VERSION || 'v1',
    API_PREFIX: process.env.API_PREFIX || '/api',

    // Security settings
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
    BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,

    // Rate limiting
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15, // minutes
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100, // requests per window

    // Database settings
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT) || 5432,
    DB_NAME: process.env.DB_NAME || 'cloud_calculator',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',

    // Redis settings (for caching)
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: parseInt(process.env.REDIS_PORT) || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

    // Cloud provider API keys
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION || 'us-east-1',

    AZURE_SUBSCRIPTION_ID: process.env.AZURE_SUBSCRIPTION_ID,
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID,

    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_KEY_FILE: process.env.GCP_KEY_FILE,
    GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL,
    GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY,

    // Logging settings
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    LOG_FILE: process.env.LOG_FILE || 'logs/app.log',

    // CORS settings
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

    // Email settings (for notifications)
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT) || 587,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,

    // Monitoring and analytics
    SENTRY_DSN: process.env.SENTRY_DSN,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,

    // Feature flags
    ENABLE_CACHE: process.env.ENABLE_CACHE === 'true',
    ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING !== 'false',
    ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
    ENABLE_DEBUG: process.env.NODE_ENV === 'development',

    // Application URLs
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',

    // File upload settings
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '10MB',
    UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/',

    // Cache settings
    CACHE_TTL: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour in seconds
    CACHE_MAX_SIZE: parseInt(process.env.CACHE_MAX_SIZE) || 1000, // max items in cache
};

// Validation functions
const validateEnvironment = function() {
    const errors = [];

    // Check required environment variables
    const required = ['JWT_SECRET'];

    if (environment.NODE_ENV === 'production') {
        required.push('DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD');
    }

    required.forEach(key => {
        if (!environment[key]) {
            errors.push(`Missing required environment variable: ${key}`);
        }
    });

    // Validate JWT secret in production
    if (environment.NODE_ENV === 'production' && environment.JWT_SECRET === 'your-super-secret-jwt-key-change-in-production') {
        errors.push('JWT_SECRET must be changed in production');
    }

    // Validate port number
    if (isNaN(environment.PORT) || environment.PORT < 1 || environment.PORT > 65535) {
        errors.push('PORT must be a valid port number (1-65535)');
    }

    return errors;
};

// Get environment info
const getEnvironmentInfo = function() {
    return {
        nodeEnv: environment.NODE_ENV,
        port: environment.PORT,
        host: environment.HOST,
        apiVersion: environment.API_VERSION,
        databaseConfigured: !!(environment.DB_HOST && environment.DB_NAME),
        cacheEnabled: environment.ENABLE_CACHE,
        rateLimitingEnabled: environment.ENABLE_RATE_LIMITING,
        debugMode: environment.ENABLE_DEBUG,
        cloudProviders: {
            aws: !!(environment.AWS_ACCESS_KEY_ID && environment.AWS_SECRET_ACCESS_KEY),
            azure: !!(environment.AZURE_CLIENT_ID && environment.AZURE_CLIENT_SECRET),
            gcp: !!(environment.GCP_PROJECT_ID && (environment.GCP_KEY_FILE || environment.GCP_CLIENT_EMAIL))
        }
    };
};

// Check if running in development
const isDevelopment = function() {
    return environment.NODE_ENV === 'development';
};

// Check if running in production
const isProduction = function() {
    return environment.NODE_ENV === 'production';
};

// Check if running in test
const isTest = function() {
    return environment.NODE_ENV === 'test';
};

module.exports = {
    ...environment,
    validateEnvironment,
    getEnvironmentInfo,
    isDevelopment,
    isProduction,
    isTest
};