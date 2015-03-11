var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
    res.send('All the products!');
});

router.get('/kitchen', function (req, res) {
    res.send('Kitchen products!');
});

router.get('/bathroom', function (req, res) {
    res.send('Bathroom products!');
});