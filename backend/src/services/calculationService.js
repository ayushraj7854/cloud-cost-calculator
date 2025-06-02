const awsService = require('./awsService');
const azureService = require('./azureService');
const gcpService = require('./gcpService');

class CalculationService {
    constructor() {
        this.providers = {
            aws: awsService,
            azure: azureService,
            gcp: gcpService
        };
    }

    async calculateAllProviders(configuration, selectedServices) {
        try {
            const startTime = Date.now();

            // Calculate costs for all three providers
            const [awsResults, azureResults, gcpResults] = await Promise.all([
                this.providers.aws.calculateCosts(configuration, selectedServices),
                this.providers.azure.calculateCosts(configuration, selectedServices),
                this.providers.gcp.calculateCosts(configuration, selectedServices)
            ]);

            // Determine the cheapest provider
            const providers = [
                { name: 'aws', data: awsResults },
                { name: 'azure', data: azureResults },
                { name: 'gcp', data: gcpResults }
            ];

            const cheapest = providers.reduce((prev, current) =>
                (prev.data.totalCost < current.data.totalCost) ? prev : current
            );

            const mostExpensive = providers.reduce((prev, current) =>
                (prev.data.totalCost > current.data.totalCost) ? prev : current
            );

            const savings = Math.round((mostExpensive.data.totalCost - cheapest.data.totalCost) * 100) / 100;

            // Generate cost optimization recommendations
            const recommendations = this.generateRecommendations({ aws: awsResults, azure: azureResults, gcp: gcpResults },
                configuration,
                selectedServices
            );

            // Calculate service-by-service comparison
            const serviceComparison = this.generateServiceComparison({ aws: awsResults, azure: azureResults, gcp: gcpResults },
                selectedServices
            );

            const calculationTime = Date.now() - startTime;

            return {
                totalCosts: {
                    aws: awsResults.totalCost,
                    azure: azureResults.totalCost,
                    gcp: gcpResults.totalCost
                },
                breakdown: {
                    aws: awsResults.breakdown,
                    azure: azureResults.breakdown,
                    gcp: gcpResults.breakdown
                },
                cheapestProvider: cheapest.name,
                savings: savings,
                recommendations: recommendations,
                serviceComparison: serviceComparison,
                summary: {
                    selectedServicesCount: selectedServices.length,
                    totalRegions: 1,
                    calculationTime: calculationTime,
                    currency: 'USD',
                    period: 'monthly'
                },
                metadata: {
                    timestamp: new Date().toISOString(),
                    configuration: configuration,
                    selectedServices: selectedServices
                }
            };

        } catch (error) {
            console.error('Calculation Service Error:', error);
            throw new Error(`Failed to calculate costs: ${error.message}`);
        }
    }

