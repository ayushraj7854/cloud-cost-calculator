import React from 'react';
import { CloudIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <CloudIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Cloud Cost Calculator
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Compare cloud costs across AWS, Azure, and Google Cloud Platform
                to make informed decisions for your infrastructure needs.
              </p>
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Built with ❤️ for the cloud community
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/calculator" className="text-sm text-gray-600 hover:text-gray-900">
                    Calculator
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-sm text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://aws.amazon.com/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    AWS Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="https://azure.microsoft.com/en-us/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Azure Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="https://cloud.google.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    GCP Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                © 2025 Cloud Cost Calculator. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;