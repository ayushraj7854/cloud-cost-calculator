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