import React, { useState, useEffect } from 'react';
import ServiceSelector from '../components/calculator/ServiceSelector';
import ConfigurationForm from '../components/calculator/ConfigurationForm';
import PricingTable from '../components/calculator/PricingTable';
import ComparisonChart from '../components/calculator/ComparisonChart';
import CostBreakdown from '../components/results/CostBreakdown';
import RecommendationCard from '../components/results/RecommendationCard';
import ExportOptions from '../components/results/ExportOptions';
import { useCloudPricing } from '../hooks/useCloudPricing';
import { useCalculator } from '../hooks/useCalculator';
import ErrorMessage from '../components/common/ErrorMessage';

const Calculator = () => {
  const [selectedServices, setSelectedServices] = useState(['compute']);
  const [configuration, setConfiguration] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('table');

  const { 
    pricingData, 
    loading, 
    error, 
    calculatePricing 
  } = useCloudPricing();

  const { 
    savedConfigurations, 
    saveConfiguration, 
    loadConfiguration 
  } = useCalculator();

  useEffect(() => {
    if (selectedServices.length > 0 && Object.keys(configuration).length > 0) {
      calculatePricing(selectedServices, configuration);
      setShowResults(true);
    }
  }, [selectedServices, configuration, calculatePricing]);

  const handleServiceChange = (services) => {
    setSelectedServices(services);
    if (services.length === 0) {
      setShowResults(false);
    }
  };

  const handleConfigurationChange = (config) => {
    setConfiguration(config);
  };

  const handleSaveConfiguration = () => {
    const configName = prompt('Enter a name for this configuration:');
    if (configName) {
      saveConfiguration(configName, { selectedServices, configuration });
    }
  };

  const handleLoadConfiguration = (configName) => {
    const config = loadConfiguration(configName);
    if (config) {
      setSelectedServices(config.selectedServices);
      setConfiguration(config.configuration);
    }
  };

  const tabs = [
    { id: 'table', name: 'Pricing Table', icon: '📊' },
    { id: 'chart', name: 'Charts', icon: '📈' },
    { id: 'breakdown', name: 'Breakdown', icon: '🔍' },
    { id: 'recommendations', name: 'Recommendations', icon: '💡' },
    { id: 'export', name: 'Export', icon: '📤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cloud Cost Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Compare costs across AWS, Azure, and Google Cloud Platform
          </p>
        </div>

        {/* Saved Configurations */}
        {savedConfigurations.length > 0 && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Saved Configurations
            </h3>
            <div className="flex flex-wrap gap-2">
              {savedConfigurations.map((config, index) => (
                <button
                  key={index}
                  onClick={() => handleLoadConfiguration(config.name)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                >
                  {config.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Configuration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <ServiceSelector
              selectedServices={selectedServices}
              onServiceChange={handleServiceChange}
            />

            {/* Configuration Form */}
            {selectedServices.length > 0 && (
              <ConfigurationForm
                selectedServices={selectedServices}
                onConfigurationChange={handleConfigurationChange}
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleSaveConfiguration}
                  disabled={selectedServices.length === 0}
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  💾 Save Configuration
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  🔄 Reset Calculator
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  disabled={!showResults}
                  className="w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  📊 Export Results
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">
                💡 Quick Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Start with Compute and Storage for basic comparison</li>
                <li>• Use realistic usage hours for accurate pricing</li>
                <li>• Consider different regions for cost optimization</li>
                <li>• Save configurations to compare different scenarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onClose={() => {}} // Error clearing would be handled by the hook
            />
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {/* Results Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Content */}
            <div className="min-h-96">
              {activeTab === 'table' && (
                <PricingTable
                  pricingData={pricingData}
                  loading={loading}
                  error={error}
                />
              )}

              {activeTab === 'chart' && (
                <ComparisonChart
                  pricingData={pricingData}
                  chartType="bar"
                />
              )}

              {activeTab === 'breakdown' && (
                <CostBreakdown pricingData={pricingData} />
              )}

              {activeTab === 'recommendations' && (
                <RecommendationCard
                  pricingData={pricingData}
                  configuration={configuration}
                />
              )}

              {activeTab === 'export' && (
                <ExportOptions
                  pricingData={pricingData}
                  configuration={configuration}
                />
              )}
            </div>
          </div>
        )}

        {/* Getting Started */}
        {!showResults && selectedServices.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to Cloud Cost Calculator
              </h3>
              <p className="text-gray-600 mb-6">
                Select the services you want to compare to get started with your cost analysis.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Popular Starting Points:</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedServices(['compute'])}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all"
                  >
                    🖥️ Virtual Machines Only
                  </button>
                  <button
                    onClick={() => setSelectedServices(['compute', 'storage'])}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all"
                  >
                    💾 Compute + Storage
                  </button>
                  <button
                    onClick={() => setSelectedServices(['compute', 'storage', 'database'])}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all"
                  >
                    🗄️ Full Web Application Stack
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;