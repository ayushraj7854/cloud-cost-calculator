// Google Cloud Platform Service - Mock pricing data and calculations
const gcpService = {
    // Mock GCP pricing data (in USD per hour/month)
    pricingData: {
        compute: {
            'us-east-1': {
                micro: { hourly: 0.0104, monthly: 7.59 },
                small: { hourly: 0.021, monthly: 15.33 },
                medium: { hourly: 0.042, monthly: 30.66 },
                large: { hourly: 0.084, monthly: 61.32 },
                xlarge: { hourly: 0.168, monthly: 122.64 },
                '2xlarge': { hourly: 0.336, monthly: 245.28 }
            },
            'us-west-2': {
                micro: { hourly: 0.0104, monthly: 7.59 },
                small: { hourly: 0.021, monthly: 15.33 },
                medium: { hourly: 0.042, monthly: 30.66 },
                large: { hourly: 0.084, monthly: 61.32 },
                xlarge: { hourly: 0.168, monthly: 122.64 },
                '2xlarge': { hourly: 0.336, monthly: 245.28 }
            },
            'eu-west-1': {
                micro: { hourly: 0.0111, monthly: 8.10 },
                small: { hourly: 0.0222, monthly: 16.21 },
                medium: { hourly: 0.0444, monthly: 32.41 },
                large: { hourly: 0.0888, monthly: 64.82 },
                xlarge: { hourly: 0.1776, monthly: 129.65 },
                '2xlarge': { hourly: 0.3552, monthly: 259.30 }
            },
            'ap-south-1': {
                micro: { hourly: 0.0095, monthly: 6.94 },
                small: { hourly: 0.019, monthly: 13.87 },
                medium: { hourly: 0.038, monthly: 27.74 },
                large: { hourly: 0.076, monthly: 55.48 },
                xlarge: { hourly: 0.152, monthly: 110.96 },
                '2xlarge': { hourly: 0.304, monthly: 221.92 }
            },
            'ap-southeast-1': {
                micro: { hourly: 0.0115, monthly: 8.40 },
                small: { hourly: 0.023, monthly: 16.79 },
                medium: { hourly: 0.046, monthly: 33.58 },
                large: { hourly: 0.092, monthly: 67.16 },
                xlarge: { hourly: 0.184, monthly: 134.32 },
                '2xlarge': { hourly: 0.368, monthly: 268.64 }
            }
        },
        storage: {
            perGB: 0.020
        },
        database: {
            perGB: 0.108
        },
        network: {
            perGB: 0.085
        },
        cdn: {
            perGB: 0.08
        },
        loadbalancer: {
            monthly: 20.00
        },
        monitoring: {
            monthly: 14.00
        },
        security: {
            monthly: 23.00
        },
        serverless: {
            monthly: 11.00
        },
        aiml: {
            monthly: 42.00
        },
        containers: {
            monthly: 16.50
        },
        backup: {
            monthly: 7.50
        }
    },

    async getPricing(params) {
        const { service, region, instanceType } = params;

        try {
            if (service === 'compute') {
                const computePricing = this.pricingData.compute[region] && this.pricingData.compute[region][instanceType];
                if (!computePricing) {
                    throw new Error(`No pricing data for ${instanceType} in ${region}`);
                }

                return {
                    service: 'compute',
                    provider: 'GCP',
                    region,
                    instanceType,
                    pricing: computePricing,
                    specifications: this.getInstanceSpecs(instanceType)
                };
            }

            const servicePricing = this.pricingData[service];
            if (!servicePricing) {
                throw new Error(`No pricing data for service: ${service}`);
            }

            return {
                service,
                provider: 'GCP',
                region,
                pricing: servicePricing,
                lastUpdated: new Date().toISOString()
            };

        } catch (error) {
            console.error('GCP Pricing Error:', error);
            throw error;
        }
    },

    async calculateCosts(config, selectedServices) {
        const results = {
            provider: 'GCP',
            totalCost: 0,
            breakdown: {},
            currency: 'USD',
            period: 'monthly'
        };

        try {
            for (const service of selectedServices) {
                let serviceCost = 0;

                switch (service) {
                    case 'compute':
                        const computePricing = this.pricingData.compute[config.region] && this.pricingData.compute[config.region][config.instanceSize];
                        if (computePricing) {
                            serviceCost = (computePricing.hourly * config.usageHours);
                        }
                        break;

                    case 'storage':
                        serviceCost = this.pricingData.storage.perGB * config.storageGB;
                        break;

                    case 'database':
                        serviceCost = this.pricingData.database.perGB * config.databaseSizeGB;
                        break;

                    case 'network':
                        serviceCost = this.pricingData.network.perGB * config.dataTransferGB;
                        break;

                    case 'cdn':
                        serviceCost = this.pricingData.cdn.perGB * config.dataTransferGB;
                        break;

                    case 'loadbalancer':
                        serviceCost = this.pricingData.loadbalancer.monthly;
                        break;

                    case 'monitoring':
                        serviceCost = this.pricingData.monitoring.monthly;
                        break;

                    case 'security':
                        serviceCost = this.pricingData.security.monthly;
                        break;

                    case 'serverless':
                        serviceCost = this.pricingData.serverless.monthly;
                        break;

                    case 'aiml':
                        serviceCost = this.pricingData.aiml.monthly;
                        break;

                    case 'containers':
                        serviceCost = this.pricingData.containers.monthly;
                        break;

                    case 'backup':
                        serviceCost = this.pricingData.backup.monthly;
                        break;

                    default:
                        serviceCost = 0;
                }

                results.breakdown[service] = Math.round(serviceCost * 100) / 100;
                results.totalCost += serviceCost;
            }

            results.totalCost = Math.round(results.totalCost * 100) / 100;

            return results;

        } catch (error) {
            console.error('GCP Cost Calculation Error:', error);
            throw error;
        }
    },

    getInstanceSpecs(instanceType) {
        const specs = {
            micro: { vcpu: 1, memory: 1, storage: 'Persistent Disk', network: 'Low' },
            small: { vcpu: 1, memory: 2, storage: 'Persistent Disk', network: 'Low to Moderate' },
            medium: { vcpu: 2, memory: 4, storage: 'Persistent Disk', network: 'Moderate' },
            large: { vcpu: 2, memory: 8, storage: 'Persistent Disk', network: 'Moderate to High' },
            xlarge: { vcpu: 4, memory: 16, storage: 'Persistent Disk', network: 'High' },
            '2xlarge': { vcpu: 8, memory: 32, storage: 'Persistent Disk', network: 'High' }
        };

        return specs[instanceType] || specs.medium;
    },

    getAvailableRegions() {
        return Object.keys(this.pricingData.compute);
    },

    getAvailableInstanceTypes(region) {
        region = region || 'us-east-1';
        return Object.keys(this.pricingData.compute[region] || this.pricingData.compute['us-east-1']);
    }
};

module.exports = gcpService;