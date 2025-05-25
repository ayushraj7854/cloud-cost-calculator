import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ArrowRightIcon,
  CheckIcon,
  StarIcon 
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: CloudIcon,
      title: 'Multi-Cloud Comparison',
      description: 'Compare costs across AWS, Azure, and Google Cloud Platform in real-time.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Optimization',
      description: 'Get personalized recommendations to reduce your cloud spending.',
    },
    {
      icon: ChartBarIcon,
      title: 'Visual Analytics',
      description: 'Interactive charts and detailed breakdowns of your cloud costs.',
    },
  ];

  const providers = [
    {
      name: 'Amazon Web Services',
      short: 'AWS',
      logo: '🟠',
      description: 'Leading cloud platform with comprehensive services',
    },
    {
      name: 'Microsoft Azure',
      short: 'Azure',  
      logo: '🔵',
      description: 'Enterprise-focused cloud with strong integration',
    },
    {
      name: 'Google Cloud Platform',
      short: 'GCP',
      logo: '🟢',
      description: 'Data analytics and machine learning focused',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'DevOps Engineer',
      company: 'TechCorp',
      content: 'This tool saved us $2,400/month by identifying the most cost-effective cloud provider for our workload.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      content: 'Perfect for comparing costs before making cloud architecture decisions. Very accurate pricing.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Cloud Architect',
      company: 'Enterprise Inc',
      content: 'The detailed breakdowns help me justify cloud spending to management. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CloudIcon className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Compare Cloud Costs
              <span className="block text-blue-600">Like a Pro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make informed decisions about your cloud infrastructure with real-time cost 
              comparisons across AWS, Azure, and Google Cloud Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/calculator"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Start Calculating
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Calculator?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get accurate, up-to-date pricing information and make data-driven 
              decisions for your cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Providers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare All Major Cloud Providers
            </h2>
            <p className="text-lg text-gray-600">
              Get accurate pricing data from the world's leading cloud platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {providers.map((provider, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-shadow duration-200">
                <div className="text-6xl mb-4">{provider.logo}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {provider.name}
                </h3>
                <p className="text-gray-600 mb-4">{provider.description}</p>
                <div className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-green-600 font-medium">
                    Real-time pricing
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to compare cloud costs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Configure Services
              </h3>
              <p className="text-gray-600">
                Select the cloud services you need and specify your requirements
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Compare Costs
              </h3>
              <p className="text-gray-600">
                View side-by-side cost comparisons across all major cloud providers
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Recommendations
              </h3>
              <p className="text-gray-600">
                Receive personalized recommendations to optimize your costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Cloud Professionals
            </h2>
            <p className="text-lg text-gray-600">
              See what our users say about the Cloud Cost Calculator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Cloud Costs?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start comparing cloud costs now and discover potential savings for your organization.
          </p>
          <Link
            to="/calculator"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Start Your Free Comparison
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;