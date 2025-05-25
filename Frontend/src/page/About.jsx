import React from 'react';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CpuChipIcon 
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Real-Time Pricing',
      description: 'Get up-to-date pricing information directly from cloud provider APIs.',
    },
    {
      icon: CpuChipIcon,
      title: 'Comprehensive Coverage',
      description: 'Compare compute, storage, database, and networking services across all major providers.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Accurate Calculations',
      description: 'Our algorithms mirror the exact pricing models used by cloud providers.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Region Support',
      description: 'Compare costs across different geographic regions to optimize for location.',
    },
  ];

  const team = [
    {
      name: 'Ayush Raj',
      role: 'Full Stack Developer',
      description: 'Final year computer science student passionate about cloud technologies.',
      avatar: '👨‍💻',
    },
  ];

  const stats = [
    { label: 'Cloud Providers', value: '3' },
    { label: 'Service Types', value: '4+' },
    { label: 'Regions Supported', value: '20+' },
    { label: 'Cost Calculations', value: '1000+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Cloud Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive tool designed to help businesses and developers make 
              informed decisions about their cloud infrastructure costs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Cloud computing has revolutionized how we build and deploy applications, 
                but choosing the right provider and configuration can be overwhelming. 
                Our mission is to simplify this decision-making process by providing 
                transparent, accurate, and easy-to-understand cost comparisons.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Whether you're a startup looking to optimize costs or an enterprise 
                planning a multi-cloud strategy, our calculator provides the insights 
                you need to make informed decisions.
              </p>
              <div className="flex items-center">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Built by developers, for developers
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why This Matters</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">•</span>
                  Cloud costs can vary by up to 300% between providers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">•</span>
                  Wrong choices can lead to significant budget overruns
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">•</span>
                  Optimization can save companies thousands per month
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">•</span>
                  Transparency helps in budget planning and forecasting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We focus on accuracy, transparency, and ease of use to provide 
              the best cloud cost comparison experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              By the Numbers
            </h2>
            <p className="text-lg text-gray-600">
              Our platform's reach and capabilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Developer
            </h2>
            <p className="text-lg text-gray-600">
              This project was created as a final year computer science project
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              This application showcases modern web development practices and technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <h4 className="font-semibold text-gray-900">React</h4>
              <p className="text-sm text-gray-600">Frontend Framework</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🟢</div>
              <h4 className="font-semibold text-gray-900">Node.js</h4>
              <p className="text-sm text-gray-600">Backend Runtime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🐘</div>
              <h4 className="font-semibold text-gray-900">PostgreSQL</h4>
              <p className="text-sm text-gray-600">Database</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-900">Tailwind CSS</h4>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions or Feedback?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I'd love to hear from you! Whether you have questions, suggestions, 
            or just want to chat about cloud computing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              📧 Send Email
            </a>
            <a
              href="https://github.com/ayushraj7854/cloud-cost-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors duration-200"
            >
              🔗 View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;