    generateRecommendations(results, configuration, selectedServices) {
        const recommendations = [];

        // Cost savings recommendation based on cheapest provider
        const costs = [
            { provider: 'AWS', cost: results.aws.totalCost },
            { provider: 'Azure', cost: results.azure.totalCost },
            { provider: 'GCP', cost: results.gcp.totalCost }
        ];

        const cheapest = costs.reduce((prev, current) =>
            (prev.cost < current.cost) ? prev : current
        );

        const mostExpensive = costs.reduce((prev, current) =>
            (prev.cost > current.cost) ? prev : current
        );

        if (cheapest.provider !== mostExpensive.provider) {
            recommendations.push({
                type: 'cost-saving',
                title: `Switch to ${cheapest.provider}`,
                description: `${cheapest.provider} offers the lowest cost for your current configuration`,
                potentialSavings: Math.round((mostExpensive.cost - cheapest.cost) * 100) / 100,
                priority: 'high'
            });
        }

        // Instance size optimization
        if (configuration.instanceSize === '2xlarge' || configuration.instanceSize === 'xlarge') {
            recommendations.push({
                type: 'optimization',
                title: 'Consider Reserved Instances',
                description: 'For large instances running 24/7, reserved instances can save up to 75%',
                potentialSavings: Math.round(results.aws.breakdown.compute * 0.6 * 100) / 100,
                priority: 'high'
            });
        }

        // Storage optimization
        if (configuration.storageGB > 1000) {
            recommendations.push({
                type: 'efficiency',
                title: 'Implement Storage Lifecycle Policies',
                description: 'Use automated tiering to move infrequently accessed data to cheaper storage classes',
                potentialSavings: Math.round(results.aws.breakdown.storage * 0.3 * 100) / 100,
                priority: 'medium'
            });
        }

        // Network optimization
        if (configuration.dataTransferGB > 100) {
            recommendations.push({
                type: 'efficiency',
                title: 'Optimize Data Transfer',
                description: 'Consider using CDN and compression to reduce data transfer costs',
                potentialSavings: Math.round(results.aws.breakdown.network * 0.4 * 100) / 100,
                priority: 'medium'
            });
        }

        // Multi-service optimization
        if (selectedServices.length >= 5) {
            recommendations.push({
                type: 'optimization',
                title: 'Bundle Services Discount',
                description: 'Many providers offer discounts when using multiple services together',
                potentialSavings: Math.round(cheapest.cost * 0.1 * 100) / 100,
                priority: 'low'
            });
        }

        return recommendations;
    }

    generateServiceComparison(results, selectedServices) {
        const comparison = [];

        selectedServices.forEach(service => {
            const awsCost = results.aws.breakdown[service] || 0;
            const azureCost = results.azure.breakdown[service] || 0;
            const gcpCost = results.gcp.breakdown[service] || 0;

            const serviceData = {
                service: service,
                costs: {
                    aws: awsCost,
                    azure: azureCost,
                    gcp: gcpCost
                }
            };

            // Find cheapest for this service
            const serviceCosts = [
                { provider: 'aws', cost: awsCost },
                { provider: 'azure', cost: azureCost },
                { provider: 'gcp', cost: gcpCost }
            ];

            const cheapestForService = serviceCosts.reduce((prev, current) =>
                (prev.cost < current.cost) ? prev : current
            );

            serviceData.cheapest = cheapestForService.provider;
            serviceData.savings = Math.max(...serviceCosts.map(p => p.cost)) - cheapestForService.cost;

            comparison.push(serviceData);
        });

        return comparison;
    }

    async getProviderPricing(provider, configuration) {
        if (!this.providers[provider]) {
            throw new Error(`Unsupported provider: ${provider}`);
        }

        return await this.providers[provider].calculateCosts(configuration, ['compute']);
    }

    getSupportedProviders() {
        return Object.keys(this.providers);
    }

    getSupportedServices() {
        return [
            'compute', 'storage', 'database', 'network', 'cdn',
            'loadbalancer', 'monitoring', 'security', 'serverless',
            'aiml', 'containers', 'backup'
        ];
    }

    getSupportedRegions() {
        return [
            'us-east-1', 'us-west-2', 'eu-west-1',
            'ap-south-1', 'ap-southeast-1'
        ];
    }

    validateConfiguration(configuration) {
        const errors = [];

        if (!configuration.region) {
            errors.push('Region is required');
        }

        if (!configuration.instanceSize) {
            errors.push('Instance size is required');
        }

        if (configuration.usageHours && (configuration.usageHours < 1 || configuration.usageHours > 8760)) {
            errors.push('Usage hours must be between 1 and 8760');
        }

        if (configuration.storageGB && configuration.storageGB < 0) {
            errors.push('Storage GB cannot be negative');
        }

        if (configuration.dataTransferGB && configuration.dataTransferGB < 0) {
            errors.push('Data transfer GB cannot be negative');
        }

        if (configuration.databaseSizeGB && configuration.databaseSizeGB < 0) {
            errors.push('Database size GB cannot be negative');
        }

        return errors;
    }
}

module.exports = new CalculationService();