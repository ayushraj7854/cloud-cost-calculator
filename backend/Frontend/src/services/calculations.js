import { CLOUD_PROVIDERS, SERVICE_TYPES, getInstanceSpecs } from './cloudProviders';

// Base pricing data (in production, this would come from APIs)
const BASE_PRICING = {
  [CLOUD_PROVIDERS.AWS]: {
    [SERVICE_TYPES.COMPUTE]: {
      't3.nano': 0.0052,
      't3.micro': 0.0104,
      't3.small': 0.0208,
      't3.medium': 0.0416,
      't3.large': 0.0832,
      't3.xlarge': 0.1664,
      'm5.large': 0.096,
      'm5.xlarge': 0.192,
    },
    [SERVICE_TYPES.STORAGE]: {
      standard: 0.023, // per GB/month
      standardIA: 0.0125,
      glacier: 0.004,
      requests: 0.0004, // per 1000 requests
    },
    [SERVICE_TYPES.DATABASE]: {
      'db.t3.micro': 0.017,
      'db.t3.small': 0.034,
      'db.t3.medium': 0.068,
      storage: 0.115, // per GB/month
    },
    [SERVICE_TYPES.NETWORKING]: {
      dataTransfer: 0.09, // per GB
      loadBalancer: 22.5, // per month
      requests: 0.008, // per million requests
    },
  },
  [CLOUD_PROVIDERS.AZURE]: {
    [SERVICE_TYPES.COMPUTE]: {
      'Standard_B1s': 0.0104,
      'Standard_B1ms': 0.0208,
      'Standard_B2s': 0.0416,
      'Standard_D2s_v3': 0.096,
      'Standard_D4s_v3': 0.192,
    },
    [SERVICE_TYPES.STORAGE]: {
      hot: 0.0184,
      cool: 0.01,
      archive: 0.002,
      requests: 0.0043,
    },
    [SERVICE_TYPES.DATABASE]: {
      'Basic': 0.018,
      'Standard_S0': 0.020,
      'Standard_S1': 0.030,
      storage: 0.125,
    },
    [SERVICE_TYPES.NETWORKING]: {
      dataTransfer: 0.087,
      loadBalancer: 21.9,
      requests: 0.005,
    },
  },
  [CLOUD_PROVIDERS.GCP]: {
    [SERVICE_TYPES.COMPUTE]: {
      'f1-micro': 0.0076,
      'g1-small': 0.0257,
      'n1-standard-1': 0.0475,
      'n1-standard-2': 0.095,
      'n1-standard-4': 0.19,
    },
    [SERVICE_TYPES.STORAGE]: {
      standard: 0.020,
      nearline: 0.010,
      coldline: 0.004,
      archive: 0.0012,
      requests: 0.0040,
    },
    [SERVICE_TYPES.DATABASE]: {
      'db-f1-micro': 0.0150,
      'db-g1-small': 0.0500,
      'db-n1-standard-1': 0.0825,
      storage: 0.17,
    },
    [SERVICE_TYPES.NETWORKING]: {
      dataTransfer: 0.085,
      loadBalancer: 18.25,
      requests: 0.0075,
    },
  },
};

// Regional pricing multipliers
const REGIONAL_MULTIPLIERS = {
  'us-east-1': 1.0,
  'us-west-2': 1.05,
  'eu-west-1': 1.08,
  'ap-southeast-1': 1.12,
  'ap-northeast-1': 1.15,
  // Azure regions
  'eastus': 1.0,
  'westus2': 1.03,
  'westeurope': 1.06,
  'southeastasia': 1.10,
  'japaneast': 1.12,
  // GCP regions
  'us-central1': 1.0,
  'us-west1': 1.04,
  'europe-west1': 1.07,
  'asia-southeast1': 1.11,
  'asia-northeast1': 1.13,
};

/**
 * Calculate compute costs
 */
