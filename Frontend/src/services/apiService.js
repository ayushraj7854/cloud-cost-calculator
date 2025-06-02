const API_BASE_URL = 'http://localhost:5000';

const apiService = {
  // Generic API call method
  apiCall: async function(endpoint, options) {
    options = options || {};
    const url = API_BASE_URL + endpoint;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Add any additional options
    if (options.method) config.method = options.method;
    if (options.body) config.body = options.body;
    if (options.headers) {
      Object.assign(config.headers, options.headers);
    }

    try {
      console.log('Making API call to:', url);
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data.error && data.error.message ? data.error.message : 'HTTP Error: ' + response.status);
      }

      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Call Error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to backend. Make sure the server is running on http://localhost:5000');
      }
      throw error;
    }
  },

  // Health Check
  healthCheck: async function() {
    return this.apiCall('/health');
  },

  // Get pricing for all providers
  getAllPricing: async function() {
    try {
      const aws = await this.apiCall('/api/pricing/aws');
      const azure = await this.apiCall('/api/pricing/azure');
      const gcp = await this.apiCall('/api/pricing/gcp');

      return { 
        aws: aws.data, 
        azure: azure.data, 
        gcp: gcp.data 
      };
    } catch (error) {
      console.error('Failed to load all pricing data:', error);
      throw error;
    }
  },

  // Get pricing for specific provider
  getPricing: async function(provider) {
    return this.apiCall('/api/pricing/' + provider);
  },

  // Get pricing for specific service
  getServicePricing: async function(provider, service) {
    return this.apiCall('/api/pricing/' + provider + '/' + service);
  },

  // Compare costs across all providers
  compareCosts: async function(configuration, selectedServices) {
    return this.apiCall('/api/calculator/compare', {
      method: 'POST',
      body: JSON.stringify({
        configuration: configuration,
        selectedServices: selectedServices
      })
    });
  },

  // Get cost estimate for single provider
  estimateCost: async function(provider, configuration, selectedServices) {
    return this.apiCall('/api/calculator/estimate', {
      method: 'POST',
      body: JSON.stringify({
        provider: provider,
        configuration: configuration,
        selectedServices: selectedServices
      })
    });
  },

  // Get optimization recommendations
  getOptimizations: async function(currentConfig, requirements) {
    return this.apiCall('/api/calculator/optimize', {
      method: 'POST',
      body: JSON.stringify({
        currentConfig: currentConfig,
        requirements: requirements
      })
    });
  },

  // Get system status
  getSystemStatus: async function() {
    return this.apiCall('/health/status');
  },

  // Test backend connection
  testConnection: async function() {
    try {
      const response = await this.healthCheck();
      return {
        connected: true,
        message: 'Backend connection successful',
        data: response
      };
    } catch (error) {
      return {
        connected: false,
        message: error.message,
        error: error
      };
    }
  }
};

// Export as default
export default apiService;