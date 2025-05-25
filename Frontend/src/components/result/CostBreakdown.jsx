import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const CostBreakdown = ({ pricingData }) => {
  const [expandedProviders, setExpandedProviders] = React.useState({});

  const toggleProvider = (provider) => {
    setExpandedProviders(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const providerNames = {
    aws: 'Amazon Web Services',
    azure: 'Microsoft Azure',
    gcp: 'Google Cloud Platform',
  };

  const providerColors = {
    aws: 'border-orange-200 bg-orange-50',
    azure: 'border-blue-200 bg-blue-50',
    gcp: 'border-green-200 bg-green-50',
  };

  if (!pricingData || pricingData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
        <p className="text-gray-500">No pricing data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Cost Breakdown</h2>
      
      <div className="space-y-4">
        {pricingData.map((provider) => (
          <div
            key={provider.provider}
            className={`border-2 rounded-lg ${providerColors[provider.provider]}`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => toggleProvider(provider.provider)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {providerNames[provider.provider]}
                  </h3>
                  <span className="ml-3 text-2xl font-bold text-gray-900">
                    {formatCurrency(provider.totalCost)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">/month</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {provider.breakdown?.length || 0} services
                  </span>
                  {expandedProviders[provider.provider] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedProviders[provider.provider] && (
              <div className="px-4 pb-4">
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-3">
                    {provider.breakdown?.map((service, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 capitalize">
                              {service.service}
                            </h4>
                            {service.details && (
                              <p className="text-xs text-gray-500 mt-1">
                                {service.details}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(service.cost)}
                          </span>
                          <p className="text-xs text-gray-500">
                            {((service.cost / provider.totalCost) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cost per hour breakdown */}
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-white rounded-md p-3">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Cost Breakdown</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Per Hour:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(provider.totalCost / 730)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Per Day:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(provider.totalCost / 30.4)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Per Year:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(provider.totalCost * 12)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Per Week:</span>
                        <span className="ml-2 font-medium">
                          {formatCurrency(provider.totalCost / 4.33)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Services:</span>
            <span className="ml-2 font-medium">
              {new Set(pricingData.flatMap(p => p.breakdown?.map(b => b.service) || [])).size}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Price Range:</span>
            <span className="ml-2 font-medium">
              {formatCurrency(Math.min(...pricingData.map(p => p.totalCost)))} - {formatCurrency(Math.max(...pricingData.map(p => p.totalCost)))}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Avg Cost:</span>
            <span className="ml-2 font-medium">
              {formatCurrency(pricingData.reduce((sum, p) => sum + p.totalCost, 0) / pricingData.length)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;