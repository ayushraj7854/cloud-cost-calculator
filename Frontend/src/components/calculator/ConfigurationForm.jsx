import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const ConfigurationForm = ({ selectedServices, onConfigurationChange }) => {
  const [config, setConfig] = useState({
    compute: {
      instanceType: 't3.medium',
      vcpus: 2,
      memory: 4,
      storage: 20,
      hours: 730, // 24*30.4 average hours per month
    },
    storage: {
      type: 'standard',
      size: 100,
      requests: 10000,
    },
    database: {
      type: 'mysql',
      instanceClass: 'db.t3.micro',
      storage: 20,
      backupRetention: 7,
    },
    networking: {
      dataTransfer: 100,
      loadBalancer: true,
      requests: 1000000,
    },
    region: 'us-east-1',
  });

  const handleInputChange = (service, field, value) => {
    const newConfig = {
      ...config,
      [service]: {
        ...config[service],
        [field]: value,
      },
    };
    setConfig(newConfig);
    onConfigurationChange(newConfig);
  };

  const handleRegionChange = (region) => {
    const newConfig = { ...config, region };
    setConfig(newConfig);
    onConfigurationChange(newConfig);
  };

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  ];

  const instanceTypes = [
    { value: 't3.micro', label: 't3.micro (1 vCPU, 1GB RAM)', popular: true },
    { value: 't3.small', label: 't3.small (1 vCPU, 2GB RAM)', popular: true },
    { value: 't3.medium', label: 't3.medium (2 vCPU, 4GB RAM)', popular: true },
    { value: 't3.large', label: 't3.large (2 vCPU, 8GB RAM)', popular: false },
    { value: 'm5.large', label: 'm5.large (2 vCPU, 8GB RAM)', popular: false },
    { value: 'm5.xlarge', label: 'm5.xlarge (4 vCPU, 16GB RAM)', popular: false },
  ];

  const FormSection = ({ title, children, tooltip }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {tooltip && (
          <div className="ml-2 group relative">
            <InformationCircleIcon className="h-5 w-5 text-gray-400 cursor-help" />
            <div className="absolute left-0 top-6 w-64 p-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'number', min, max, unit, tooltip }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {tooltip && (
          <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
            ℹ️
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min}
          max={max}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );

  const SelectField = ({ label, value, onChange, options, tooltip }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {tooltip && (
          <span className="ml-1 text-gray-400 cursor-help" title={tooltip}>
            ℹ️
          </span>
        )}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      {/* Region Selection */}
      <FormSection 
        title="Region Configuration" 
        tooltip="Select the geographic region where your resources will be deployed"
      >
        <SelectField
          label="Region"
          value={config.region}
          onChange={handleRegionChange}
          options={regions}
          tooltip="Different regions have different pricing structures"
        />
      </FormSection>

      {/* Compute Configuration */}
      {selectedServices.includes('compute') && (
        <FormSection 
          title="Compute Configuration" 
          tooltip="Configure your virtual machine specifications"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Instance Type"
              value={config.compute.instanceType}
              onChange={(value) => handleInputChange('compute', 'instanceType', value)}
              options={instanceTypes}
              tooltip="Choose the instance type that matches your performance needs"
            />
            <InputField
              label="Monthly Hours"
              value={config.compute.hours}
              onChange={(value) => handleInputChange('compute', 'hours', value)}
              min={1}
              max={744}
              unit="hrs"
              tooltip="Number of hours the instance will run per month (max 744)"
            />
            <InputField
              label="Root Storage"
              value={config.compute.storage}
              onChange={(value) => handleInputChange('compute', 'storage', value)}
              min={8}
              max={1000}
              unit="GB"
              tooltip="Root volume storage size in GB"
            />
          </div>
        </FormSection>
      )}

      {/* Storage Configuration */}
      {selectedServices.includes('storage') && (
        <FormSection 
          title="Storage Configuration" 
          tooltip="Configure additional storage requirements"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Storage Type"
              value={config.storage.type}
              onChange={(value) => handleInputChange('storage', 'type', value)}
              options={[
                { value: 'standard', label: 'Standard (HDD)' },
                { value: 'ssd', label: 'SSD (General Purpose)' },
                { value: 'provisioned', label: 'Provisioned IOPS SSD' },
              ]}
              tooltip="Choose storage type based on performance requirements"
            />
            <InputField
              label="Storage Size"
              value={config.storage.size}
              onChange={(value) => handleInputChange('storage', 'size', value)}
              min={1}
              max={10000}
              unit="GB"
              tooltip="Total storage capacity needed"
            />
            <InputField
              label="Monthly Requests"
              value={config.storage.requests}
              onChange={(value) => handleInputChange('storage', 'requests', value)}
              min={0}
              max={10000000}
              unit="requests"
              tooltip="Estimated number of storage requests per month"
            />
          </div>
        </FormSection>
      )}

      {/* Database Configuration */}
      {selectedServices.includes('database') && (
        <FormSection 
          title="Database Configuration" 
          tooltip="Configure managed database service options"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Database Type"
              value={config.database.type}
              onChange={(value) => handleInputChange('database', 'type', value)}
              options={[
                { value: 'mysql', label: 'MySQL' },
                { value: 'postgresql', label: 'PostgreSQL' },
                { value: 'mariadb', label: 'MariaDB' },
                { value: 'oracle', label: 'Oracle' },
              ]}
              tooltip="Choose your preferred database engine"
            />
            <SelectField
              label="Instance Class"
              value={config.database.instanceClass}
              onChange={(value) => handleInputChange('database', 'instanceClass', value)}
              options={[
                { value: 'db.t3.micro', label: 'db.t3.micro (1 vCPU, 1GB RAM)' },
                { value: 'db.t3.small', label: 'db.t3.small (1 vCPU, 2GB RAM)' },
                { value: 'db.t3.medium', label: 'db.t3.medium (2 vCPU, 4GB RAM)' },
                { value: 'db.m5.large', label: 'db.m5.large (2 vCPU, 8GB RAM)' },
              ]}
              tooltip="Database instance size and performance class"
            />
            <InputField
              label="Storage Size"
              value={config.database.storage}
              onChange={(value) => handleInputChange('database', 'storage', value)}
              min={20}
              max={1000}
              unit="GB"
              tooltip="Database storage capacity"
            />
            <InputField
              label="Backup Retention"
              value={config.database.backupRetention}
              onChange={(value) => handleInputChange('database', 'backupRetention', value)}
              min={0}
              max={35}
              unit="days"
              tooltip="Number of days to retain automated backups"
            />
          </div>
        </FormSection>
      )}

      {/* Networking Configuration */}
      {selectedServices.includes('networking') && (
        <FormSection 
          title="Networking Configuration" 
          tooltip="Configure networking and data transfer requirements"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Data Transfer Out"
              value={config.networking.dataTransfer}
              onChange={(value) => handleInputChange('networking', 'dataTransfer', value)}
              min={0}
              max={10000}
              unit="GB"
              tooltip="Amount of data transferred out of the cloud per month"
            />
            <InputField
              label="Load Balancer Requests"
              value={config.networking.requests}
              onChange={(value) => handleInputChange('networking', 'requests', value)}
              min={0}
              max={100000000}
              unit="requests"
              tooltip="Number of load balancer requests per month"
            />
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.networking.loadBalancer}
                  onChange={(e) => handleInputChange('networking', 'loadBalancer', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Include Load Balancer</span>
              </label>
            </div>
          </div>
        </FormSection>
      )}
    </div>
  );
};

export default ConfigurationForm;