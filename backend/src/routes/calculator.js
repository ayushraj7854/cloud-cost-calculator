const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

// Main calculation endpoint
router.post('/compare', calculatorController.calculateCosts);

// Get available services
router.get('/services', calculatorController.getAvailableServices);

// Get available regions
router.get('/regions', calculatorController.getAvailableRegions);

// Get instance types
router.get('/instances', calculatorController.getInstanceTypes);

// Export calculation results
router.post('/export', calculatorController.exportResults);

module.exports = router;