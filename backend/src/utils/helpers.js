const crypto = require('crypto');

const helpers = {
    // Generate unique ID
    generateId: function() {
        return crypto.randomBytes(16).toString('hex');
    },

    // Generate UUID v4
    generateUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // Hash password with salt
    hashPassword: function(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { hash: hash, salt: salt };
    },

    // Verify password
    verifyPassword: function(password, hash, salt) {
        const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hash === verifyHash;
    },

    // Format currency
    formatCurrency: function(amount, currency, locale) {
        currency = currency || 'USD';
        locale = locale || 'en-US';

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        } catch (error) {
            return '$' + amount.toFixed(2);
        }
    },

    // Round to specific decimal places
    roundTo: function(num, decimals) {
        decimals = decimals || 2;
        const factor = Math.pow(10, decimals);
        return Math.round((num + Number.EPSILON) * factor) / factor;
    },

    // Round to 2 decimal places
    roundTo2Decimals: function(num) {
        return this.roundTo(num, 2);
    },

    // Validate email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate URL
    isValidUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    },

    // Sanitize input
    sanitizeInput: function(input) {
        if (typeof input !== 'string') return input;

        return input
            .replace(/[<>"']/g, '')
            .replace(/[\x00-\x1f\x7f]/g, '')
            .trim();
    },

    // Escape HTML
    escapeHtml: function(text) {
        if (typeof text !== 'string') return text;

        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function(m) {
            return map[m];
        });
    },

    // Calculate percentage
    calculatePercentage: function(value, total) {
        if (total === 0) return 0;
        return (value / total) * 100;
    },

    // Get cost savings
    getCostSavings: function(originalCost, newCost) {
        const savings = originalCost - newCost;
        const percentage = this.calculatePercentage(savings, originalCost);

        return {
            amount: this.roundTo2Decimals(savings),
            percentage: this.roundTo2Decimals(percentage),
            isPositive: savings > 0
        };
    },

    // Validate configuration object
    validateCalculationConfig: function(config) {
        const errors = [];

        const required = ['region', 'instanceSize', 'usageHours'];
        const missing = [];

        for (let i = 0; i < required.length; i++) {
            if (!config[required[i]]) {
                missing.push(required[i]);
            }
        }

        if (missing.length > 0) {
            errors.push('Missing required fields: ' + missing.join(', '));
        }

        if (config.usageHours !== undefined) {
            if (isNaN(config.usageHours) || config.usageHours < 0 || config.usageHours > 744) {
                errors.push('Usage hours must be between 0 and 744');
            }
        }

        if (config.storageGB !== undefined) {
            if (isNaN(config.storageGB) || config.storageGB < 0) {
                errors.push('Storage GB must be a positive number');
            }
        }

        if (config.dataTransferGB !== undefined) {
            if (isNaN(config.dataTransferGB) || config.dataTransferGB < 0) {
                errors.push('Data transfer GB must be a positive number');
            }
        }

        if (config.databaseSizeGB !== undefined) {
            if (isNaN(config.databaseSizeGB) || config.databaseSizeGB < 0) {
                errors.push('Database size GB must be a positive number');
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join('; '));
        }

        return true;
    },

    // Get region display name
    getRegionDisplayName: function(provider, region) {
        const regionNames = {
            aws: {
                'us-east-1': 'US East (N. Virginia)',
                'us-east-2': 'US East (Ohio)',
                'us-west-1': 'US West (N. California)',
                'us-west-2': 'US West (Oregon)',
                'eu-west-1': 'Europe (Ireland)',
                'eu-west-2': 'Europe (London)',
                'eu-central-1': 'Europe (Frankfurt)',
                'ap-south-1': 'Asia Pacific (Mumbai)',
                'ap-southeast-1': 'Asia Pacific (Singapore)',
                'ap-southeast-2': 'Asia Pacific (Sydney)',
                'ap-northeast-1': 'Asia Pacific (Tokyo)'
            },
            azure: {
                'eastus': 'East US',
                'eastus2': 'East US 2',
                'westus': 'West US',
                'westus2': 'West US 2',
                'westus3': 'West US 3',
                'northeurope': 'North Europe',
                'westeurope': 'West Europe',
                'uksouth': 'UK South',
                'ukwest': 'UK West',
                'southeastasia': 'Southeast Asia',
                'eastasia': 'East Asia',
                'centralindia': 'Central India',
                'southindia': 'South India'
            },
            gcp: {
                'us-central1': 'US Central (Iowa)',
                'us-east1': 'US East (South Carolina)',
                'us-east4': 'US East (N. Virginia)',
                'us-west1': 'US West (Oregon)',
                'us-west2': 'US West (Los Angeles)',
                'us-west3': 'US West (Salt Lake City)',
                'us-west4': 'US West (Las Vegas)',
                'europe-west1': 'Europe West (Belgium)',
                'europe-west2': 'Europe West (London)',
                'europe-west3': 'Europe West (Frankfurt)',
                'europe-west4': 'Europe West (Netherlands)',
                'europe-west6': 'Europe West (Zurich)',
                'asia-east1': 'Asia East (Taiwan)',
                'asia-east2': 'Asia East (Hong Kong)',
                'asia-northeast1': 'Asia Northeast (Tokyo)',
                'asia-south1': 'Asia South (Mumbai)',
                'asia-southeast1': 'Asia Southeast (Singapore)'
            }
        };

        return regionNames[provider] && regionNames[provider][region] || region;
    },

    // Parse instance size
    parseInstanceSize: function(size) {
        const sizeMap = {
            'small': { cpu: 1, memory: 1, description: 'Small (1 vCPU, 1GB RAM)' },
            'medium': { cpu: 2, memory: 4, description: 'Medium (2 vCPU, 4GB RAM)' },
            'large': { cpu: 4, memory: 8, description: 'Large (4 vCPU, 8GB RAM)' },
            'xlarge': { cpu: 8, memory: 16, description: 'X-Large (8 vCPU, 16GB RAM)' }
        };

        return sizeMap[size] || sizeMap['medium'];
    },

    // Deep clone object
    deepClone: function(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) {
            const result = [];
            for (let i = 0; i < obj.length; i++) {
                result[i] = this.deepClone(obj[i]);
            }
            return result;
        }
        if (typeof obj === 'object') {
            const copy = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copy[key] = this.deepClone(obj[key]);
                }
            }
            return copy;
        }
    },

    // Merge objects deeply
    deepMerge: function(target, source) {
        const result = this.deepClone(target);

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }

        return result;
    },

    // Format bytes to human readable
    formatBytes: function(bytes, decimals) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    // Get timestamp
    getTimestamp: function() {
        return new Date().toISOString();
    },

    // Sleep function
    sleep: function(ms) {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        });
    },

    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }
};

module.exports = helpers;