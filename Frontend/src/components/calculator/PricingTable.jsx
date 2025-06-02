import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '../common/LoadingSpinner';

const PricingTable = ({ pricingData, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <LoadingSpinner text="Calculating costs..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-red-600">
          <p>Error loading pricing data: {error}</p>
        </div>
      </div>
    );
  }

  if (!pricingData || pricingData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <p>Configure your services above to see pricing comparison</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getLowestPrice = () => {
    return Math.min(...pricingData.map(provider => provider.totalCost));
  };

  const lowestPrice = getLowestPrice();

  const getSavingsPercentage = (cost) => {
    if (cost === lowestPrice) return 0;
    return Math.round(((cost - lowestPrice) / cost) * 100);
  };

  const providerLogos = {
    aws: '🟠',
    azure: '🔵',
    gcp: '🟢',
  };

  const providerNames = {
    aws: 'Amazon Web Services',
    azure: 'Microsoft Azure',
    gcp: 'Google Cloud Platform',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Monthly Cost Comparison
        </h2>
        <div className="text-sm text-gray-500">
          All prices in USD per month
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {pricingData.map((provider) => (
          <div key={provider.provider} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{providerLogos[provider.provider]}</span>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {providerNames[provider.provider]}
                  </h3>
                  {provider.totalCost === lowestPrice && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckIcon className="w-3 h-3 mr-1" />
                      Best Price
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(provider.totalCost)}
                </div>
                {getSavingsPercentage(provider.totalCost) > 0 && (
                  <div className="text-sm text-red-600">
                    +{getSavingsPercentage(provider.totalCost)}% more
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              {provider.breakdown.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{service.service}</span>
                  <span className="font-medium">{formatCurrency(service.cost)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cloud Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Monthly Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Savings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Breakdown
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pricingData.map((provider) => (
              <tr key={provider.provider} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{providerLogos[provider.provider]}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {providerNames[provider.provider]}
                      </div>
                      {provider.totalCost === lowestPrice && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          Best Price
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(provider.totalCost)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getSavingsPercentage(provider.totalCost) === 0 ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckIcon className="w-3 h-3 mr-1" />
                      Lowest Cost
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      +{getSavingsPercentage(provider.totalCost)}% more expensive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {provider.breakdown.map((service, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{service.service}:</span>
                        <span className="font-medium ml-2">{formatCurrency(service.cost)}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Cost Analysis Summary</h3>
        <div className="text-sm text-blue-800">
          <p>
            💰 <strong>Lowest cost:</strong> {formatCurrency(lowestPrice)} per month
          </p>
          <p className="mt-1">
            📊 <strong>Price difference:</strong> Up to {formatCurrency(Math.max(...pricingData.map(p => p.totalCost)) - lowestPrice)} per month
            ({Math.round(((Math.max(...pricingData.map(p => p.totalCost)) - lowestPrice) / Math.max(...pricingData.map(p => p.totalCost))) * 100)}% variation)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;