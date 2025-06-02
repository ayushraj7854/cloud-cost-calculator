// ============================================
// File: backend/src/utils/logger.js
// ============================================
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Custom log format
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(info => {
        let message = `${info.timestamp} [${info.level.toUpperCase()}]`;

        if (info.service) {
            message += ` [${info.service}]`;
        }

        message += `: ${info.message}`;

        if (info.stack) {
            message += `\n${info.stack}`;
        }

        if (info.meta && Object.keys(info.meta).length > 0) {
            message += `\nMeta: ${JSON.stringify(info.meta, null, 2)}`;
        }

        return message;
    })
);

// Create logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: {
        service: 'cloud-calculator-api',
        pid: process.pid
    },
    transports: [
        // Write all logs with level 'error' and below to error.log
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            tailable: true
        }),

        // Write all logs to combined.log
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            tailable: true
        }),

        // Write all logs with level 'info' and below to app.log
        new winston.transports.File({
            filename: path.join(logsDir, 'app.log'),
            level: 'info',
            maxsize: 5242880, // 5MB
            maxFiles: 3,
            tailable: true
        })
    ],

    // Handle exceptions
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'exceptions.log'),
            maxsize: 5242880,
            maxFiles: 2
        })
    ],

    // Handle rejections
    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(logsDir, 'rejections.log'),
            maxsize: 5242880,
            maxFiles: 2
        })
    ]
});

// If we're not in production, log to console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.printf(info => {
                return `${info.level}: ${info.message}`;
            })
        )
    }));
}

// Custom logging methods
const customLogger = {
    // Standard log levels
    error: function(message, meta = {}) {
        logger.error(message, { meta });
    },

    warn: function(message, meta = {}) {
        logger.warn(message, { meta });
    },

    info: function(message, meta = {}) {
        logger.info(message, { meta });
    },

    debug: function(message, meta = {}) {
        logger.debug(message, { meta });
    },

    // API request logging
    apiRequest: function(req, responseTime) {
        const message = `${req.method} ${req.originalUrl} - ${responseTime}ms`;
        const meta = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            responseTime: responseTime
        };

        if (req.user) {
            meta.userId = req.user.id;
        }

        logger.info(message, { meta });
    },

    // Database query logging
    dbQuery: function(query, duration, error = null) {
        const message = error ?
            `Database query failed: ${error.message}` :
            `Database query completed in ${duration}ms`;

        const meta = {
            query: query.substring(0, 200), // Limit query length
            duration,
            error: error ? error.message : null
        };

        if (error) {
            logger.error(message, { meta });
        } else {
            logger.debug(message, { meta });
        }
    },

    // Security events
    security: function(event, details = {}) {
        const message = `Security Event: ${event}`;
        logger.warn(message, { meta: { event, ...details } });
    },

    // Performance monitoring
    performance: function(operation, duration, details = {}) {
        const message = `Performance: ${operation} took ${duration}ms`;
        const level = duration > 1000 ? 'warn' : 'info'; // Warn if over 1 second

        logger[level](message, {
            meta: {
                operation,
                duration,
                ...details
            }
        });
    },

    // System events
    system: function(event, details = {}) {
        const message = `System Event: ${event}`;
        logger.info(message, { meta: { event, ...details } });
    }
};

module.exports = customLogger;

// ============================================
// File: backend/src/utils/cache.js
// ============================================
const NodeCache = require('node-cache');

// Create cache instance with configuration
const cache = new NodeCache({
    stdTTL: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour default
    checkperiod: 120, // Check for expired keys every 2 minutes
    useClones: false, // Better performance, but be careful with object references
    deleteOnExpire: true,
    enableLegacyCallbacks: false,
    maxKeys: parseInt(process.env.CACHE_MAX_SIZE) || 1000
});

// Cache statistics
let cacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    errors: 0
};

