export const CLOUD_PROVIDERS = {
  AWS: 'aws',
  AZURE: 'azure',
  GCP: 'gcp',
};

export const PROVIDER_NAMES = {
  [CLOUD_PROVIDERS.AWS]: 'Amazon Web Services',
  [CLOUD_PROVIDERS.AZURE]: 'Microsoft Azure',
  [CLOUD_PROVIDERS.GCP]: 'Google Cloud Platform',
};

export const PROVIDER_COLORS = {
  [CLOUD_PROVIDERS.AWS]: '#FF9900',
  [CLOUD_PROVIDERS.AZURE]: '#0078D4',
  [CLOUD_PROVIDERS.GCP]: '#4285F4',
};

export const SERVICE_TYPES = {
  COMPUTE: 'compute',
  STORAGE: 'storage',
  DATABASE: 'database',
  NETWORKING: 'networking',
};

// Service mappings between providers
export const SERVICE_MAPPINGS = {
  [SERVICE_TYPES.COMPUTE]: {
    [CLOUD_PROVIDERS.AWS]: {
      name: 'EC2',
      apiName: 'ec2',
      instanceTypes: [
        't3.nano', 't3.micro', 't3.small', 't3.medium', 't3.large',
        't3.xlarge', 't3.2xlarge', 'm5.large', 'm5.xlarge', 'm5.2xlarge',
        'c5.large', 'c5.xlarge', 'r5.large', 'r5.xlarge'
      ],
    },
    [CLOUD_PROVIDERS.AZURE]: {
      name: 'Virtual Machines',
      apiName: 'virtualmachines',
      instanceTypes: [
        'Standard_B1s', 'Standard_B1ms', 'Standard_B2s', 'Standard_B2ms',
        'Standard_D2s_v3', 'Standard_D4s_v3', 'Standard_E2s_v3'
      ],
    },
    [CLOUD_PROVIDERS.GCP]: {
      name: 'Compute Engine',
      apiName: 'compute',
      instanceTypes: [
        'f1-micro', 'g1-small', 'n1-standard-1', 'n1-standard-2',
        'n1-standard-4', 'n2-standard-2', 'n2-standard-4'
      ],
    },
  },
  [SERVICE_TYPES.STORAGE]: {
    [CLOUD_PROVIDERS.AWS]: {
      name: 'S3 + EBS',
      apiName: 's3',
      storageTypes: ['standard', 'standard-ia', 'glacier', 'deep-archive'],
    },
    [CLOUD_PROVIDERS.AZURE]: {
      name: 'Blob Storage + Disk Storage',
      apiName: 'storage',
      storageTypes: ['hot', 'cool', 'archive'],
    },
    [CLOUD_PROVIDERS.GCP]: {
      name: 'Cloud Storage + Persistent Disk',
      apiName: 'storage',
      storageTypes: ['standard', 'nearline', 'coldline', 'archive'],
    },
  },
  [SERVICE_TYPES.DATABASE]: {
    [CLOUD_PROVIDERS.AWS]: {
      name: 'RDS',
      apiName: 'rds',
      engines: ['mysql', 'postgresql', 'mariadb', 'oracle', 'sqlserver'],
    },
    [CLOUD_PROVIDERS.AZURE]: {
      name: 'SQL Database',
      apiName: 'sqldatabase',
      engines: ['mysql', 'postgresql', 'mariadb', 'sqlserver'],
    },
    [CLOUD_PROVIDERS.GCP]: {
      name: 'Cloud SQL',
      apiName: 'cloudsql',
      engines: ['mysql', 'postgresql', 'sqlserver'],
    },
  },
  [SERVICE_TYPES.NETWORKING]: {
    [CLOUD_PROVIDERS.AWS]: {
      name: 'CloudFront + ELB',
      apiName: 'networking',
      services: ['cloudfront', 'elb', 'data-transfer'],
    },
    [CLOUD_PROVIDERS.AZURE]: {
      name: 'CDN + Load Balancer',
      apiName: 'networking',
      services: ['cdn', 'loadbalancer', 'data-transfer'],
    },
    [CLOUD_PROVIDERS.GCP]: {
      name: 'Cloud CDN + Load Balancing',
      apiName: 'networking',
      services: ['cdn', 'loadbalancer', 'data-transfer'],
    },
  },
};

