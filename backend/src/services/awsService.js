// AWS Service - Mock pricing data and calculations
const awsService = {
    // Mock AWS pricing data (in USD per hour/month)
    pricingData: {
        compute: {
            'us-east-1': {
                micro: { hourly: 0.0116, monthly: 8.47 },
                small: { hourly: 0.023, monthly: 16.79 },
                medium: { hourly: 0.046, monthly: 33.58 },
                large: { hourly: 0.092, monthly: 67.16 },
                xlarge: { hourly: 0.184, monthly: 134.32 },
                '2xlarge': { hourly: 0.368, monthly: 268.64 }
            },
            'us-west-2': {
                micro: { hourly: 0.0116, monthly: 8.47 },
                small: { hourly: 0.023, monthly: 16.79 },
                medium: { hourly: 0.046, monthly: 33.58 },
                large: { hourly: 0.092, monthly: 67.16 },
                xlarge: { hourly: 0.184, monthly: 134.32 },
                '2xlarge': { hourly: 0.368, monthly: 268.64 }
            },
            'eu-west-1': {
                micro: { hourly: 0.012, monthly: 8.76 },
                small: { hourly: 0.024, monthly: 17.52 },
                medium: { hourly: 0.048, monthly: 35.04 },
                large: { hourly: 0.096, monthly: 70.08 },
                xlarge: { hourly: 0.192, monthly: 140.16 },
                '2xlarge': { hourly: 0.384, monthly: 280.32 }
            },
            'ap-south-1': {
                micro: { hourly: 0.0104, monthly: 7.59 },
                small: { hourly: 0.0208, monthly: 15.18 },
                medium: { hourly: 0.0416, monthly: 30.37 },
                large: { hourly: 0.0832, monthly: 60.74 },
                xlarge: { hourly: 0.1664, monthly: 121.47 },
                '2xlarge': { hourly: 0.3328, monthly: 242.94 }
            },
            'ap-southeast-1': {
                micro: { hourly: 0.0126, monthly: 9.20 },
                small: { hourly: 0.0252, monthly: 18.40 },
                medium: { hourly: 0.0504, monthly: 36.79 },
                large: { hourly: 0.1008, monthly: 73.58 },
                xlarge: { hourly: 0.2016, monthly: 147.17 },
                '2xlarge': { hourly: 0.4032, monthly: 294.34 }
            }
        },
        storage: {
            perGB: 0.023
        },
        database: {
            perGB: 0.115
        },
        network: {
            perGB: 0.09
        },
        cdn: {
            perGB: 0.085
        },
        loadbalancer: {
            monthly: 22.50
        },
        monitoring: {
            monthly: 15.00
        },
        security: {
            monthly: 25.00
        },
        serverless: {
            monthly: 12.00
        },
        aiml: {
            monthly: 45.00
        },
        containers: {
            monthly: 18.00
        },
        backup: {
            monthly: 8.00
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
                    provider: 'AWS',
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
                provider: 'AWS',
                region,
                pricing: servicePricing,
                lastUpdated: new Date().toISOString()
            };

        } catch (error) {
            console.error('AWS Pricing Error:', error);
            throw error;
        }
    },

    async calculateCosts(config, selectedServices) {
        const results = {
            provider: 'AWS',
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
            console.error('AWS Cost Calculation Error:', error);
            throw error;
        }
    },

    getInstanceSpecs(instanceType) {
        const specs = {
            micro: { vcpu: 1, memory: 1, storage: 'EBS-only', network: 'Low' },
            small: { vcpu: 1, memory: 2, storage: 'EBS-only', network: 'Low to Moderate' },
            medium: { vcpu: 2, memory: 4, storage: 'EBS-only', network: 'Moderate' },
            large: { vcpu: 2, memory: 8, storage: 'EBS-only', network: 'Moderate to High' },
            xlarge: { vcpu: 4, memory: 16, storage: 'EBS-only', network: 'High' },
            '2xlarge': { vcpu: 8, memory: 32, storage: 'EBS-only', network: 'High' }
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

module.exports = awsService;