export const calculateComputeCost = (provider, configuration, region = 'us-east-1') => {
  const pricing = BASE_PRICING[provider]?.[SERVICE_TYPES.COMPUTE];
  if (!pricing) {
    throw new Error(`Pricing not available for provider: ${provider}`);
  }

  const instanceType = configuration.instanceType || 't3.medium';
  const hours = configuration.hours || 730; // default to full month
  const storage = configuration.storage || 0;

  const hourlyRate = pricing[instanceType];
  if (!hourlyRate) {
    throw new Error(`Instance type not found: ${instanceType}`);
  }

  const regionMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;
  const computeCost = hourlyRate * hours * regionMultiplier;
  const storageCost = storage * 0.10; // EBS storage cost

  return {
    service: SERVICE_TYPES.COMPUTE,
    cost: computeCost + storageCost,
    details: {
      instanceType,
      hours,
      hourlyRate: hourlyRate * regionMultiplier,
      computeCost,
      storageCost,
      storage,
    },
  };
};

/**
 * Calculate storage costs
 */
export const calculateStorageCost = (provider, configuration, region = 'us-east-1') => {
  const pricing = BASE_PRICING[provider]?.[SERVICE_TYPES.STORAGE];
  if (!pricing) {
    throw new Error(`Storage pricing not available for provider: ${provider}`);
  }

  const storageType = configuration.type || 'standard';
  const size = configuration.size || 0;
  const requests = configuration.requests || 0;

  const regionMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;
  const storageRate = pricing[storageType] || pricing.standard;
  const requestRate = pricing.requests || 0;

  const storageCost = size * storageRate * regionMultiplier;
  const requestCost = (requests / 1000) * requestRate * regionMultiplier;

  return {
    service: SERVICE_TYPES.STORAGE,
    cost: storageCost + requestCost,
    details: {
      storageType,
      size,
      requests,
      storageRate: storageRate * regionMultiplier,
      storageCost,
      requestCost,
    },
  };
};

/**
 * Calculate database costs
 */
export const calculateDatabaseCost = (provider, configuration, region = 'us-east-1') => {
  const pricing = BASE_PRICING[provider]?.[SERVICE_TYPES.DATABASE];
  if (!pricing) {
    throw new Error(`Database pricing not available for provider: ${provider}`);
  }

  const instanceClass = configuration.instanceClass || 'db.t3.micro';
  const storage = configuration.storage || 20;
  const backupRetention = configuration.backupRetention || 7;

  const regionMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;
  const instanceRate = pricing[instanceClass] || pricing['db.t3.micro'];
  const storageRate = pricing.storage;

  const instanceCost = instanceRate * 730 * regionMultiplier; // full month
  const storageCost = storage * storageRate * regionMultiplier;
  const backupCost = storage * 0.095 * (backupRetention / 30) * regionMultiplier;

  return {
    service: SERVICE_TYPES.DATABASE,
    cost: instanceCost + storageCost + backupCost,
    details: {
      instanceClass,
      storage,
      backupRetention,
      instanceCost,
      storageCost,
      backupCost,
    },
  };
};

/**
 * Calculate networking costs
 */
export const calculateNetworkingCost = (provider, configuration, region = 'us-east-1') => {
  const pricing = BASE_PRICING[provider]?.[SERVICE_TYPES.NETWORKING];
  if (!pricing) {
    throw new Error(`Networking pricing not available for provider: ${provider}`);
  }

  const dataTransfer = configuration.dataTransfer || 0;
  const loadBalancer = configuration.loadBalancer || false;
  const requests = configuration.requests || 0;

  const regionMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;

  const dataTransferCost = dataTransfer * pricing.dataTransfer * regionMultiplier;
  const loadBalancerCost = loadBalancer ? pricing.loadBalancer * regionMultiplier : 0;
  const requestCost = (requests / 1000000) * pricing.requests * regionMultiplier;

  return {
    service: SERVICE_TYPES.NETWORKING,
    cost: dataTransferCost + loadBalancerCost + requestCost,
    details: {
      dataTransfer,
      loadBalancer,
      requests,
      dataTransferCost,
      loadBalancerCost,
      requestCost,
    },
  };
};

