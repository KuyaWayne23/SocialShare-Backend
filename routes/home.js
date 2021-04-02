const router = require('express').Router();
const TokenChecker = require('../authorization');

router.get('/', TokenChecker.validate, (request, response, next) => {
    response.send('Welcome to the Home Page');
});

module.exports = router;