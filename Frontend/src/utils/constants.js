// Application constants

export const APP_CONFIG = {
  NAME: 'Cloud Cost Calculator',
  VERSION: '1.0.0',
  DESCRIPTION: 'Compare cloud costs across AWS, Azure, and Google Cloud Platform',
  AUTHOR: 'Your Name',
  EMAIL: 'your.email@example.com',
  GITHUB_URL: 'https://github.com/yourusername/cloud-cost-calculator',
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  CALCULATOR_CONFIGS: 'calculator-configs',
  CALCULATION_HISTORY: 'calculation-history',
  FAVORITE_CONFIGS: 'favorite-configs',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export const CLOUD_PROVIDERS = {
  AWS: 'aws',
  AZURE: 'azure',
  GCP: 'gcp',
};

export const PROVIDER_DISPLAY_NAMES = {
  [CLOUD_PROVIDERS.AWS]: 'Amazon Web Services',
  [CLOUD_PROVIDERS.AZURE]: 'Microsoft Azure',
  [CLOUD_PROVIDERS.GCP]: 'Google Cloud Platform',
};

export const PROVIDER_COLORS = {
  [CLOUD_PROVIDERS.AWS]: {
    primary: '#FF9900',
    secondary: '#FF9900CC',
    light: '#FFF4E6',
  },
  [CLOUD_PROVIDERS.AZURE]: {
    primary: '#0078D4',
    secondary: '#0078D4CC',
    light: '#F3F8FF',
  },
  [CLOUD_PROVIDERS.GCP]: {
    primary: '#4285F4',
    secondary: '#4285F4CC',
    light: '#F0F4FF',
  },
};

export const SERVICE_TYPES = {
  COMPUTE: 'compute',
  STORAGE: 'storage',
  DATABASE: 'database',
  NETWORKING: 'networking',
};

export const SERVICE_DISPLAY_NAMES = {
  [SERVICE_TYPES.COMPUTE]: 'Compute Instances',
  [SERVICE_TYPES.STORAGE]: 'Storage',
  [SERVICE_TYPES.DATABASE]: 'Databases',
  [SERVICE_TYPES.NETWORKING]: 'Networking',
};

export const SERVICE_ICONS = {
  [SERVICE_TYPES.COMPUTE]: '🖥️',
  [SERVICE_TYPES.STORAGE]: '💾',
  [SERVICE_TYPES.DATABASE]: '🗄️',
  [SERVICE_TYPES.NETWORKING]: '🌐',
};

export const REGIONS = {
  // AWS Regions
  'us-east-1': { name: 'US East (N. Virginia)', provider: 'aws', continent: 'North America' },
  'us-west-2': { name: 'US West (Oregon)', provider: 'aws', continent: 'North America' },
  'eu-west-1': { name: 'Europe (Ireland)', provider: 'aws', continent: 'Europe' },
  'ap-southeast-1': { name: 'Asia Pacific (Singapore)', provider: 'aws', continent: 'Asia Pacific' },
  'ap-northeast-1': { name: 'Asia Pacific (Tokyo)', provider: 'aws', continent: 'Asia Pacific' },
  
  // Azure Regions
  'eastus': { name: 'East US', provider: 'azure', continent: 'North America' },
  'westus2': { name: 'West US 2', provider: 'azure', continent: 'North America' },
  'westeurope': { name: 'West Europe', provider: 'azure', continent: 'Europe' },
  'southeastasia': { name: 'Southeast Asia', provider: 'azure', continent: 'Asia Pacific' },
  'japaneast': { name: 'Japan East', provider: 'azure', continent: 'Asia Pacific' },
  
  // GCP Regions
  'us-central1': { name: 'Iowa', provider: 'gcp', continent: 'North America' },
  'us-west1': { name: 'Oregon', provider: 'gcp', continent: 'North America' },
  'europe-west1': { name: 'Belgium', provider: 'gcp', continent: 'Europe' },
  'asia-southeast1': { name: 'Singapore', provider: 'gcp', continent: 'Asia Pacific' },
  'asia-northeast1': { name: 'Tokyo', provider: 'gcp', continent: 'Asia Pacific' },
};

export const INSTANCE_TYPES = {
  [CLOUD_PROVIDERS.AWS]: [
    { type: 't3.nano', vcpu: 2, memory: 0.5, popular: false },
    { type: 't3.micro', vcpu: 2, memory: 1, popular: true },
    { type: 't3.small', vcpu: 2, memory: 2, popular: true },
    { type: 't3.medium', vcpu: 2, memory: 4, popular: true },
    { type: 't3.large', vcpu: 2, memory: 8, popular: false },
    { type: 't3.xlarge', vcpu: 4, memory: 16, popular: false },
    { type: 'm5.large', vcpu: 2, memory: 8, popular: false },
    { type: 'm5.xlarge', vcpu: 4, memory: 16, popular: false },
  ],
  [CLOUD_PROVIDERS.AZURE]: [
    { type: 'Standard_B1s', vcpu: 1, memory: 1, popular: true },
    { type: 'Standard_B1ms', vcpu: 1, memory: 2, popular: true },
    { type: 'Standard_B2s', vcpu: 2, memory: 4, popular: true },
    { type: 'Standard_B2ms', vcpu: 2, memory: 8, popular: false },
    { type: 'Standard_D2s_v3', vcpu: 2, memory: 8, popular: false },
    { type: 'Standard_D4s_v3', vcpu: 4, memory: 16, popular: false },
  ],
  [CLOUD_PROVIDERS.GCP]: [
    { type: 'f1-micro', vcpu: 1, memory: 0.6, popular: true },
    { type: 'g1-small', vcpu: 1, memory: 1.7, popular: true },
    { type: 'n1-standard-1', vcpu: 1, memory: 3.75, popular: true },
    { type: 'n1-standard-2', vcpu: 2, memory: 7.5, popular: false },
    { type: 'n1-standard-4', vcpu: 4, memory: 15, popular: false },
    { type: 'n2-standard-2', vcpu: 2, memory: 8, popular: false },
  ],
};

export const STORAGE_TYPES = {
  [CLOUD_PROVIDERS.AWS]: [
    { type: 'standard', name: 'Standard', description: 'General purpose SSD' },
    { type: 'standard-ia', name: 'Standard-IA', description: 'Infrequent access' },
    { type: 'glacier', name: 'Glacier', description: 'Archive storage' },
    { type: 'deep-archive', name: 'Deep Archive', description: 'Long-term archive' },
  ],
  [CLOUD_PROVIDERS.AZURE]: [
    { type: 'hot', name: 'Hot', description: 'Frequently accessed data' },
    { type: 'cool', name: 'Cool', description: 'Infrequently accessed data' },
    { type: 'archive', name: 'Archive', description: 'Rarely accessed data' },
  ],
  [CLOUD_PROVIDERS.GCP]: [
    { type: 'standard', name: 'Standard', description: 'General purpose storage' },
    { type: 'nearline', name: 'Nearline', description: 'Backup and archival' },
    { type: 'coldline', name: 'Coldline', description: 'Disaster recovery' },
    { type: 'archive', name: 'Archive', description: 'Long-term preservation' },
  ],
};

export const DATABASE_ENGINES = [
  { value: 'mysql', label: 'MySQL', popular: true },
  { value: 'postgresql', label: 'PostgreSQL', popular: true },
  { value: 'mariadb', label: 'MariaDB', popular: false },
  { value: 'oracle', label: 'Oracle', popular: false },
  { value: 'sqlserver', label: 'SQL Server', popular: false },
];

export const VALIDATION_LIMITS = {
  COMPUTE: {
    MIN_HOURS: 1,
    MAX_HOURS: 744, // 31 days * 24 hours
    MIN_STORAGE: 8,
    MAX_STORAGE: 10000,
    MIN_VCPU: 1,
    MAX_VCPU: 128,
    MIN_MEMORY: 0.5,
    MAX_MEMORY: 1000,
  },
  STORAGE: {
    MIN_SIZE: 1,
    MAX_SIZE: 100000,
    MIN_REQUESTS: 0,
    MAX_REQUESTS: 100000000,
  },
  DATABASE: {
    MIN_STORAGE: 20,
    MAX_STORAGE: 10000,
    MIN_BACKUP_RETENTION: 0,
    MAX_BACKUP_RETENTION: 35,
  },
  NETWORKING: {
    MIN_DATA_TRANSFER: 0,
    MAX_DATA_TRANSFER: 100000,
    MIN_REQUESTS: 0,
    MAX_REQUESTS: 1000000000,
  },
};

export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['application/json', 'text/plain', 'text/csv'],
  MAX_NAME_LENGTH: 255,
};

