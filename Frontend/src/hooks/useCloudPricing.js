import { useState, useCallback } from 'react';
import { pricingAPI } from '../services/api';
import { calculateAllProviderCosts } from '../services/calculations';

export const useCloudPricing = () => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastCalculation, setLastCalculation] = useState(null);

  const calculatePricing = useCallback(async (services, configuration) => {
    if (!services || services.length === 0) {
      setError('Please select at least one service to compare');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API first
      try {
        const apiResponse = await pricingAPI.calculatePricing(services, configuration);
        setPricingData(apiResponse.data || []);
        setLastCalculation({ services, configuration, timestamp: new Date() });
      } catch (apiError) {
        console.log('API unavailable, using local calculations:', apiError.message);
        
        // Fallback to local calculations if API is unavailable
        const localResults = calculateAllProviderCosts(services, configuration);
        setPricingData(localResults);
        setLastCalculation({ services, configuration, timestamp: new Date() });
      }
    } catch (calculationError) {
      console.error('Calculation error:', calculationError);
      setError(calculationError.message || 'Failed to calculate pricing. Please try again.');
      setPricingData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearPricingData = useCallback(() => {
    setPricingData([]);
    setError(null);
    setLastCalculation(null);
  }, []);

  const refreshPricing = useCallback(() => {
    if (lastCalculation) {
      calculatePricing(lastCalculation.services, lastCalculation.configuration);
    }
  }, [lastCalculation, calculatePricing]);

  return {
    pricingData,
    loading,
    error,
    lastCalculation,
    calculatePricing,
    clearPricingData,
    refreshPricing,
  };
};

export default useCloudPricing;