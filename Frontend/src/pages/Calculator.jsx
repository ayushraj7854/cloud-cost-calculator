import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [selectedServices, setSelectedServices] = useState(new Set(['compute', 'storage', 'database']));
  const [configuration, setConfiguration] = useState({
    region: 'us-east-1',
    instanceSize: 'medium',
    usageHours: 730,
    storageGB: 100,
    dataTransfer: 50,
    databaseSize: 20,
    apiCalls: 1000000,
    lambdaInvocations: 1000000,
    containerHours: 730
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extended service configuration with more cloud services
  const serviceConfig = {
    // Core Infrastructure
    compute: { 
      name: 'Virtual Machines', 
      icon: '🖥️',
      category: 'Core Infrastructure',
      pricing: {
        micro: { aws: 0.0116, azure: 0.012, gcp: 0.0104 },
        small: { aws: 0.023, azure: 0.024, gcp: 0.021 },
        medium: { aws: 0.046, azure: 0.048, gcp: 0.042 },
        large: { aws: 0.092, azure: 0.096, gcp: 0.084 },
        xlarge: { aws: 0.184, azure: 0.192, gcp: 0.168 },
        '2xlarge': { aws: 0.368, azure: 0.384, gcp: 0.336 }
      }
    },
    storage: { 
      name: 'Object Storage', 
      icon: '💾',
      category: 'Core Infrastructure',
      pricing: { perGB: { aws: 0.023, azure: 0.024, gcp: 0.020 } }
    },
    database: { 
      name: 'Managed Database', 
      icon: '🗄️',
      category: 'Core Infrastructure',
      pricing: { perGB: { aws: 0.115, azure: 0.120, gcp: 0.108 } }
    },

    // Serverless & Functions
    lambda: {
      name: 'Serverless Functions',
      icon: '⚡',
      category: 'Serverless',
      pricing: { perMillion: { aws: 0.20, azure: 0.20, gcp: 0.40 } }
    },
    apigateway: {
      name: 'API Gateway',
      icon: '🔗',
      category: 'Serverless',
      pricing: { perMillion: { aws: 3.50, azure: 3.50, gcp: 3.00 } }
    },
    containers: {
      name: 'Container Service',
      icon: '📦',
      category: 'Serverless',
      pricing: { perHour: { aws: 0.0464, azure: 0.048, gcp: 0.042 } }
    },

    // Networking & CDN
    network: { 
      name: 'Data Transfer', 
      icon: '🌐',
      category: 'Networking',
      pricing: { perGB: { aws: 0.09, azure: 0.087, gcp: 0.085 } }
    },
    cdn: { 
      name: 'Content Delivery Network', 
      icon: '🚀',
      category: 'Networking',
      pricing: { perGB: { aws: 0.085, azure: 0.081, gcp: 0.08 } }
    },
    loadbalancer: { 
      name: 'Load Balancer', 
      icon: '⚖️',
      category: 'Networking',
      pricing: { monthly: { aws: 22.50, azure: 24.00, gcp: 20.00 } }
    },
    dns: {
      name: 'DNS Service',
      icon: '🔍',
      category: 'Networking',
      pricing: { monthly: { aws: 0.50, azure: 0.60, gcp: 0.20 } }
    },

    // AI & Machine Learning
    ai: {
      name: 'AI/ML Services',
      icon: '🤖',
      category: 'AI & ML',
      pricing: { monthly: { aws: 50.00, azure: 55.00, gcp: 45.00 } }
    },
    speechtotext: {
      name: 'Speech to Text',
      icon: '🎤',
      category: 'AI & ML',
      pricing: { perHour: { aws: 2.40, azure: 2.50, gcp: 2.16 } }
    },
    vision: {
      name: 'Computer Vision',
      icon: '👁️',
      category: 'AI & ML',
      pricing: { per1000: { aws: 1.50, azure: 1.50, gcp: 1.50 } }
    },

    // Analytics & Big Data
    analytics: {
      name: 'Data Analytics',
      icon: '📊',
      category: 'Analytics',
      pricing: { monthly: { aws: 100.00, azure: 110.00, gcp: 95.00 } }
    },
    datawarehouse: {
      name: 'Data Warehouse',
      icon: '🏭',
      category: 'Analytics',
      pricing: { perGB: { aws: 0.25, azure: 0.28, gcp: 0.23 } }
    },
    bigdata: {
      name: 'Big Data Processing',
      icon: '📈',
      category: 'Analytics',
      pricing: { perHour: { aws: 0.096, azure: 0.10, gcp: 0.088 } }
    },

    // Security & Identity
    security: { 
      name: 'Security Services', 
      icon: '🔒',
      category: 'Security',
      pricing: { monthly: { aws: 25.00, azure: 27.00, gcp: 23.00 } }
    },
    identity: {
      name: 'Identity Management',
      icon: '👤',
      category: 'Security',
      pricing: { perUser: { aws: 2.00, azure: 1.00, gcp: 1.50 } }
    },
    certificates: {
      name: 'SSL Certificates',
      icon: '🔐',
      category: 'Security',
      pricing: { monthly: { aws: 0.75, azure: 0.75, gcp: 0.75 } }
    },

    // Monitoring & DevOps
    monitoring: { 
      name: 'Monitoring & Logging', 
      icon: '📊',
      category: 'DevOps',
      pricing: { monthly: { aws: 15.00, azure: 16.50, gcp: 14.00 } }
    },
    backup: {
      name: 'Backup Service',
      icon: '💽',
      category: 'DevOps',
      pricing: { perGB: { aws: 0.05, azure: 0.055, gcp: 0.045 } }
    },
    cicd: {
      name: 'CI/CD Pipeline',
      icon: '🔄',
      category: 'DevOps',
      pricing: { monthly: { aws: 10.00, azure: 12.00, gcp: 8.00 } }
    },

    // Communication & Messaging
    email: {
      name: 'Email Service',
      icon: '📧',
      category: 'Communication',
      pricing: { per1000: { aws: 0.10, azure: 0.12, gcp: 0.08 } }
    },
    sms: {
      name: 'SMS Service',
      icon: '📱',
      category: 'Communication',
      pricing: { perMessage: { aws: 0.0075, azure: 0.008, gcp: 0.007 } }
    },
    messaging: {
      name: 'Message Queue',
      icon: '📮',
      category: 'Communication',
      pricing: { perMillion: { aws: 0.40, azure: 0.45, gcp: 0.35 } }
    }
  };

  // CSS styles as JavaScript object
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#2d3748',
      padding: 0,
      margin: 0
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#4a5568',
      margin: 0
    },
    mainContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    configSection: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    configGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formLabel: {
      fontWeight: '500',
      marginBottom: '0.5rem',
      color: '#2d3748',
      fontSize: '0.9rem'
    },
    formInput: {
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      backgroundColor: 'white'
    },
    serviceCategories: {
      marginBottom: '1.5rem'
    },
    categorySection: {
      marginBottom: '1.5rem',
      background: '#f8fafc',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    categoryTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    serviceTabs: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    serviceTab: {
      padding: '0.5rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    serviceTabActive: {
      background: '#667eea',
      color: 'white',
      borderColor: '#667eea'
    },
    calculateBtn: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%'
    },
    resultsSection: {
      marginTop: '2rem'
    },
    summaryCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    summaryCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    },
    comparisonTable: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem'
    },
    tableHeader: {
      background: '#f8fafc',
      padding: '1rem 0.75rem',
      textAlign: 'left',
      fontWeight: '600',
      color: '#2d3748',
      borderBottom: '2px solid #e2e8f0',
      fontSize: '0.9rem'
    },
    tableCell: {
      padding: '0.75rem',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '0.9rem'
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      color: '#4a5568'
    }
  };

  const calculateComparison = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let serviceResults = [];
      let totalCosts = { aws: 0, azure: 0, gcp: 0 };

      Array.from(selectedServices).forEach(serviceKey => {
        const service = serviceConfig[serviceKey];
        let costs = { aws: 0, azure: 0, gcp: 0 };

        // Calculate costs based on service type
        if (serviceKey === 'compute') {
          costs.aws = service.pricing[configuration.instanceSize].aws * configuration.usageHours;
          costs.azure = service.pricing[configuration.instanceSize].azure * configuration.usageHours;
          costs.gcp = service.pricing[configuration.instanceSize].gcp * configuration.usageHours;
        } else if (serviceKey === 'storage' || serviceKey === 'backup') {
          costs.aws = service.pricing.perGB.aws * configuration.storageGB;
          costs.azure = service.pricing.perGB.azure * configuration.storageGB;
          costs.gcp = service.pricing.perGB.gcp * configuration.storageGB;
        } else if (serviceKey === 'database' || serviceKey === 'datawarehouse') {
          costs.aws = service.pricing.perGB.aws * configuration.databaseSize;
          costs.azure = service.pricing.perGB.azure * configuration.databaseSize;
          costs.gcp = service.pricing.perGB.gcp * configuration.databaseSize;
        } else if (serviceKey === 'network' || serviceKey === 'cdn') {
          costs.aws = service.pricing.perGB.aws * configuration.dataTransfer;
          costs.azure = service.pricing.perGB.azure * configuration.dataTransfer;
          costs.gcp = service.pricing.perGB.gcp * configuration.dataTransfer;
        } else if (serviceKey === 'lambda') {
          costs.aws = service.pricing.perMillion.aws * (configuration.lambdaInvocations / 1000000);
          costs.azure = service.pricing.perMillion.azure * (configuration.lambdaInvocations / 1000000);
          costs.gcp = service.pricing.perMillion.gcp * (configuration.lambdaInvocations / 1000000);
        } else if (serviceKey === 'apigateway') {
          costs.aws = service.pricing.perMillion.aws * (configuration.apiCalls / 1000000);
          costs.azure = service.pricing.perMillion.azure * (configuration.apiCalls / 1000000);
          costs.gcp = service.pricing.perMillion.gcp * (configuration.apiCalls / 1000000);
        } else if (serviceKey === 'containers' || serviceKey === 'bigdata') {
          costs.aws = service.pricing.perHour.aws * configuration.containerHours;
          costs.azure = service.pricing.perHour.azure * configuration.containerHours;
          costs.gcp = service.pricing.perHour.gcp * configuration.containerHours;
        } else if (service.pricing.monthly) {
          costs.aws = service.pricing.monthly.aws;
          costs.azure = service.pricing.monthly.azure;
          costs.gcp = service.pricing.monthly.gcp;
        } else if (service.pricing.perUser) {
          costs.aws = service.pricing.perUser.aws * 10; // Assume 10 users
          costs.azure = service.pricing.perUser.azure * 10;
          costs.gcp = service.pricing.perUser.gcp * 10;
        } else if (service.pricing.per1000) {
          costs.aws = service.pricing.per1000.aws * 10; // Assume 10k operations
          costs.azure = service.pricing.per1000.azure * 10;
          costs.gcp = service.pricing.per1000.gcp * 10;
        } else if (service.pricing.perMessage) {
          costs.aws = service.pricing.perMessage.aws * 1000; // Assume 1k messages
          costs.azure = service.pricing.perMessage.azure * 1000;
          costs.gcp = service.pricing.perMessage.gcp * 1000;
        } else if (service.pricing.perHour) {
          costs.aws = service.pricing.perHour.aws * 100; // Assume 100 hours
          costs.azure = service.pricing.perHour.azure * 100;
          costs.gcp = service.pricing.perHour.gcp * 100;
        }

        totalCosts.aws += costs.aws;
        totalCosts.azure += costs.azure;
        totalCosts.gcp += costs.gcp;

        serviceResults.push({
          service: service.name,
          icon: service.icon,
          category: service.category,
          costs: costs
        });
      });

      const providers = ['aws', 'azure', 'gcp'];
      const cheapest = providers.reduce((a, b) => totalCosts[a] < totalCosts[b] ? a : b);
      const mostExpensive = providers.reduce((a, b) => totalCosts[a] > totalCosts[b] ? a : b);
      const savings = Math.round(totalCosts[mostExpensive] - totalCosts[cheapest]);

      setResults({
        services: serviceResults,
        totalCosts,
        cheapest,
        savings,
        selectedServicesCount: selectedServices.size
      });
      
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => calculateComparison(), 500);
  }, []);

  const toggleService = (service) => {
    const newServices = new Set(selectedServices);
    if (newServices.has(service)) {
      newServices.delete(service);
    } else {
      newServices.add(service);
    }
    setSelectedServices(newServices);
  };

  const getCheapestStyle = (costs, provider) => {
    const minCost = Math.min(costs.aws, costs.azure, costs.gcp);
    if (costs[provider] === minCost) {
      return {
        background: '#c6f6d5',
        fontWeight: 'bold',
        color: '#2d5a2d'
      };
    }
    return {};
  };

  // Group services by category
  const servicesByCategory = {};
  Object.entries(serviceConfig).forEach(([key, service]) => {
    if (!servicesByCategory[service.category]) {
      servicesByCategory[service.category] = [];
    }
    servicesByCategory[service.category].push({ key, ...service });
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Cloud Cost Comparison Calculator</h1>
        <p style={styles.subtitle}>
          Compare AWS, Azure, and Google Cloud Platform pricing across 25+ services
        </p>
      </div>

      <div style={styles.mainContainer}>
        {/* Configuration Section */}
        <div style={styles.configSection}>
          <h2 style={styles.sectionTitle}>
            <span>⚙️</span> Configuration
          </h2>
          
          <div style={styles.configGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Region</label>
              <select 
                style={styles.formInput}
                value={configuration.region}
                onChange={(e) => setConfiguration({...configuration, region: e.target.value})}
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">Europe (Ireland)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                <option value="eu-central-1">Europe (Frankfurt)</option>
                <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Instance Size</label>
              <select 
                style={styles.formInput}
                value={configuration.instanceSize}
                onChange={(e) => setConfiguration({...configuration, instanceSize: e.target.value})}
              >
                <option value="micro">Micro (1 vCPU, 1GB RAM)</option>
                <option value="small">Small (1 vCPU, 2GB RAM)</option>
                <option value="medium">Medium (2 vCPU, 4GB RAM)</option>
                <option value="large">Large (2 vCPU, 8GB RAM)</option>
                <option value="xlarge">XLarge (4 vCPU, 16GB RAM)</option>
                <option value="2xlarge">2XLarge (8 vCPU, 32GB RAM)</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Usage Hours/Month</label>
              <input 
                type="number" 
                style={styles.formInput}
                value={configuration.usageHours}
                onChange={(e) => setConfiguration({...configuration, usageHours: parseInt(e.target.value)})}
                min="1" 
                max="8760"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Storage (GB)</label>
              <input 
                type="number" 
                style={styles.formInput}
                value={configuration.storageGB}
                onChange={(e) => setConfiguration({...configuration, storageGB: parseInt(e.target.value)})}
                min="0"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Data Transfer (GB)</label>
              <input 
                type="number" 
                style={styles.formInput}
                value={configuration.dataTransfer}
                onChange={(e) => setConfiguration({...configuration, dataTransfer: parseInt(e.target.value)})}
                min="0"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Database Size (GB)</label>
              <input 
                type="number" 
                style={styles.formInput}
                value={configuration.databaseSize}
                onChange={(e) => setConfiguration({...configuration, databaseSize: parseInt(e.target.value)})}
                min="0"
              />
            </div>
          </div>

          {/* Service Selection by Category */}
          <div style={styles.serviceCategories}>
            <h3 style={styles.sectionTitle}>📋 Services to Compare</h3>
            
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category} style={styles.categorySection}>
                <h4 style={styles.categoryTitle}>
                  <span>{services[0].icon}</span> {category}
                </h4>
                <div style={styles.serviceTabs}>
                  {services.map(service => (
                    <div
                      key={service.key}
                      style={{
                        ...styles.serviceTab,
                        ...(selectedServices.has(service.key) ? styles.serviceTabActive : {})
                      }}
                      onClick={() => toggleService(service.key)}
                    >
                      <span>{service.icon}</span>
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            style={styles.calculateBtn}
            onClick={calculateComparison}
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : '🔄 Compare Costs Across All Providers'}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={styles.loading}>
            <h3>Comparing costs across AWS, Azure, and Google Cloud...</h3>
            <p>Analyzing pricing for {selectedServices.size} selected services...</p>
          </div>
        )}

        {/* Results Section */}
        {results && !isLoading && (
          <div style={styles.resultsSection}>
            {/* Summary Cards */}
            <div style={styles.summaryCards}>
              <div style={styles.summaryCard}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Most Cost-Effective
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {results.cheapest?.toUpperCase()}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Monthly Savings
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#38a169' }}>
                  ${results.savings}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Services Compared
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  {results.selectedServicesCount}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💵</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Best Monthly Cost
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#38a169' }}>
                  ${results.totalCosts[results.cheapest]?.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div style={styles.comparisonTable}>
              <h2 style={{ marginBottom: '1rem', color: '#2d3748', fontSize: '1.3rem' }}>
                📈 Detailed Cost Comparison
              </h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Service</th>
                    <th style={styles.tableHeader}>AWS</th>
                    <th style={styles.tableHeader}>Microsoft Azure</th>
                    <th style={styles.tableHeader}>Google Cloud</th>
                    <th style={styles.tableHeader}>Best Value</th>
                  </tr>
                </thead>
                <tbody>
                  {results.services.map((result, index) => {
                    const minCost = Math.min(result.costs.aws, result.costs.azure, result.costs.gcp);
                    const bestProvider = result.costs.aws === minCost ? 'AWS' : 
                                       result.costs.azure === minCost ? 'Azure' : 'GCP';

                    return (
                      <tr key={index}>
                        <td style={styles.tableCell}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{result.icon}</span>
                            <div>
                              <div style={{ fontWeight: '600' }}>{result.service}</div>
                              <div style={{ fontSize: '0.8rem', color: '#666' }}>{result.category}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{
                          ...styles.tableCell,
                          ...getCheapestStyle(result.costs, 'aws'),
                          color: '#FF9900',
                          fontWeight: '600'
                        }}>
                          ${result.costs.aws.toFixed(2)}
                        </td>
                        <td style={{
                          ...styles.tableCell,
                          ...getCheapestStyle(result.costs, 'azure'),
                          color: '#0078D4',
                          fontWeight: '600'
                        }}>
                          ${result.costs.azure.toFixed(2)}
                        </td>
                        <td style={{
                          ...styles.tableCell,
                          ...getCheapestStyle(result.costs, 'gcp'),
                          color: '#4285F4',
                          fontWeight: '600'
                        }}>
                          ${result.costs.gcp.toFixed(2)}
                        </td>
                        <td style={{
                          ...styles.tableCell,
                          fontWeight: '700',
                          color: '#38a169'
                        }}>
                          {bestProvider}
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Total Row */}
                  <tr style={{ background: '#f8fafc', fontWeight: '700' }}>
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🏆</span>
                        <strong>TOTAL MONTHLY COST</strong>
                      </div>
                    </td>
                    <td style={{
                      ...styles.tableCell,
                      ...getCheapestStyle(results.totalCosts, 'aws'),
                      color: '#FF9900',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}>
                      ${results.totalCosts.aws.toFixed(2)}
                    </td>
                    <td style={{
                      ...styles.tableCell,
                      ...getCheapestStyle(results.totalCosts, 'azure'),
                      color: '#0078D4',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}>
                      ${results.totalCosts.azure.toFixed(2)}
                    </td>
                    <td style={{
                      ...styles.tableCell,
                      ...getCheapestStyle(results.totalCosts, 'gcp'),
                      color: '#4285F4',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}>
                      ${results.totalCosts.gcp.toFixed(2)}
                    </td>
                    <td style={{
                      ...styles.tableCell,
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#38a169'
                    }}>
                      Save ${results.savings}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default Calculator;
