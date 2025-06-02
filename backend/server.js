const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Start the server
const server = app.listen(PORT, HOST, () => {
    console.log('🚀 ===============================================');
    console.log('🌟 Cloud Cost Calculator API Server Started!');
    console.log('🚀 ===============================================');
    console.log(`📡 Server running on: http://${HOST}:${PORT}`);
    console.log(`🏥 Health Check: http://${HOST}:${PORT}/health`);
    console.log(`📊 API Docs: http://${HOST}:${PORT}/api/docs`);
    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('🚀 ===============================================');
    console.log('📋 Available Endpoints:');
    console.log('   GET  /health                     - Health check');
    console.log('   GET  /health/status              - System status');
    console.log('   GET  /api/pricing/aws            - AWS pricing');
    console.log('   GET  /api/pricing/azure          - Azure pricing');
    console.log('   GET  /api/pricing/gcp            - GCP pricing');
    console.log('   POST /api/calculator/compare     - Compare costs');
    console.log('   POST /api/calculator/estimate    - Cost estimate');
    console.log('🚀 ===============================================');
    console.log('💡 Ready to receive requests!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('🔥 Unhandled Promise Rejection:', err);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err);
    process.exit(1);
});

module.exports = server;