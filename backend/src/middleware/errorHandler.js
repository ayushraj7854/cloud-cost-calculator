// ============================================
// Fixed File: backend/src/middleware/errorHandler.js
// ============================================
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error response
    let error = {
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.status = 400;
        error.message = 'Validation Error';
        error.details = Object.values(err.errors).map(e => e.message);
    }

    if (err.name === 'CastError') {
        error.status = 400;
        error.message = 'Invalid ID format';
    }

    if (err.code === 11000) {
        error.status = 400;
        error.message = 'Duplicate field value';
    }

    if (err.name === 'JsonWebTokenError') {
        error.status = 401;
        error.message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        error.status = 401;
        error.message = 'Token expired';
    }

    // Don't show stack trace in production
    if (process.env.NODE_ENV === 'development') {
        error.stack = err.stack;
    }

    res.status(error.status).json({
        success: false,
        error: error
    });
};

// 404 handler
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            status: 404,
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};