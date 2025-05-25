// Validation utility functions

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate configuration object
 */
export const validateConfiguration = (configuration) => {
  const errors = [];

  if (!configuration || typeof configuration !== 'object') {
    errors.push('Configuration must be a valid object');
    return errors;
  }

  // Validate compute configuration
  if (configuration.compute) {
    const compute = configuration.compute;
    
    if (compute.hours && (compute.hours < 1 || compute.hours > 744)) {
      errors.push('Hours must be between 1 and 744');
    }
    
    if (compute.storage && (compute.storage < 8 || compute.storage > 10000)) {
      errors.push('Storage must be between 8GB and 10,000GB');
    }
    
    if (compute.vcpus && (compute.vcpus < 1 || compute.vcpus > 128)) {
      errors.push('vCPUs must be between 1 and 128');
    }
    
    if (compute.memory && (compute.memory < 0.5 || compute.memory > 1000)) {
      errors.push('Memory must be between 0.5GB and 1,000GB');
    }
  }

  // Validate storage configuration
  if (configuration.storage) {
    const storage = configuration.storage;
    
    if (storage.size && (storage.size < 1 || storage.size > 100000)) {
      errors.push('Storage size must be between 1GB and 100,000GB');
    }
    
    if (storage.requests && (storage.requests < 0 || storage.requests > 100000000)) {
      errors.push('Storage requests must be between 0 and 100,000,000');
    }
  }

  // Validate database configuration
  if (configuration.database) {
    const database = configuration.database;
    
    if (database.storage && (database.storage < 20 || database.storage > 10000)) {
      errors.push('Database storage must be between 20GB and 10,000GB');
    }
    
    if (database.backupRetention && (database.backupRetention < 0 || database.backupRetention > 35)) {
      errors.push('Backup retention must be between 0 and 35 days');
    }
  }

  // Validate networking configuration
  if (configuration.networking) {
    const networking = configuration.networking;
    
    if (networking.dataTransfer && (networking.dataTransfer < 0 || networking.dataTransfer > 100000)) {
      errors.push('Data transfer must be between 0GB and 100,000GB');
    }
    
    if (networking.requests && (networking.requests < 0 || networking.requests > 1000000000)) {
      errors.push('Network requests must be between 0 and 1,000,000,000');
    }
  }

  return errors;
};

/**
 * Validate service selection
 */
export const validateServices = (services) => {
  const errors = [];
  const validServices = ['compute', 'storage', 'database', 'networking'];

  if (!Array.isArray(services)) {
    errors.push('Services must be an array');
    return errors;
  }

  if (services.length === 0) {
    errors.push('At least one service must be selected');
  }

  services.forEach(service => {
    if (!validServices.includes(service)) {
      errors.push(`Invalid service: ${service}`);
    }
  });

  return errors;
};

/**
 * Validate region
 */
export const validateRegion = (region) => {
  const validRegions = [
    'us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'ap-northeast-1',
    'eastus', 'westus2', 'westeurope', 'southeastasia', 'japaneast',
    'us-central1', 'us-west1', 'europe-west1', 'asia-southeast1', 'asia-northeast1'
  ];

  if (!region) {
    return ['Region is required'];
  }

  if (!validRegions.includes(region)) {
    return [`Invalid region: ${region}`];
  }

  return [];
};

/**
 * Validate number input
 */
export const validateNumber = (value, min = 0, max = Infinity, label = 'Value') => {
  const errors = [];

  if (value === null || value === undefined || value === '') {
    errors.push(`${label} is required`);
    return errors;
  }

  const num = Number(value);
  
  if (isNaN(num)) {
    errors.push(`${label} must be a valid number`);
    return errors;
  }

  if (num < min) {
    errors.push(`${label} must be at least ${min}`);
  }

  if (num > max) {
    errors.push(`${label} must be no more than ${max}`);
  }

  return errors;
};

/**
 * Validate string input
 */
export const validateString = (value, minLength = 0, maxLength = Infinity, label = 'Value') => {
  const errors = [];

  if (!value) {
    if (minLength > 0) {
      errors.push(`${label} is required`);
    }
    return errors;
  }

  if (typeof value !== 'string') {
    errors.push(`${label} must be a string`);
    return errors;
  }

  if (value.length < minLength) {
    errors.push(`${label} must be at least ${minLength} characters`);
  }

  if (value.length > maxLength) {
    errors.push(`${label} must be no more than ${maxLength} characters`);
  }

  return errors;
};

/**
 * Validate instance type
 */
export const validateInstanceType = (instanceType, provider) => {
  const validInstanceTypes = {
    aws: ['t3.nano', 't3.micro', 't3.small', 't3.medium', 't3.large', 't3.xlarge', 'm5.large', 'm5.xlarge'],
    azure: ['Standard_B1s', 'Standard_B1ms', 'Standard_B2s', 'Standard_D2s_v3', 'Standard_D4s_v3'],
    gcp: ['f1-micro', 'g1-small', 'n1-standard-1', 'n1-standard-2', 'n1-standard-4'],
  };

  const errors = [];

  if (!instanceType) {
    errors.push('Instance type is required');
    return errors;
  }

  if (!provider) {
    errors.push('Provider is required for instance type validation');
    return errors;
  }

  const validTypes = validInstanceTypes[provider];
  if (!validTypes || !validTypes.includes(instanceType)) {
    errors.push(`Invalid instance type ${instanceType} for provider ${provider}`);
  }

  return errors;
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') {
    return input;
  }

  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validate file upload
 */
export const validateFile = (file, options = {}) => {
  const errors = [];
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['application/json', 'text/plain'],
    maxNameLength = 255,
  } = options;

  if (!file) {
    errors.push('File is required');
    return errors;
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  if (file.name.length > maxNameLength) {
    errors.push(`File name must be less than ${maxNameLength} characters`);
  }

  return errors;
};

/**
 * Validate complete form data
 */
export const validateFormData = (data) => {
  const errors = {};

  // Validate services
  const serviceErrors = validateServices(data.services || []);
  if (serviceErrors.length > 0) {
    errors.services = serviceErrors;
  }

  // Validate configuration
  const configErrors = validateConfiguration(data.configuration || {});
  if (configErrors.length > 0) {
    errors.configuration = configErrors;
  }

  // Validate region
  const regionErrors = validateRegion(data.configuration?.region);
  if (regionErrors.length > 0) {
    errors.region = regionErrors;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  isValidEmail,
  validateConfiguration,
  validateServices,
  validateRegion,
  validateNumber,
  validateString,
  validateInstanceType,
  sanitizeInput,
  validateFile,
  validateFormData,
};