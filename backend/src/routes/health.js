const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// Basic health check
router.get('/', healthController.healthCheck);

// Detailed system status
router.get('/status', healthController.systemStatus);

// Readiness check
router.get('/ready', healthController.readinessCheck);

module.exports = router;