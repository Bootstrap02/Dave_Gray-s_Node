const express = require('express');
const router = express.Router();
const users = require ('../Controllers/users.js');

router.post('/', users.handleNewUser);

module.exports = router;