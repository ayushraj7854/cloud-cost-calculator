import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ComparisonChart = ({ pricingData, chartType = 'bar' }) => {
  if (!pricingData || pricingData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <p>No data available for chart visualization</p>
        </div>
      </div>
    );
  }

  const providerNames = {
    aws: 'AWS',
    azure: 'Azure',
    gcp: 'GCP',
  };

  const providerColors = {
    aws: '#FF9900',
    azure: '#0078D4',
    gcp: '#4285F4',
  };

  // Bar Chart Data
  const barChartData = {
    labels: pricingData.map(provider => providerNames[provider.provider]),
    datasets: [
      {
        label: 'Monthly Cost (USD)',
        data: pricingData.map(provider => provider.totalCost),
        backgroundColor: pricingData.map(provider => providerColors[provider.provider] + '80'),
        borderColor: pricingData.map(provider => providerColors[provider.provider]),
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Cost Comparison',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toFixed(2)} per month`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          },
        },
        title: {
          display: true,
          text: 'Cost (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cloud Providers',
        },
      },
    },
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: pricingData.map(provider => providerNames[provider.provider]),
    datasets: [
      {
        data: pricingData.map(provider => provider.totalCost),
        backgroundColor: pricingData.map(provider => providerColors[provider.provider] + '80'),
        borderColor: pricingData.map(provider => providerColors[provider.provider]),
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Cost Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Service Breakdown Chart
  const getServiceBreakdownData = () => {
    if (!pricingData[0]?.breakdown) return null;

    const services = [...new Set(pricingData.flatMap(p => p.breakdown.map(b => b.service)))];
    
    const datasets = pricingData.map(provider => ({
      label: providerNames[provider.provider],
      data: services.map(service => {
        const serviceData = provider.breakdown.find(b => b.service === service);
        return serviceData ? serviceData.cost : 0;
      }),
      backgroundColor: providerColors[provider.provider] + '80',
      borderColor: providerColors[provider.provider],
      borderWidth: 2,
      borderRadius: 4,
    }));

    return {
      labels: services.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      datasets,
    };
  };

  const serviceBreakdownData = getServiceBreakdownData();

  const serviceBreakdownOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Service-wise Cost Breakdown',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          },
        },
        title: {
          display: true,
          text: 'Cost (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Services',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => {}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'doughnut'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pie Chart
          </button>
          <button
            onClick={() => {}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === 'breakdown'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Service Breakdown
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-96">
          {chartType === 'bar' && (
            <Bar data={barChartData} options={barChartOptions} />
          )}
          {chartType === 'doughnut' && (
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          )}
          {chartType === 'breakdown' && serviceBreakdownData && (
            <Bar data={serviceBreakdownData} options={serviceBreakdownOptions} />
          )}
        </div>
      </div>

      {/* Chart Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Lowest Cost</h4>
            <p className="text-2xl font-bold text-green-600">
              ${Math.min(...pricingData.map(p => p.totalCost)).toFixed(2)}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {providerNames[pricingData.find(p => p.totalCost === Math.min(...pricingData.map(pr => pr.totalCost))).provider]}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Highest Cost</h4>
            <p className="text-2xl font-bold text-red-600">
              ${Math.max(...pricingData.map(p => p.totalCost)).toFixed(2)}
            </p>
            <p className="text-sm text-red-700 mt-1">
              {providerNames[pricingData.find(p => p.totalCost === Math.max(...pricingData.map(pr => pr.totalCost))).provider]}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Potential Savings</h4>
            <p className="text-2xl font-bold text-blue-600">
              ${(Math.max(...pricingData.map(p => p.totalCost)) - Math.min(...pricingData.map(p => p.totalCost))).toFixed(2)}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Per month by choosing the lowest cost option
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;