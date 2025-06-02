const { PricingModel } = require('../models/PricingModel');
const cacheService = require('../utils/cache');

const healthController = {
    // Basic health check
    healthCheck: (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Cloud Cost Calculator API is running',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            uptime: process.uptime()
        });
    },

    // Detailed system status
    systemStatus: (req, res) => {
        try {
            const memoryUsage = process.memoryUsage();
            const cacheStats = cacheService.getStats();

            const status = {
                success: true,
                timestamp: new Date().toISOString(),
                system: {
                    uptime: process.uptime(),
                    memory: {
                        used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
                        total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
                        external: Math.round(memoryUsage.external / 1024 / 1024) + ' MB'
                    },
                    cpu: process.cpuUsage(),
                    nodeVersion: process.version,
                    platform: process.platform
                },
                cache: {
                    keys: cacheStats.keys,
                    hits: cacheStats.hits,
                    misses: cacheStats.misses,
                    hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0
                },
                services: {
                    pricing: 'operational',
                    calculator: 'operational',
                    database: 'operational' // Would check actual DB connection
                }
            };

            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Health check failed',
                error: error.message
            });
        }
    },

    // API readiness check
    readinessCheck: (req, res) => {
        try {
            // Check if essential services are available
            const awsPricing = PricingModel.getAllPricing('aws');
            const azurePricing = PricingModel.getAllPricing('azure');
            const gcpPricing = PricingModel.getAllPricing('gcp');

            const ready = awsPricing && azurePricing && gcpPricing;

            if (ready) {
                res.status(200).json({
                    success: true,
                    message: 'API is ready to serve requests',
                    timestamp: new Date().toISOString(),
                    providers: ['aws', 'azure', 'gcp'],
                    services: ['compute', 'storage', 'database', 'network']
                });
            } else {
                res.status(503).json({
                    success: false,
                    message: 'API is not ready',
                    timestamp: new Date().toISOString()
                });
            }
        } catch (error) {
            res.status(503).json({
                success: false,
                message: 'Readiness check failed',
                error: error.message
            });
        }
    }
};

module.exports = healthController;