const cacheService = {
    // Get value from cache
    get: function(key) {
        try {
            const value = cache.get(key);
            if (value !== undefined) {
                cacheStats.hits++;
                return value;
            } else {
                cacheStats.misses++;
                return null;
            }
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache get error:', error);
            return null;
        }
    },

    // Set value in cache
    set: function(key, value, ttl) {
        try {
            const success = cache.set(key, value, ttl);
            if (success) {
                cacheStats.sets++;
            }
            return success;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache set error:', error);
            return false;
        }
    },

    // Delete from cache
    del: function(key) {
        try {
            const success = cache.del(key);
            if (success > 0) {
                cacheStats.deletes++;
            }
            return success > 0;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache delete error:', error);
            return false;
        }
    },

    // Check if key exists
    has: function(key) {
        try {
            return cache.has(key);
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache has error:', error);
            return false;
        }
    },

    // Get multiple keys
    mget: function(keys) {
        try {
            const result = cache.mget(keys);
            const foundKeys = Object.keys(result);
            cacheStats.hits += foundKeys.length;
            cacheStats.misses += keys.length - foundKeys.length;
            return result;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache mget error:', error);
            return {};
        }
    },

    // Set multiple keys
    mset: function(keyValuePairs) {
        try {
            const success = cache.mset(keyValuePairs);
            if (success) {
                cacheStats.sets += Object.keys(keyValuePairs).length;
            }
            return success;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache mset error:', error);
            return false;
        }
    },

    // Clear all cache
    clear: function() {
        try {
            cache.flushAll();
            cacheStats = {
                hits: 0,
                misses: 0,
                sets: 0,
                deletes: 0,
                errors: 0
            };
            return true;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache clear error:', error);
            return false;
        }
    },

    // Get cache statistics
    getStats: function() {
        const nodeStats = cache.getStats();
        return {
            ...nodeStats,
            ...cacheStats,
            hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0,
            size: nodeStats.keys
        };
    },

    // Get all keys
    keys: function() {
        try {
            return cache.keys();
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache keys error:', error);
            return [];
        }
    },

    // Get cache size
    getSize: function() {
        try {
            return cache.getStats().keys;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache getSize error:', error);
            return 0;
        }
    },

    // Cache with function execution
    wrap: async function(key, fn, ttl) {
        try {
            // Try to get from cache first
            let value = this.get(key);

            if (value !== null) {
                return value;
            }

            // Execute function and cache result
            value = await fn();
            this.set(key, value, ttl);

            return value;
        } catch (error) {
            cacheStats.errors++;
            console.error('Cache wrap error:', error);
            throw error;
        }
    },

    // Generate cache key for pricing data
    generatePricingKey: function(provider, service, region, instanceSize) {
        return `pricing:${provider}:${service}:${region}:${instanceSize}`;
    },

    // Generate cache key for calculation results
    generateCalculationKey: function(config, services) {
        const configStr = JSON.stringify(config);
        const servicesStr = services.sort().join(',');
        const combined = configStr + servicesStr;

        // Create a simple hash
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        return `calculation:${Math.abs(hash)}`;
    },

    // Cache pricing data with longer TTL
    setPricingData: function(provider, service, data) {
        const key = `pricing:${provider}:${service}`;
        const ttl = 24 * 60 * 60; // 24 hours for pricing data
        return this.set(key, data, ttl);
    },

    // Get pricing data
    getPricingData: function(provider, service) {
        const key = `pricing:${provider}:${service}`;
        return this.get(key);
    },

    // Cache calculation results with shorter TTL
    setCalculationResult: function(configHash, result) {
        const key = `calculation:${configHash}`;
        const ttl = 60 * 60; // 1 hour for calculation results
        return this.set(key, result, ttl);
    },

    // Get calculation result
    getCalculationResult: function(configHash) {
        const key = `calculation:${configHash}`;
        return this.get(key);
    }
};

// Cache event listeners
cache.on('set', function(key, value) {
    console.log(`Cache SET: ${key}`);
});

cache.on('del', function(key, value) {
    console.log(`Cache DEL: ${key}`);
});

cache.on('expired', function(key, value) {
    console.log(`Cache EXPIRED: ${key}`);
});

module.exports = cacheService;