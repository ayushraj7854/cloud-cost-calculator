import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState({});

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpenIcon,
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: CodeBracketIcon,
    },
    {
      id: 'user-guide',
      title: 'User Guide',
      icon: DocumentTextIcon,
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: QuestionMarkCircleIcon,
    },
  ];

  const faqs = [
    {
      question: 'How accurate are the pricing calculations?',
      answer: 'Our pricing data is updated regularly from official cloud provider APIs and pricing pages. However, actual costs may vary based on specific configurations, discounts, and regional variations. We recommend using our calculator as a starting point and consulting with cloud providers for final pricing.',
    },
    {
      question: 'Which cloud services are supported?',
      answer: 'Currently, we support compute instances (EC2, VMs, Compute Engine), storage (S3, Blob Storage, Cloud Storage), databases (RDS, SQL Database, Cloud SQL), and basic networking services across AWS, Azure, and Google Cloud Platform.',
    },
    {
      question: 'Can I save and share my configurations?',
      answer: 'Yes! You can save your configurations locally in your browser for future reference. Sharing functionality allows you to generate links that others can use to view your cost comparison results.',
    },
    {
      question: 'How often is pricing data updated?',
      answer: 'We update our pricing data weekly from official sources. Some real-time pricing may be fetched directly from provider APIs when available. If you notice outdated pricing, please contact us.',
    },
    {
      question: 'Is this tool free to use?',
      answer: 'Yes, the Cloud Cost Calculator is completely free to use. This is an open-source project created for educational and community purposes.',
    },
    {
      question: 'Can I contribute to the project?',
      answer: 'Absolutely! This is an open-source project. You can contribute by reporting bugs, suggesting features, or submitting pull requests on our GitHub repository.',
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderGettingStarted = () => (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Start Guide</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Select the cloud services you want to compare</li>
          <li>Configure your requirements (CPU, memory, storage, etc.)</li>
          <li>Choose your preferred region</li>
          <li>View the cost comparison results</li>
          <li>Export or share your results</li>
        </ol>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Types</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🖥️ Compute Instances</h4>
          <p className="text-gray-600 text-sm">Virtual machines with configurable CPU, memory, and storage options.</p>
          <ul className="text-sm text-gray-500 mt-2 space-y-1">
            <li>• AWS EC2 instances</li>
            <li>• Azure Virtual Machines</li>
            <li>• Google Compute Engine</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">💾 Storage</h4>
          <p className="text-gray-600 text-sm">Object storage, block storage, and file systems.</p>
          <ul className="text-sm text-gray-500 mt-2 space-y-1">
            <li>• AWS S3, EBS</li>
            <li>• Azure Blob Storage, Disk Storage</li>
            <li>• Google Cloud Storage, Persistent Disk</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🗄️ Databases</h4>
          <p className="text-gray-600 text-sm">Managed database services with various engines.</p>
          <ul className="text-sm text-gray-500 mt-2 space-y-1">
            <li>• AWS RDS</li>
            <li>• Azure SQL Database</li>
            <li>• Google Cloud SQL</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🌐 Networking</h4>
          <p className="text-gray-600 text-sm">Load balancers, data transfer, and CDN services.</p>
          <ul className="text-sm text-gray-500 mt-2 space-y-1">
            <li>• Load Balancing</li>
            <li>• Data Transfer</li>
            <li>• Content Delivery</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Tips for Accurate Calculations</h3>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <ul className="space-y-2 text-yellow-800">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Use realistic usage hours (consider actual uptime, not 24/7 unless necessary)
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Factor in data transfer costs between services and regions
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Consider reserved instances for long-term workloads
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Account for backup storage and disaster recovery costs
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            Include monitoring and logging services in your estimates
          </li>
        </ul>
      </div>
    </div>
  );

  const renderAPIReference = () => (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">API Reference</h2>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <p className="text-gray-700">
          Our calculator uses the following APIs to fetch real-time pricing data:
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing Calculation Endpoint</h3>
      
      <div className="bg-black text-green-400 rounded-lg p-4 mb-6 overflow-x-auto">
        <code>
          POST /api/calculate-pricing<br/>
          Content-Type: application/json
        </code>
      </div>

      <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Body</h4>
      <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm text-gray-800">{`{
  "services": ["compute", "storage"],
  "configuration": {
    "region": "us-east-1",
    "compute": {
      "instanceType": "t3.medium",
      "hours": 730,
      "storage": 20
    },
    "storage": {
      "type": "standard",
      "size": 100,
      "requests": 10000
    }
  }
}`}</pre>
      </div>

      <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
      <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-x-auto">
        <pre className="text-sm text-gray-800">{`{
  "success": true,
  "data": [
    {
      "provider": "aws",
      "totalCost": 45.67,
      "breakdown": [
        {
          "service": "compute",
          "cost": 30.34,
          "details": "t3.medium instance"
        },
        {
          "service": "storage",
          "cost": 15.33,
          "details": "100GB standard storage"
        }
      ]
    }
  ],
  "timestamp": "2025-01-01T00:00:00Z"
}`}</pre>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling</h3>
      
      <div className="space-y-4">
        <div className="border border-red-200 rounded-lg p-4">
          <h5 className="font-semibold text-red-900 mb-2">400 Bad Request</h5>
          <p className="text-red-700 text-sm">Invalid configuration or missing required fields</p>
        </div>
        
        <div className="border border-red-200 rounded-lg p-4">
          <h5 className="font-semibold text-red-900 mb-2">500 Internal Server Error</h5>
          <p className="text-red-700 text-sm">Server error or pricing API unavailable</p>
        </div>
      </div>
    </div>
  );

  const renderUserGuide = () => (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Guide</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Tutorial</h3>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Step 1: Service Selection</h4>
          <p className="text-gray-600 mb-4">
            Choose which cloud services you want to include in your cost comparison. 
            You can select multiple services to get a comprehensive cost estimate.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Start with just Compute if you're new to cloud cost estimation.
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Configuration</h4>
          <p className="text-gray-600 mb-4">
            Configure each selected service according to your requirements:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li>Instance types and sizes for compute</li>
            <li>Storage capacity and performance tiers</li>
            <li>Database engine and instance classes</li>
            <li>Expected data transfer volumes</li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Important:</strong> Be realistic with your usage estimates for accurate results.
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Step 3: View Results</h4>
          <p className="text-gray-600 mb-4">
            Once configured, you'll see cost comparisons across different providers in multiple formats:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Pricing Table:</strong> Side-by-side cost comparison</li>
            <li><strong>Charts:</strong> Visual representation with bar and pie charts</li>
            <li><strong>Breakdown:</strong> Detailed cost analysis per service</li>
            <li><strong>Recommendations:</strong> Optimization suggestions</li>
            <li><strong>Export:</strong> Download results in various formats</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Advanced Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">💾 Save Configurations</h4>
          <p className="text-gray-600 text-sm">Save your settings for future comparisons or scenario planning.</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">📊 Export Results</h4>
          <p className="text-gray-600 text-sm">Download your results as CSV, JSON, or text reports.</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">🔗 Share Links</h4>
          <p className="text-gray-600 text-sm">Generate shareable links to discuss results with your team.</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">💡 Smart Recommendations</h4>
          <p className="text-gray-600 text-sm">Get AI-powered suggestions for cost optimization.</p>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {expandedFAQ[index] ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedFAQ[index] && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Still Have Questions?</h3>
        <p className="text-blue-800 mb-4">
          Can't find what you're looking for? We're here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            📧 Contact Support
          </a>
          <a
            href="https://github.com/yourusername/cloud-cost-calculator/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors text-sm"
          >
            🐛 Report an Issue
          </a>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return renderGettingStarted();
      case 'api-reference':
        return renderAPIReference();
      case 'user-guide':
        return renderUserGuide();
      case 'faq':
        return renderFAQ();
      default:
        return renderGettingStarted();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Documentation
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about using the Cloud Cost Calculator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <section.icon className="h-5 w-5 mr-3" />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;