/**
 * Calculate total costs for a provider
 */
export const calculateProviderCosts = (provider, services, configuration) => {
  const region = configuration.region || 'us-east-1';
  const breakdown = [];
  let totalCost = 0;

  try {
    services.forEach(serviceType => {
      let serviceResult;
      
      switch (serviceType) {
        case SERVICE_TYPES.COMPUTE:
          serviceResult = calculateComputeCost(provider, configuration.compute || {}, region);
          break;
        case SERVICE_TYPES.STORAGE:
          serviceResult = calculateStorageCost(provider, configuration.storage || {}, region);
          break;
        case SERVICE_TYPES.DATABASE:
          serviceResult = calculateDatabaseCost(provider, configuration.database || {}, region);
          break;
        case SERVICE_TYPES.NETWORKING:
          serviceResult = calculateNetworkingCost(provider, configuration.networking || {}, region);
          break;
        default:
          console.warn(`Unknown service type: ${serviceType}`);
          return;
      }

      breakdown.push(serviceResult);
      totalCost += serviceResult.cost;
    });

    return {
      provider,
      totalCost: Math.round(totalCost * 100) / 100, // Round to 2 decimal places
      breakdown,
      region,
    };
  } catch (error) {
    console.error(`Error calculating costs for ${provider}:`, error);
    return {
      provider,
      totalCost: 0,
      breakdown: [],
      error: error.message,
    };
  }
};

/**
 * Calculate costs for all providers
 */
export const calculateAllProviderCosts = (services, configuration) => {
  const providers = Object.values(CLOUD_PROVIDERS);
  const results = [];

  providers.forEach(provider => {
    const result = calculateProviderCosts(provider, services, configuration);
    results.push(result);
  });

  return results.filter(result => !result.error);
};

/**
 * Get cost optimization recommendations
 */
export const getCostOptimizationRecommendations = (pricingResults, configuration) => {
  const recommendations = [];

  if (!pricingResults || pricingResults.length === 0) return recommendations;

  // Find the lowest cost provider
  const lowestCost = Math.min(...pricingResults.map(p => p.totalCost));
  const lowestCostProvider = pricingResults.find(p => p.totalCost === lowestCost);

  // Calculate potential savings
  pricingResults.forEach(provider => {
    if (provider.totalCost > lowestCost) {
      const savings = provider.totalCost - lowestCost;
      const percentage = Math.round((savings / provider.totalCost) * 100);
      
      if (savings > 10) { // Only recommend if savings > $10
        recommendations.push({
          type: 'provider_switch',
          title: `Switch from ${provider.provider.toUpperCase()} to ${lowestCostProvider.provider.toUpperCase()}`,
          description: `Save $${savings.toFixed(2)} per month (${percentage}% reduction)`,
          impact: 'high',
          savings,
        });
      }
    }
  });

  // Instance size recommendations
  if (configuration.compute?.instanceType?.includes('micro') && configuration.compute?.hours > 500) {
    recommendations.push({
      type: 'instance_size',
      title: 'Consider larger instance for high usage',
      description: 'For workloads running >500 hours/month, larger instances often provide better value',
      impact: 'medium',
    });
  }

  // Usage pattern recommendations
  if (configuration.compute?.hours < 500) {
    recommendations.push({
      type: 'usage_pattern',
      title: 'Consider spot instances or reserved capacity',
      description: 'For predictable, low-usage workloads, reserved instances can provide significant savings',
      impact: 'medium',
    });
  }

  return recommendations;
};

export default {
  calculateComputeCost,
  calculateStorageCost,
  calculateDatabaseCost,
  calculateNetworkingCost,
  calculateProviderCosts,
  calculateAllProviderCosts,
  getCostOptimizationRecommendations,
};