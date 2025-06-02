const awsService = require('../services/awsService');
const azureService = require('../services/azureService');
const gcpService = require('../services/gcpService');

// Get AWS pricing data
const getAWSPricing = async(req, res) => {
    try {
        const { service, region, instanceType } = req.query;

        const pricingData = await awsService.getPricing({
            service: service || 'compute',
            region: region || 'us-east-1',
            instanceType: instanceType || 'medium'
        });

        res.json({
            success: true,
            provider: 'AWS',
            data: pricingData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch AWS pricing',
            message: error.message
        });
    }
};

// Get Azure pricing data
const getAzurePricing = async(req, res) => {
    try {
        const { service, region, instanceType } = req.query;

        const pricingData = await azureService.getPricing({
            service: service || 'compute',
            region: region || 'us-east-1',
            instanceType: instanceType || 'medium'
        });

        res.json({
            success: true,
            provider: 'Azure',
            data: pricingData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch Azure pricing',
            message: error.message
        });
    }
};

// Get Google Cloud pricing data
const getGCPPricing = async(req, res) => {
    try {
        const { service, region, instanceType } = req.query;

        const pricingData = await gcpService.getPricing({
            service: service || 'compute',
            region: region || 'us-east-1',
            instanceType: instanceType || 'medium'
        });

        res.json({
            success: true,
            provider: 'GCP',
            data: pricingData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch GCP pricing',
            message: error.message
        });
    }
};

// Compare pricing across all providers
const comparePricing = async(req, res) => {
    try {
        const { service, region, instanceType } = req.query;

        const params = {
            service: service || 'compute',
            region: region || 'us-east-1',
            instanceType: instanceType || 'medium'
        };

        const [awsPricing, azurePricing, gcpPricing] = await Promise.all([
            awsService.getPricing(params),
            azureService.getPricing(params),
            gcpService.getPricing(params)
        ]);

        // Find cheapest provider
        const providers = [
            { name: 'AWS', data: awsPricing },
            { name: 'Azure', data: azurePricing },
            { name: 'GCP', data: gcpPricing }
        ];

        const cheapest = providers.reduce((prev, current) =>
            (prev.data.monthlyTotal < current.data.monthlyTotal) ? prev : current
        );

        res.json({
            success: true,
            comparison: {
                aws: awsPricing,
                azure: azurePricing,
                gcp: gcpPricing
            },
            cheapest: cheapest.name,
            savings: Math.max(...providers.map(p => p.data.monthlyTotal)) - cheapest.data.monthlyTotal,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to compare pricing',
            message: error.message
        });
    }
};

// Get available regions
const getRegions = (req, res) => {
    const regions = [
        { id: 'us-east-1', name: 'US East (N. Virginia)', providers: ['aws', 'azure', 'gcp'] },
        { id: 'us-west-2', name: 'US West (Oregon)', providers: ['aws', 'azure', 'gcp'] },
        { id: 'eu-west-1', name: 'Europe (Ireland)', providers: ['aws', 'azure', 'gcp'] },
        { id: 'ap-south-1', name: 'Asia Pacific (Mumbai)', providers: ['aws', 'azure', 'gcp'] },
        { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', providers: ['aws', 'azure', 'gcp'] }
    ];

    res.json({
        success: true,
        regions,
        count: regions.length
    });
};

// Get available services
const getServices = (req, res) => {
    const services = [
        { id: 'compute', name: 'Virtual Machines', description: 'Compute instances and virtual machines' },
        { id: 'storage', name: 'Object Storage', description: 'File and object storage services' },
        { id: 'database', name: 'Managed Database', description: 'Managed database services' },
        { id: 'network', name: 'Data Transfer', description: 'Network and data transfer costs' },
        { id: 'cdn', name: 'Content Delivery Network', description: 'CDN and content delivery' },
        { id: 'loadbalancer', name: 'Load Balancer', description: 'Load balancing services' },
        { id: 'monitoring', name: 'Monitoring & Logging', description: 'Monitoring and logging services' },
        { id: 'security', name: 'Security Services', description: 'Security and compliance services' }
    ];

    res.json({
        success: true,
        services,
        count: services.length
    });
};

module.exports = {
    getAWSPricing,
    getAzurePricing,
    getGCPPricing,
    comparePricing,
    getRegions,
    getServices
};