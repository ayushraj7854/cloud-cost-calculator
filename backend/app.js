const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import middleware
const corsMiddleware = require('./src/middleware/cors');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const { generalLimiter } = require('./src/middleware/rateLimiter');

// Import routes
const pricingRoutes = require('./src/routes/pricing');
const calculatorRoutes = require('./src/routes/calculator');
const healthRoutes = require('./src/routes/health');

// Import utilities
const logger = require('./src/utils/logger');

// Create Express app
const app = express();

// ============================================
// Security & Basic Middleware
// ============================================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

app.use(compression());
app.use(corsMiddleware);

// ============================================
// Logging
// ============================================
// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// HTTP request logging
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }));
} else {
    app.use(morgan('dev'));
}

// ============================================
// Body Parsing & Rate Limiting
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general rate limiting
app.use(generalLimiter);

// ============================================
// Health Check (Before Other Routes)
// ============================================
app.use('/health', healthRoutes);

// Basic root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Cloud Cost Calculator API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            pricing: '/api/pricing',
            calculator: '/api/calculator'
        },
        documentation: {
            swagger: '/api/docs',
            postman: '/api/postman-collection'
        }
    });
});

// ============================================
// API Routes
// ============================================
app.use('/api/pricing', pricingRoutes);
app.use('/api/calculator', calculatorRoutes);

// ============================================
// API Documentation (Optional)
// ============================================
app.get('/api/docs', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Cloud Cost Calculator API Documentation',
        version: '1.0.0',
        baseUrl: req.protocol + '://' + req.get('host'),
        endpoints: [{
                path: '/health',
                method: 'GET',
                description: 'Health check endpoint',
                example: '/health'
            },
            {
                path: '/health/status',
                method: 'GET',
                description: 'Detailed system status',
                example: '/health/status'
            },
            {
                path: '/health/ready',
                method: 'GET',
                description: 'Readiness check',
                example: '/health/ready'
            },
            {
                path: '/api/pricing/:provider',
                method: 'GET',
                description: 'Get pricing for a cloud provider',
                parameters: ['provider: aws|azure|gcp'],
                example: '/api/pricing/aws'
            },
            {
                path: '/api/pricing/:provider/:service',
                method: 'GET',
                description: 'Get pricing for specific service',
                parameters: ['provider: aws|azure|gcp', 'service: compute|storage|database|network'],
                example: '/api/pricing/aws/compute'
            },
            {
                path: '/api/calculator/compare',
                method: 'POST',
                description: 'Compare costs across cloud providers',
                body: {
                    configuration: {
                        region: 'string',
                        instanceSize: 'string',
                        usageHours: 'number',
                        storageGB: 'number (optional)',
                        dataTransferGB: 'number (optional)',
                        databaseSizeGB: 'number (optional)'
                    },
                    selectedServices: ['array of service names']
                },
                example: 'POST /api/calculator/compare'
            },
            {
                path: '/api/calculator/estimate',
                method: 'POST',
                description: 'Get cost estimate for single provider',
                body: {
                    provider: 'aws|azure|gcp',
                    configuration: 'object',
                    selectedServices: 'array'
                },
                example: 'POST /api/calculator/estimate'
            },
            {
                path: '/api/calculator/optimize',
                method: 'POST',
                description: 'Get optimization recommendations',
                body: {
                    currentConfig: 'object',
                    requirements: 'object'
                },
                example: 'POST /api/calculator/optimize'
            }
        ],
        examples: {
            compareRequest: {
                configuration: {
                    region: 'us-east-1',
                    instanceSize: 'medium',
                    usageHours: 730,
                    storageGB: 100,
                    dataTransferGB: 50,
                    databaseSizeGB: 20
                },
                selectedServices: ['compute', 'storage', 'database', 'network']
            },
            estimateRequest: {
                provider: 'aws',
                configuration: {
                    region: 'us-east-1',
                    instanceSize: 'large',
                    usageHours: 730
                },
                selectedServices: ['compute', 'storage']
            }
        }
    });
});

