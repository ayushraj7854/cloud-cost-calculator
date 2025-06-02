const cloudApiConfig = {
    aws: {
        region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        pricingApiUrl: 'https://pricing.us-east-1.amazonaws.com',
        computeService: 'AmazonEC2',
        storageService: 'AmazonS3',
        databaseService: 'AmazonRDS',
        supportedRegions: [
            'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
            'eu-west-1', 'eu-west-2', 'eu-central-1',
            'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1'
        ],
        instanceTypes: {
            small: 't3.micro',
            medium: 't3.small',
            large: 't3.medium',
            xlarge: 't3.large'
        }
    },

    azure: {
        subscriptionId: process.env.AZURE_SUBSCRIPTION_ID,
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID,
        pricingApiUrl: 'https://prices.azure.com/api/retail/prices',
        managementUrl: 'https://management.azure.com',
        supportedRegions: [
            'eastus', 'eastus2', 'westus', 'westus2', 'westus3',
            'northeurope', 'westeurope', 'uksouth', 'ukwest',
            'southeastasia', 'eastasia', 'centralindia', 'southindia'
        ],
        instanceTypes: {
            small: 'Standard_B1s',
            medium: 'Standard_B2s',
            large: 'Standard_D2s_v3',
            xlarge: 'Standard_D4s_v3'
        }
    },

    gcp: {
        projectId: process.env.GCP_PROJECT_ID,
        keyFile: process.env.GCP_KEY_FILE,
        clientEmail: process.env.GCP_CLIENT_EMAIL,
        privateKey: process.env.GCP_PRIVATE_KEY,
        pricingApiUrl: 'https://cloudbilling.googleapis.com/v1',
        computeApiUrl: 'https://compute.googleapis.com/compute/v1',
        supportedRegions: [
            'us-central1', 'us-east1', 'us-east4', 'us-west1', 'us-west2', 'us-west3', 'us-west4',
            'europe-west1', 'europe-west2', 'europe-west3', 'europe-west4', 'europe-west6',
            'asia-east1', 'asia-east2', 'asia-northeast1', 'asia-south1', 'asia-southeast1'
        ],
        instanceTypes: {
            small: 'e2-micro',
            medium: 'e2-small',
            large: 'e2-medium',
            xlarge: 'e2-standard-2'
        }
    }
};

// Helper functions
const CloudApiHelpers = {
    // Get API configuration for a provider
    getProviderConfig: function(provider) {
        return cloudApiConfig[provider] || null;
    },

    // Validate provider API credentials
    validateCredentials: function(provider) {
        const config = cloudApiConfig[provider];
        if (!config) return false;

        switch (provider) {
            case 'aws':
                return !!(config.accessKeyId && config.secretAccessKey);
            case 'azure':
                return !!(config.clientId && config.clientSecret && config.tenantId);
            case 'gcp':
                return !!(config.projectId && (config.keyFile || config.clientEmail));
            default:
                return false;
        }
    },

    // Get supported regions for a provider
    getSupportedRegions: function(provider) {
        const config = cloudApiConfig[provider];
        return config ? config.supportedRegions : [];
    },

    // Map generic instance size to provider-specific instance type
    mapInstanceSize: function(provider, size) {
        const config = cloudApiConfig[provider];
        return config && config.instanceTypes ? config.instanceTypes[size] : size;
    },

    // Get pricing API URL for provider
    getPricingApiUrl: function(provider) {
        const config = cloudApiConfig[provider];
        return config ? config.pricingApiUrl : null;
    }
};

module.exports = {
    cloudApiConfig,
    CloudApiHelpers
};