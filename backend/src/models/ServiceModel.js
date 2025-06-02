const serviceCategories = {
    core: {
        name: 'Core Infrastructure',
        description: 'Essential cloud computing services',
        services: ['compute', 'storage', 'database', 'network']
    },
    advanced: {
        name: 'Advanced Services',
        description: 'Specialized cloud services',
        services: ['cdn', 'loadbalancer', 'monitoring', 'security']
    },
    modern: {
        name: 'Modern Architecture',
        description: 'Serverless and containerized services',
        services: ['serverless', 'containers', 'apigateway']
    },
    ai: {
        name: 'AI & Analytics',
        description: 'Machine learning and data analytics',
        services: ['aiml', 'analytics', 'bigdata']
    }
};

const serviceDefinitions = {
    compute: {
        name: 'Virtual Machines',
        description: 'Scalable compute instances',
        category: 'core',
        metrics: ['vcpu', 'memory', 'hours'],
        defaultConfig: {
            instanceSize: 'medium',
            usageHours: 730
        }
    },
    storage: {
        name: 'Object Storage',
        description: 'Scalable file storage',
        category: 'core',
        metrics: ['storage_gb', 'requests'],
        defaultConfig: {
            storageGB: 100,
            requests: 1000
        }
    },
    database: {
        name: 'Managed Database',
        description: 'Database as a service',
        category: 'core',
        metrics: ['storage_gb', 'iops', 'hours'],
        defaultConfig: {
            databaseSizeGB: 20,
            usageHours: 730
        }
    },
    network: {
        name: 'Data Transfer',
        description: 'Network bandwidth and transfer',
        category: 'core',
        metrics: ['data_transfer_gb'],
        defaultConfig: {
            dataTransferGB: 50
        }
    },
    cdn: {
        name: 'Content Delivery Network',
        description: 'Global content caching',
        category: 'advanced',
        metrics: ['data_transfer_gb', 'requests'],
        defaultConfig: {
            dataTransferGB: 100,
            requests: 10000
        }
    },
    loadbalancer: {
        name: 'Load Balancer',
        description: 'Traffic distribution',
        category: 'advanced',
        metrics: ['hours', 'data_processed_gb'],
        defaultConfig: {
            usageHours: 730,
            dataProcessedGB: 100
        }
    },
    monitoring: {
        name: 'Monitoring & Logging',
        description: 'System monitoring and logs',
        category: 'advanced',
        metrics: ['logs_gb', 'metrics_count'],
        defaultConfig: {
            logsGB: 10,
            metricsCount: 1000
        }
    },
    security: {
        name: 'Security Services',
        description: 'Security and compliance',
        category: 'advanced',
        metrics: ['requests', 'rules'],
        defaultConfig: {
            requests: 1000000,
            rules: 10
        }
    },
    serverless: {
        name: 'Serverless Functions',
        description: 'Function as a service',
        category: 'modern',
        metrics: ['executions', 'duration_ms', 'memory_mb'],
        defaultConfig: {
            executions: 1000000,
            avgDurationMs: 100,
            memoryMB: 128
        }
    },
    containers: {
        name: 'Container Service',
        description: 'Container orchestration',
        category: 'modern',
        metrics: ['hours', 'vcpu', 'memory_gb'],
        defaultConfig: {
            usageHours: 730,
            vcpu: 2,
            memoryGB: 4
        }
    },
    apigateway: {
        name: 'API Gateway',
        description: 'API management and routing',
        category: 'modern',
        metrics: ['requests', 'data_transfer_gb'],
        defaultConfig: {
            requests: 1000000,
            dataTransferGB: 10
        }
    },
    aiml: {
        name: 'AI/ML Services',
        description: 'Machine learning platforms',
        category: 'ai',
        metrics: ['training_hours', 'inference_requests'],
        defaultConfig: {
            trainingHours: 10,
            inferenceRequests: 10000
        }
    }
};

const ServiceModel = {
    getCategories: function() {
        return serviceCategories;
    },

    getServicesByCategory: function(category) {
        return serviceCategories[category] && serviceCategories[category].services || [];
    },

    getServiceDefinition: function(serviceId) {
        return serviceDefinitions[serviceId] || null;
    },

    getAllServices: function() {
        return serviceDefinitions;
    },

    validateServiceConfig: function(serviceId, config) {
        const service = serviceDefinitions[serviceId];
        if (!service) {
            throw new Error('Service ' + serviceId + ' not found');
        }

        const errors = [];
        for (let i = 0; i < service.metrics.length; i++) {
            const metric = service.metrics[i];
            if (config[metric] === undefined || config[metric] < 0) {
                errors.push('Invalid ' + metric + ' value');
            }
        }

        if (errors.length > 0) {
            throw new Error('Validation errors: ' + errors.join(', '));
        }

        return true;
    },

    getDefaultConfig: function(serviceId) {
        const service = serviceDefinitions[serviceId];
        return service && service.defaultConfig || {};
    }
};

module.exports = {
    ServiceModel: ServiceModel,
    serviceCategories: serviceCategories,
    serviceDefinitions: serviceDefinitions
};