// Regional mappings
export const REGIONS = {
  [CLOUD_PROVIDERS.AWS]: [
    { code: 'us-east-1', name: 'N. Virginia', continent: 'North America' },
    { code: 'us-west-2', name: 'Oregon', continent: 'North America' },
    { code: 'eu-west-1', name: 'Ireland', continent: 'Europe' },
    { code: 'ap-southeast-1', name: 'Singapore', continent: 'Asia Pacific' },
    { code: 'ap-northeast-1', name: 'Tokyo', continent: 'Asia Pacific' },
  ],
  [CLOUD_PROVIDERS.AZURE]: [
    { code: 'eastus', name: 'East US', continent: 'North America' },
    { code: 'westus2', name: 'West US 2', continent: 'North America' },
    { code: 'westeurope', name: 'West Europe', continent: 'Europe' },
    { code: 'southeastasia', name: 'Southeast Asia', continent: 'Asia Pacific' },
    { code: 'japaneast', name: 'Japan East', continent: 'Asia Pacific' },
  ],
  [CLOUD_PROVIDERS.GCP]: [
    { code: 'us-central1', name: 'Iowa', continent: 'North America' },
    { code: 'us-west1', name: 'Oregon', continent: 'North America' },
    { code: 'europe-west1', name: 'Belgium', continent: 'Europe' },
    { code: 'asia-southeast1', name: 'Singapore', continent: 'Asia Pacific' },
    { code: 'asia-northeast1', name: 'Tokyo', continent: 'Asia Pacific' },
  ],
};

// Instance specifications
export const INSTANCE_SPECS = {
  [CLOUD_PROVIDERS.AWS]: {
    't3.nano': { vcpu: 2, memory: 0.5, network: 'Up to 5 Gbps' },
    't3.micro': { vcpu: 2, memory: 1, network: 'Up to 5 Gbps' },
    't3.small': { vcpu: 2, memory: 2, network: 'Up to 5 Gbps' },
    't3.medium': { vcpu: 2, memory: 4, network: 'Up to 5 Gbps' },
    't3.large': { vcpu: 2, memory: 8, network: 'Up to 5 Gbps' },
    'm5.large': { vcpu: 2, memory: 8, network: 'Up to 10 Gbps' },
    'm5.xlarge': { vcpu: 4, memory: 16, network: 'Up to 10 Gbps' },
  },
  [CLOUD_PROVIDERS.AZURE]: {
    'Standard_B1s': { vcpu: 1, memory: 1, network: '2 ACU' },
    'Standard_B1ms': { vcpu: 1, memory: 2, network: '2 ACU' },
    'Standard_B2s': { vcpu: 2, memory: 4, network: '4 ACU' },
    'Standard_D2s_v3': { vcpu: 2, memory: 8, network: 'Moderate' },
    'Standard_D4s_v3': { vcpu: 4, memory: 16, network: 'Moderate' },
  },
  [CLOUD_PROVIDERS.GCP]: {
    'f1-micro': { vcpu: 1, memory: 0.6, network: 'Low' },
    'g1-small': { vcpu: 1, memory: 1.7, network: 'Low' },
    'n1-standard-1': { vcpu: 1, memory: 3.75, network: '2 Gbps' },
    'n1-standard-2': { vcpu: 2, memory: 7.5, network: '10 Gbps' },
    'n1-standard-4': { vcpu: 4, memory: 15, network: '10 Gbps' },
  },
};

// Utility functions
export const getProviderDisplayName = (provider) => {
  return PROVIDER_NAMES[provider] || provider;
};

export const getProviderColor = (provider) => {
  return PROVIDER_COLORS[provider] || '#000000';
};

export const getServiceMapping = (provider, serviceType) => {
  return SERVICE_MAPPINGS[serviceType]?.[provider] || null;
};

export const getRegionsForProvider = (provider) => {
  return REGIONS[provider] || [];
};

export const getInstanceSpecs = (provider, instanceType) => {
  return INSTANCE_SPECS[provider]?.[instanceType] || null;
};

export const getAllProviders = () => {
  return Object.values(CLOUD_PROVIDERS);
};

export const getAllServiceTypes = () => {
  return Object.values(SERVICE_TYPES);
};
