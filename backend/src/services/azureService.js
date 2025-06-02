// Azure Service - Mock pricing data and calculations
const azureService = {
    // Mock Azure pricing data (in USD per hour/month)
    pricingData: {
        compute: {
            'us-east-1': {
                micro: { hourly: 0.012, monthly: 8.76 },
                small: { hourly: 0.024, monthly: 17.52 },
                medium: { hourly: 0.048, monthly: 35.04 },
                large: { hourly: 0.096, monthly: 70.08 },
                xlarge: { hourly: 0.192, monthly: 140.16 },
                '2xlarge': { hourly: 0.384, monthly: 280.32 }
            },
            'us-west-2': {
                micro: { hourly: 0.012, monthly: 8.76 },
                small: { hourly: 0.024, monthly: 17.52 },
                medium: { hourly: 0.048, monthly: 35.04 },
                large: { hourly: 0.096, monthly: 70.08 },
                xlarge: { hourly: 0.192, monthly: 140.16 },
                '2xlarge': { hourly: 0.384, monthly: 280.32 }
            },
            'eu-west-1': {
                micro: { hourly: 0.0125, monthly: 9.13 },
                small: { hourly: 0.025, monthly: 18.25 },
                medium: { hourly: 0.05, monthly: 36.50 },
                large: { hourly: 0.10, monthly: 73.00 },
                xlarge: { hourly: 0.20, monthly: 146.00 },
                '2xlarge': { hourly: 0.40, monthly: 292.00 }
            },
            'ap-south-1': {
                micro: { hourly: 0.0108, monthly: 7.88 },
                small: { hourly: 0.0215, monthly: 15.70 },
                medium: { hourly: 0.043, monthly: 31.39 },
                large: { hourly: 0.086, monthly: 62.78 },
                xlarge: { hourly: 0.172, monthly: 125.56 },
                '2xlarge': { hourly: 0.344, monthly: 251.12 }
            },
            'ap-southeast-1': {
                micro: { hourly: 0.013, monthly: 9.49 },
                small: { hourly: 0.026, monthly: 18.98 },
                medium: { hourly: 0.052, monthly: 37.96 },
                large: { hourly: 0.104, monthly: 75.92 },
                xlarge: { hourly: 0.208, monthly: 151.84 },
                '2xlarge': { hourly: 0.416, monthly: 303.68 }
            }
        },
        storage: {
            perGB: 0.024
        },
        database: {
            perGB: 0.120
        },
        network: {
            perGB: 0.087
        },
        cdn: {
            perGB: 0.081
        },
        loadbalancer: {
            monthly: 24.00
        },
        monitoring: {
            monthly: 16.50
        },
        security: {
            monthly: 27.00
        },
        serverless: {
            monthly: 13.50
        },
        aiml: {
            monthly: 48.00
        },
        containers: {
            monthly: 19.50
        },
        backup: {
            monthly: 8.50
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
                    provider: 'Azure',
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
                provider: 'Azure',
                region,
                pricing: servicePricing,
                lastUpdated: new Date().toISOString()
            };

        } catch (error) {
            console.error('Azure Pricing Error:', error);
            throw error;
        }
    },

    async calculateCosts(config, selectedServices) {
        const results = {
            provider: 'Azure',
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
            console.error('Azure Cost Calculation Error:', error);
            throw error;
        }
    },

    getInstanceSpecs(instanceType) {
        const specs = {
            micro: { vcpu: 1, memory: 1, storage: 'Premium SSD', network: 'Low' },
            small: { vcpu: 1, memory: 2, storage: 'Premium SSD', network: 'Low to Moderate' },
            medium: { vcpu: 2, memory: 4, storage: 'Premium SSD', network: 'Moderate' },
            large: { vcpu: 2, memory: 8, storage: 'Premium SSD', network: 'Moderate to High' },
            xlarge: { vcpu: 4, memory: 16, storage: 'Premium SSD', network: 'High' },
            '2xlarge': { vcpu: 8, memory: 32, storage: 'Premium SSD', network: 'High' }
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

module.exports = azureService;