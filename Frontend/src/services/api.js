import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    
    // Extract error message
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

// API endpoints
export const pricingAPI = {
  // Calculate pricing for given configuration
  calculatePricing: async (services, configuration) => {
    try {
      const response = await api.post('/pricing/calculate', {
        services,
        configuration,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get pricing data for specific provider and service
  getServicePricing: async (provider, service, region = 'us-east-1') => {
    try {
      const response = await api.get(`/pricing/${provider}/${service}`, {
        params: { region },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all supported regions
  getRegions: async () => {
    try {
      const response = await api.get('/pricing/regions');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get instance types for compute services
  getInstanceTypes: async (provider, region = 'us-east-1') => {
    try {
      const response = await api.get(`/pricing/${provider}/instance-types`, {
        params: { region },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default api;



