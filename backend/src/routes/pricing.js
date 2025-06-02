const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

// Get AWS pricing data
router.get('/aws', pricingController.getAWSPricing);

// Get Azure pricing data
router.get('/azure', pricingController.getAzurePricing);

// Get Google Cloud pricing data
router.get('/gcp', pricingController.getGCPPricing);

// Get all providers pricing comparison
router.get('/compare', pricingController.comparePricing);

// Get available regions
router.get('/regions', pricingController.getRegions);

// Get available services
router.get('/services', pricingController.getServices);

module.exports = router;