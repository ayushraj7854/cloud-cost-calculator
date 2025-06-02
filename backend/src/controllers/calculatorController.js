const calculationService = require('../services/calculationService');

// Main cost calculation endpoint
const calculateCosts = async(req, res) => {
    try {
        const startTime = Date.now();

        const {
            configuration = {},
                selectedServices = ['compute', 'storage', 'database']
        } = req.body;

        // Validate input
        if (!configuration.region) {
            return res.status(400).json({
                success: false,
                error: 'Region is required'
            });
        }

        if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'At least one service must be selected'
            });
        }

        // Set defaults
        const config = {
            region: configuration.region || 'us-east-1',
            instanceSize: configuration.instanceSize || 'medium',
            usageHours: configuration.usageHours || 730,
            storageGB: configuration.storageGB || 100,
            dataTransferGB: configuration.dataTransferGB || 50,
            databaseSizeGB: configuration.databaseSizeGB || 20,
            ...configuration
        };

        // Calculate costs for all providers
        const results = await calculationService.calculateAllProviders(config, selectedServices);

        const calculationTime = Date.now() - startTime;

        res.json({
            success: true,
            results,
            metadata: {
                calculationTime: `${calculationTime}ms`,
                timestamp: new Date().toISOString(),
                configuration: config,
                selectedServices
            }
        });

    } catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to calculate costs',
            message: error.message
        });
    }
};

// Get available services
const getAvailableServices = (req, res) => {
    const services = [{
            id: 'compute',
            name: 'Virtual Machines',
            icon: '💻',
            description: 'Compute instances and virtual machines',
            category: 'Core Infrastructure'
        },
        {
            id: 'storage',
            name: 'Object Storage',
            icon: '💾',
            description: 'File and object storage services',
            category: 'Storage'
        },
        {
            id: 'database',
            name: 'Managed Database',
            icon: '🗄️',
            description: 'Managed database services',
            category: 'Database'
        },
        {
            id: 'network',
            name: 'Data Transfer',
            icon: '🌐',
            description: 'Network and data transfer costs',
            category: 'Networking'
        },
        {
            id: 'cdn',
            name: 'Content Delivery Network',
            icon: '🚀',
            description: 'CDN and content delivery',
            category: 'Networking'
        },
        {
            id: 'loadbalancer',
            name: 'Load Balancer',
            icon: '⚖️',
            description: 'Load balancing services',
            category: 'Networking'
        },
        {
            id: 'monitoring',
            name: 'Monitoring & Logging',
            icon: '📊',
            description: 'Monitoring and logging services',
            category: 'DevOps'
        },
        {
            id: 'security',
            name: 'Security Services',
            icon: '🔒',
            description: 'Security and compliance services',
            category: 'Security'
        },
        {
            id: 'serverless',
            name: 'Serverless Functions',
            icon: '⚡',
            description: 'Function as a Service (FaaS)',
            category: 'Serverless'
        },
        {
            id: 'aiml',
            name: 'AI/ML Services',
            icon: '🤖',
            description: 'Machine learning and AI services',
            category: 'AI & Analytics'
        },
        {
            id: 'containers',
            name: 'Container Service',
            icon: '📦',
            description: 'Container orchestration services',
            category: 'Containers'
        },
        {
            id: 'backup',
            name: 'Backup Service',
            icon: '💿',
            description: 'Backup and disaster recovery',
            category: 'Storage'
        }
    ];

    // Group by category
    const categories = {};
    services.forEach(service => {
        if (!categories[service.category]) {
            categories[service.category] = [];
        }
        categories[service.category].push(service);
    });

    res.json({
        success: true,
        services,
        categories,
        totalCount: services.length
    });
};

// Get available regions
const getAvailableRegions = (req, res) => {
    const regions = [{
            id: 'us-east-1',
            name: 'US East (N. Virginia)',
            location: 'Virginia, USA',
            providers: ['aws', 'azure', 'gcp']
        },
        {
            id: 'us-west-2',
            name: 'US West (Oregon)',
            location: 'Oregon, USA',
            providers: ['aws', 'azure', 'gcp']
        },
        {
            id: 'eu-west-1',
            name: 'Europe (Ireland)',
            location: 'Dublin, Ireland',
            providers: ['aws', 'azure', 'gcp']
        },
        {
            id: 'ap-south-1',
            name: 'Asia Pacific (Mumbai)',
            location: 'Mumbai, India',
            providers: ['aws', 'azure', 'gcp']
        },
        {
            id: 'ap-southeast-1',
            name: 'Asia Pacific (Singapore)',
            location: 'Singapore',
            providers: ['aws', 'azure', 'gcp']
        }
    ];

    res.json({
        success: true,
        regions,
        count: regions.length
    });
};

// Get available instance types
const getInstanceTypes = (req, res) => {
    const instanceTypes = [{
            id: 'micro',
            name: 'Micro',
            description: '1 vCPU, 1 GB RAM',
            specs: { vcpu: 1, memory: 1, network: 'Low' }
        },
        {
            id: 'small',
            name: 'Small',
            description: '1 vCPU, 2 GB RAM',
            specs: { vcpu: 1, memory: 2, network: 'Low to Moderate' }
        },
        {
            id: 'medium',
            name: 'Medium',
            description: '2 vCPU, 4 GB RAM',
            specs: { vcpu: 2, memory: 4, network: 'Moderate' }
        },
        {
            id: 'large',
            name: 'Large',
            description: '2 vCPU, 8 GB RAM',
            specs: { vcpu: 2, memory: 8, network: 'Moderate to High' }
        },
        {
            id: 'xlarge',
            name: 'XLarge',
            description: '4 vCPU, 16 GB RAM',
            specs: { vcpu: 4, memory: 16, network: 'High' }
        },
        {
            id: '2xlarge',
            name: '2XLarge',
            description: '8 vCPU, 32 GB RAM',
            specs: { vcpu: 8, memory: 32, network: 'High' }
        }
    ];

    res.json({
        success: true,
        instanceTypes,
        count: instanceTypes.length
    });
};

// Export calculation results
const exportResults = async(req, res) => {
    try {
        const { format = 'json', data } = req.body;

        if (!data) {
            return res.status(400).json({
                success: false,
                error: 'Data is required for export'
            });
        }

        let exportData;
        let contentType;
        let filename;

        switch (format.toLowerCase()) {
            case 'csv':
                // Convert to CSV format
                exportData = convertToCSV(data);
                contentType = 'text/csv';
                filename = `cloud-cost-calculation-${Date.now()}.csv`;
                break;

            case 'json':
            default:
                exportData = JSON.stringify(data, null, 2);
                contentType = 'application/json';
                filename = `cloud-cost-calculation-${Date.now()}.json`;
                break;
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(exportData);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to export results',
            message: error.message
        });
    }
};

// Helper function to convert data to CSV
const convertToCSV = (data) => {
    const headers = ['Provider', 'Service', 'Monthly Cost', 'Annual Cost'];
    let csv = headers.join(',') + '\n';

    // Add data rows
    Object.keys(data.results || {}).forEach(provider => {
        const result = data.results[provider];
        csv += `${provider.toUpperCase()},Total,${result.totalCost},${result.totalCost * 12}\n`;

        if (result.breakdown) {
            Object.keys(result.breakdown).forEach(service => {
                if (result.breakdown[service] > 0) {
                    csv += `${provider.toUpperCase()},${service},${result.breakdown[service]},${result.breakdown[service] * 12}\n`;
                }
            });
        }
    });

    return csv;
};

module.exports = {
    calculateCosts,
    getAvailableServices,
    getAvailableRegions,
    getInstanceTypes,
    exportResults
};