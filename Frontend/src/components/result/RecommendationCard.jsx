import React from 'react';
import { 
  LightBulbIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const RecommendationCard = ({ pricingData, configuration }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBestProvider = () => {
    if (!pricingData || pricingData.length === 0) return null;
    return pricingData.reduce((min, provider) => 
      provider.totalCost < min.totalCost ? provider : min
    );
  };

  const getRecommendations = () => {
    const recommendations = [];
    const bestProvider = getBestProvider();
    
    if (!bestProvider) return recommendations;

    // Cost optimization recommendations
    const maxCost = Math.max(...pricingData.map(p => p.totalCost));
    const minCost = Math.min(...pricingData.map(p => p.totalCost));
    const savings = maxCost - minCost;
    
    if (savings > 50) {
      recommendations.push({
        type: 'cost',
        icon: CurrencyDollarIcon,
        title: 'Significant Cost Savings Available',
        description: `You could save ${formatCurrency(savings)} per month (${Math.round((savings/maxCost)*100)}%) by switching to ${bestProvider.provider}.`,
        priority: 'high',
        action: `Consider migrating to ${bestProvider.provider.toUpperCase()} for better cost efficiency.`,
      });
    }

    // Usage optimization
    if (configuration?.compute?.hours < 730) {
      const unusedHours = 730 - configuration.compute.hours;
      recommendations.push({
        type: 'usage',
        icon: ClockIcon,
        title: 'Optimize Instance Usage',
        description: `Your instance is unused for ${unusedHours} hours per month.`,
        priority: 'medium',
        action: 'Consider using reserved instances or auto-scaling to reduce costs.',
      });
    }

    // Instance size optimization
    if (configuration?.compute?.instanceType?.includes('micro') && configuration.compute.hours > 500) {
      recommendations.push({
        type: 'performance',
        icon: ChartBarIcon,
        title: 'Consider Larger Instance',
        description: 'For high-usage workloads, larger instances often provide better value.',
        priority: 'medium',
        action: 'Evaluate t3.small or t3.medium for better performance per dollar.',
      });
    }

    // Multi-cloud strategy
    if (pricingData.length > 1) {
      const serviceCosts = {};
      pricingData.forEach(provider => {
        provider.breakdown?.forEach(service => {
          if (!serviceCosts[service.service]) {
            serviceCosts[service.service] = [];
          }
          serviceCosts[service.service].push({
            provider: provider.provider,
            cost: service.cost,
          });
        });
      });

      const multiCloudSavings = Object.keys(serviceCosts).reduce((total, service) => {
        const costs = serviceCosts[service];
        if (costs.length > 1) {
          const min = Math.min(...costs.map(c => c.cost));
          const max = Math.max(...costs.map(c => c.cost));
          return total + (max - min);
        }
        return total;
      }, 0);

      if (multiCloudSavings > 20) {
        recommendations.push({
          type: 'strategy',
          icon: LightBulbIcon,
          title: 'Multi-Cloud Strategy',
          description: `You could save an additional ${formatCurrency(multiCloudSavings)} per month by using the best provider for each service.`,
          priority: 'low',
          action: 'Consider a multi-cloud approach for optimal cost efficiency.',
        });
      }
    }

    // Regional optimization
    recommendations.push({
      type: 'region',
      icon: ChartBarIcon,
      title: 'Regional Cost Variation',
      description: 'Costs can vary significantly between regions.',
      priority: 'low',
      action: 'Consider deploying in cost-effective regions if latency requirements allow.',
    });

    return recommendations;
  };

  const recommendations = getRecommendations();
  const bestProvider = getBestProvider();

  const priorityColors = {
    high: 'bg-red-50 border-red-200 text-red-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    low: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const priorityIcons = {
    high: '🔴',
    medium: '🟡',
    low: '🔵',
  };

  if (!bestProvider) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Cost Optimization Recommendations
        </h2>
        <p className="text-gray-500">Configure your services to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          Cost Optimization Recommendations
        </h2>
      </div>

      {/* Best Choice Highlight */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">🏆</span>
          <h3 className="text-lg font-medium text-green-900">
            Recommended Choice
          </h3>
        </div>
        <p className="text-green-800">
          <strong>{bestProvider.provider.toUpperCase()}</strong> offers the best value at{' '}
          <strong>{formatCurrency(bestProvider.totalCost)}/month</strong> for your configuration.
        </p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${priorityColors[rec.priority]}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                <span className="text-lg">{priorityIcons[rec.priority]}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <rec.icon className="h-5 w-5 mr-2" />
                  <h4 className="font-medium">{rec.title}</h4>
                </div>
                <p className="text-sm mb-2">{rec.description}</p>
                <p className="text-sm font-medium">{rec.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">💡 Additional Cost-Saving Tips</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            Use reserved instances for predictable workloads (up to 75% savings)
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            Implement auto-scaling to match demand and reduce idle costs
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            Consider spot instances for non-critical workloads (up to 90% savings)
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            Use lifecycle policies for storage to automatically move old data to cheaper tiers
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            Monitor and optimize data transfer costs between services and regions
          </li>
        </ul>
      </div>

      {/* Action Items */}
      <div className="mt-6 p-4 border-2 border-dashed border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-3">📋 Next Steps</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">
              Research {bestProvider.provider.toUpperCase()} migration process
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">
              Calculate migration costs and timeline
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">
              Set up cost monitoring and alerts
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">
              Review and optimize usage patterns monthly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;