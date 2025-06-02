const pricingData = {
    aws: {
        compute: {
            'small': { hourly: 0.0116, monthly: 8.47 },
            'medium': { hourly: 0.0464, monthly: 33.87 },
            'large': { hourly: 0.096, monthly: 70.08 },
            'xlarge': { hourly: 0.192, monthly: 140.16 }
        },
        storage: {
            'standard': { perGB: 0.023, monthly: 23 },
            'infrequent': { perGB: 0.0125, monthly: 12.5 }
        },
        database: {
            'mysql': { hourly: 0.017, monthly: 12.41 },
            'postgres': { hourly: 0.018, monthly: 13.14 }
        },
        network: {
            'data-transfer': { perGB: 0.09 },
            'cdn': { perGB: 0.05 }
        }
    },

    azure: {
        compute: {
            'small': { hourly: 0.00729, monthly: 5.32 },
            'medium': { hourly: 0.096, monthly: 70.08 },
            'large': { hourly: 0.192, monthly: 140.16 }
        },
        storage: {
            'standard': { perGB: 0.018, monthly: 18 },
            'cool': { perGB: 0.01, monthly: 10 }
        },
        database: {
            'sql': { hourly: 0.02, monthly: 14.6 },
            'mysql': { hourly: 0.0158, monthly: 11.53 }
        },
        network: {
            'bandwidth': { perGB: 0.087 },
            'cdn': { perGB: 0.081 }
        }
    },

    gcp: {
        compute: {
            'small': { hourly: 0.00838, monthly: 6.12 },
            'medium': { hourly: 0.0335, monthly: 24.45 },
            'large': { hourly: 0.095, monthly: 69.35 }
        },
        storage: {
            'standard': { perGB: 0.02, monthly: 20 },
            'nearline': { perGB: 0.01, monthly: 10 }
        },
        database: {
            'mysql': { hourly: 0.0150, monthly: 10.95 },
            'postgres': { hourly: 0.0160, monthly: 11.68 }
        },
        network: {
            'egress': { perGB: 0.12 },
            'cdn': { perGB: 0.08 }
        }
    }
};

const PricingModel = {
    getPricing: function(provider, service, instanceType) {
        if (!pricingData[provider]) {
            throw new Error('Provider ' + provider + ' not found');
        }

        if (!pricingData[provider][service]) {
            throw new Error('Service ' + service + ' not found for provider ' + provider);
        }

        if (instanceType) {
            return pricingData[provider][service][instanceType] || null;
        }

        return pricingData[provider][service];
    },

    getAllPricing: function(provider) {
        return pricingData[provider] || null;
    },

    getSupportedServices: function(provider) {
        return Object.keys(pricingData[provider] || {});
    },

    getSupportedInstances: function(provider, service) {
        const serviceData = pricingData[provider] && pricingData[provider][service];
        return serviceData ? Object.keys(serviceData) : [];
    },

    calculateCost: function(provider, service, instanceType, usageHours, additionalGB) {
        additionalGB = additionalGB || 0;
        const pricing = this.getPricing(provider, service, instanceType);
        if (!pricing) return 0;

        let cost = 0;

        if (pricing.hourly) {
            cost = pricing.hourly * usageHours;
        }

        if (pricing.perGB && additionalGB > 0) {
            cost += pricing.perGB * additionalGB;
        }

        return Math.round(cost * 100) / 100;
    }
};

module.exports = {
    PricingModel: PricingModel,
    pricingData: pricingData
};