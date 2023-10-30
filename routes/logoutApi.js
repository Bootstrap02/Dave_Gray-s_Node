const express = require('express');
const router = express.Router();
const logoutController = require('../Controllers/logout');

// Use POST method for logout
router.post('/', logoutController.handleLogOut);

module.exports = router;
