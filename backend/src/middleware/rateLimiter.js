const rateLimit = require('express-rate-limit');

// General API rate limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: 15 * 60 // seconds
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Calculator API rate limiter (more restrictive)
const calculatorLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // limit each IP to 20 calculation requests per 5 minutes
    message: {
        error: 'Too many calculation requests',
        message: 'Calculator rate limit exceeded. Please wait before making more calculations.',
        retryAfter: 5 * 60
    }
});

// Pricing API rate limiter
const pricingLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // limit each IP to 30 pricing requests per minute
    message: {
        error: 'Too many pricing requests',
        message: 'Pricing API rate limit exceeded. Please wait before requesting more pricing data.'
    }
});

module.exports = {
    generalLimiter,
    calculatorLimiter,
    pricingLimiter
};