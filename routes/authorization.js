const express = require('express');
const router = express.Router();
const auth = require ('../Controllers/auth.js');

router.post('/', auth.handleLogIn);

module.exports = router;