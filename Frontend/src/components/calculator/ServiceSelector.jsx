import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const ServiceSelector = ({ selectedServices, onServiceChange }) => {
  const services = [
    {
      id: 'compute',
      name: 'Compute Instances',
      description: 'Virtual machines and compute resources',
      icon: '🖥️',
      popular: true,
    },
    {
      id: 'storage',
      name: 'Storage',
      description: 'Block, object, and file storage',
      icon: '💾',
      popular: true,
    },
    {
      id: 'database',
      name: 'Databases',
      description: 'Managed database services',
      icon: '🗄️',
      popular: false,
    },
    {
      id: 'networking',
      name: 'Networking',
      description: 'Load balancers, CDN, and bandwidth',
      icon: '🌐',
      popular: false,
    },
  ];

  const handleServiceToggle = (serviceId) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    onServiceChange(newServices);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Select Services to Compare
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`relative rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedServices.includes(service.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleServiceToggle(service.id)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900">
                        {service.name}
                      </h3>
                      {service.popular && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>
                {selectedServices.includes(service.id) && (
                  <CheckIcon className="h-5 w-5 text-blue-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> Select multiple services for comprehensive cost comparison.
          Start with Compute and Storage for basic infrastructure costs.
        </p>
      </div>
    </div>
  );
};

export default ServiceSelector;