// Postman collection endpoint
app.get('/api/postman-collection', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');

    const postmanCollection = {
        info: {
            name: 'Cloud Cost Calculator API',
            description: 'API for comparing cloud costs across AWS, Azure, and GCP',
            version: '1.0.0',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        variable: [{
            key: 'baseUrl',
            value: baseUrl,
            type: 'string'
        }],
        item: [{
                name: 'Health Check',
                request: {
                    method: 'GET',
                    header: [],
                    url: {
                        raw: '{{baseUrl}}/health',
                        host: ['{{baseUrl}}'],
                        path: ['health']
                    }
                }
            },
            {
                name: 'Get AWS Pricing',
                request: {
                    method: 'GET',
                    header: [],
                    url: {
                        raw: '{{baseUrl}}/api/pricing/aws',
                        host: ['{{baseUrl}}'],
                        path: ['api', 'pricing', 'aws']
                    }
                }
            },
            {
                name: 'Compare Costs',
                request: {
                    method: 'POST',
                    header: [{
                        key: 'Content-Type',
                        value: 'application/json'
                    }],
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify({
                            configuration: {
                                region: 'us-east-1',
                                instanceSize: 'medium',
                                usageHours: 730,
                                storageGB: 100,
                                dataTransferGB: 50,
                                databaseSizeGB: 20
                            },
                            selectedServices: ['compute', 'storage', 'database', 'network']
                        }, null, 2)
                    },
                    url: {
                        raw: '{{baseUrl}}/api/calculator/compare',
                        host: ['{{baseUrl}}'],
                        path: ['api', 'calculator', 'compare']
                    }
                }
            }
        ]
    };

    res.status(200).json(postmanCollection);
});

// ============================================
// Error Handling
// ============================================
// Handle 404 for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================
// Graceful Shutdown
// ============================================
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

module.exports = app;
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Only start server if this file is run directly (not imported)
if (require.main === module) {
    const server = app.listen(PORT, HOST, () => {
        console.log('🚀 ===============================================');
        console.log('🌟 Cloud Cost Calculator API Server Started!');
        console.log('🚀 ===============================================');
        console.log(`📡 Server running on: http://${HOST}:${PORT}`);
        console.log(`🏥 Health Check: http://${HOST}:${PORT}/health`);
        console.log(`📊 API Docs: http://${HOST}:${PORT}/api/docs`);
        console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log('🚀 ===============================================');
        console.log('📋 Available Endpoints:');
        console.log('   GET  /                           - Welcome message');
        console.log('   GET  /health                     - Health check');
        console.log('   GET  /health/status              - System status');
        console.log('   GET  /health/ready               - Readiness check');
        console.log('   GET  /api/pricing/aws            - AWS pricing');
        console.log('   GET  /api/pricing/azure          - Azure pricing');
        console.log('   GET  /api/pricing/gcp            - GCP pricing');
        console.log('   POST /api/calculator/compare     - Compare costs');
        console.log('   POST /api/calculator/estimate    - Cost estimate');
        console.log('   GET  /api/docs                   - API documentation');
        console.log('   GET  /api/postman-collection     - Postman collection');
        console.log('🚀 ===============================================');
        console.log('💡 Ready to receive requests!');
        console.log('🔧 Press Ctrl+C to stop the server');
    });

    // Update graceful shutdown handlers to use server
    process.removeAllListeners('SIGTERM');
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('unhandledRejection');
    process.removeAllListeners('uncaughtException');

    process.on('SIGTERM', () => {
        console.log('🛑 SIGTERM received. Shutting down gracefully...');
        server.close(() => {
            logger.info('Server closed successfully');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('🛑 SIGINT received. Shutting down gracefully...');
        server.close(() => {
            logger.info('Server closed successfully');
            process.exit(0);
        });
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        console.error('🔥 Unhandled Rejection at:', promise);
        console.error('🔥 Reason:', reason);
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        server.close(() => {
            process.exit(1);
        });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        console.error('🔥 Uncaught Exception:', error);
        logger.error('Uncaught Exception:', error);
        server.close(() => {
            process.exit(1);
        });
    });
}