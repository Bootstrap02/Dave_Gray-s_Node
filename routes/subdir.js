const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // Corrected the path here
});

router.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'error.html'));
});

module.exports = router;