export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  LOADING_TIMEOUT: 30000,
  CHART_COLORS: ['#FF9900', '#0078D4', '#4285F4', '#34D399', '#F59E0B'],
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  NOT_FOUND: 'Resource not found.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

export const SUCCESS_MESSAGES = {
  CALCULATION_COMPLETE: 'Cost calculation completed successfully!',
  CONFIG_SAVED: 'Configuration saved successfully!',
  CONFIG_LOADED: 'Configuration loaded successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
  DATA_IMPORTED: 'Data imported successfully!',
};

export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_REPORTING: process.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true',
  ENABLE_BETA_FEATURES: process.env.REACT_APP_ENABLE_BETA_FEATURES === 'true',
  ENABLE_REAL_TIME_PRICING: process.env.REACT_APP_ENABLE_REAL_TIME_PRICING === 'true',
};

export default {
  APP_CONFIG,
  API_CONFIG,
  STORAGE_KEYS,
  CLOUD_PROVIDERS,
  PROVIDER_DISPLAY_NAMES,
  PROVIDER_COLORS,
  SERVICE_TYPES,
  SERVICE_DISPLAY_NAMES,
  SERVICE_ICONS,
  REGIONS,
  INSTANCE_TYPES,
  STORAGE_TYPES,
  DATABASE_ENGINES,
  VALIDATION_LIMITS,
  FILE_LIMITS,
  UI_CONSTANTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
};