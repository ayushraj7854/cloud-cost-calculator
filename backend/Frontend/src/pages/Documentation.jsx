import React, { useState } from 'react';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'examples', title: 'Examples' },
    { id: 'faq', title: 'FAQ' }
  ];

  const faqs = [
    {
      question: 'How accurate are the cost calculations?',
      answer: 'Our calculations are based on official pricing from cloud providers and are updated regularly. However, actual costs may vary based on specific configurations, discounts, and regional pricing variations.'
    },
    {
      question: 'Which cloud providers are supported?',
      answer: 'Currently, we support Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We are continuously working to add more providers and services.'
    },
    {
      question: 'Can I save my calculations?',
      answer: 'Yes! You can save your configurations locally in your browser and export results in multiple formats including CSV and JSON for further analysis.'
    },
    {
      question: 'Is this tool free to use?',
      answer: 'Yes, this is a free tool created as an educational project. There are no charges for using the calculator or accessing any of its features.'
    },
    {
      question: 'How often is pricing data updated?',
      answer: 'We strive to keep our pricing data as current as possible. However, cloud provider pricing can change frequently, so we recommend verifying critical calculations with official provider pricing tools.'
    },
    {
      question: 'Can I compare custom configurations?',
      answer: 'Yes! Our calculator allows you to customize instance sizes, regions, usage hours, storage amounts, and many other parameters to match your specific requirements.'
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/pricing/aws',
      description: 'Get AWS pricing information',
      params: ['service', 'region', 'instanceType']
    },
    {
      method: 'GET',
      endpoint: '/api/pricing/azure',
      description: 'Get Azure pricing information',
      params: ['service', 'region', 'vmSize']
    },
    {
      method: 'GET',
      endpoint: '/api/pricing/gcp',
      description: 'Get Google Cloud pricing information',
      params: ['service', 'region', 'machineType']
    },
    {
      method: 'POST',
      endpoint: '/api/calculate',
      description: 'Calculate costs across providers',
      params: ['providers', 'configuration', 'duration']
    }
  ];

  const examples = [
    {
      title: 'Basic Compute Comparison',
      description: 'Compare virtual machine costs across all providers',
      code: `{
  "providers": ["aws", "azure", "gcp"],
  "service": "compute",
  "configuration": {
    "instanceType": "medium",
    "region": "us-east-1",
    "hours": 730
  }
}`
    },
    {
      title: 'Storage Cost Analysis',
      description: 'Calculate storage costs with different configurations',
      code: `{
  "service": "storage",
  "configuration": {
    "storageGB": 1000,
    "region": "us-west-2",
    "storageClass": "standard"
  }
}`
    },
    {
      title: 'Multi-Service Comparison',
      description: 'Compare costs across multiple services simultaneously',
      code: `{
  "services": ["compute", "storage", "database"],
  "providers": ["aws", "azure", "gcp"],
  "configuration": {
    "region": "eu-west-1",
    "compute": { "instanceType": "large", "hours": 730 },
    "storage": { "sizeGB": 500 },
    "database": { "sizeGB": 100 }
  }
}`
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            Documentation
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#4a5568',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Complete guide to using the Cloud Cost Calculator
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '40px'
      }}>
        {/* Sidebar Navigation */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '30px',
          height: 'fit-content',
          position: 'sticky',
          top: '20px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '20px',
            fontSize: '1.1rem'
          }}>
            Navigation
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeSection === section.id ? '#667eea' : 'transparent',
                  color: activeSection === section.id ? 'white' : '#4a5568',
                  fontWeight: activeSection === section.id ? 'bold' : 'normal'
                }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Getting Started Section */}
          {activeSection === 'getting-started' && (
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '30px'
              }}>
                Getting Started
              </h2>
              
              <div style={{ maxWidth: 'none' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  Quick Start Guide
                </h3>
                <ol style={{
                  paddingLeft: '20px',
                  marginBottom: '30px',
                  lineHeight: '1.8'
                }}>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Navigate to the Calculator page</li>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Select your preferred cloud services from the available options</li>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Configure your requirements (instance type, region, usage hours, etc.)</li>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Click "Compare Costs" to see detailed cost comparisons</li>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Review the results and optimization recommendations</li>
                  <li style={{ marginBottom: '8px', color: '#4a5568' }}>Export or save your results for future reference</li>
                </ol>

                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  Supported Services
                </h3>
                <ul style={{
                  paddingLeft: '20px',
                  marginBottom: '30px',
                  lineHeight: '1.8'
                }}>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>Compute:</strong> Virtual machines, containers, serverless functions
                  </li>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>Storage:</strong> Object storage, block storage, file storage
                  </li>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>Database:</strong> Relational databases, NoSQL, managed database services
                  </li>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>Networking:</strong> Load balancers, CDN, data transfer
                  </li>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>AI/ML:</strong> Machine learning services, AI APIs
                  </li>
                  <li style={{ marginBottom: '5px', color: '#4a5568' }}>
                    <strong>Security:</strong> Identity management, security services
                  </li>
                </ul>

                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  Tips for Accurate Calculations
                </h3>
                <div style={{
                  backgroundColor: '#e6f3ff',
                  border: '1px solid #b3d9ff',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <ul style={{
                    paddingLeft: '20px',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    <li style={{ marginBottom: '8px', color: '#2563eb', fontSize: '0.95rem' }}>
                      Always specify the correct region for your workload
                    </li>
                    <li style={{ marginBottom: '8px', color: '#2563eb', fontSize: '0.95rem' }}>
                      Consider your actual usage patterns, not just peak requirements
                    </li>
                    <li style={{ marginBottom: '8px', color: '#2563eb', fontSize: '0.95rem' }}>
                      Factor in data transfer costs for multi-region deployments
                    </li>
                    <li style={{ marginBottom: '8px', color: '#2563eb', fontSize: '0.95rem' }}>
                      Remember that prices may vary based on commitment levels and discounts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* API Reference Section */}
          {activeSection === 'api-reference' && (
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '30px'
              }}>
                API Reference
              </h2>
              
              <div style={{ marginBottom: '30px' }}>
                <p style={{ color: '#4a5568', marginBottom: '20px' }}>
                  Base URL: <code style={{
                    backgroundColor: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                  }}>
                    http://localhost:5000
                  </code>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        marginRight: '15px',
                        backgroundColor: endpoint.method === 'GET' ? '#dcfce7' : '#e0e7ff',
                        color: endpoint.method === 'GET' ? '#166534' : '#1e40af'
                      }}>
                        {endpoint.method}
                      </span>
                      <code style={{
                        fontSize: '0.95rem',
                        fontFamily: 'monospace',
                        color: '#2d3748'
                      }}>
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p style={{
                      color: '#4a5568',
                      fontSize: '0.95rem',
                      marginBottom: '15px'
                    }}>
                      {endpoint.description}
                    </p>
                    <div>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        color: '#2d3748',
                        marginBottom: '10px'
                      }}>
                        Parameters:
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {endpoint.params.map((param, idx) => (
                          <span key={idx} style={{
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            padding: '4px 12px',
                            fontSize: '0.8rem',
                            borderRadius: '4px',
                            fontFamily: 'monospace'
                          }}>
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples Section */}
          {activeSection === 'examples' && (
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '30px'
              }}>
                Examples
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {examples.map((example, index) => (
                  <div key={index}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#2d3748',
                      marginBottom: '10px'
                    }}>
                      {example.title}
                    </h3>
                    <p style={{
                      color: '#4a5568',
                      marginBottom: '15px'
                    }}>
                      {example.description}
                    </p>
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      padding: '20px',
                      overflowX: 'auto'
                    }}>
                      <pre style={{
                        color: '#10b981',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        margin: 0,
                        whiteSpace: 'pre-wrap'
                      }}>
                        {example.code}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '30px'
              }}>
                Frequently Asked Questions
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {faqs.map((faq, index) => (
                  <div key={index} style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <span style={{
                        fontWeight: 'bold',
                        color: '#2d3748',
                        fontSize: '1rem'
                      }}>
                        {faq.question}
                      </span>
                      <span style={{
                        color: '#4a5568',
                        fontSize: '1.2rem'
                      }}>
                        {expandedFaq === index ? '−' : '+'}
                      </span>
                    </button>
                    {expandedFaq === index && (
                      <div style={{
                        padding: '0 20px 20px 20px',
                        color: '#4a5568',
                        fontSize: '0.95rem',
                        borderTop: '1px solid #e2e8f0',
                        paddingTop: '20px',
                        lineHeight: '1.6'
                      }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;