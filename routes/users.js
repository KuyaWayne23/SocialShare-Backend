const router = require('express').Router();
const UserController = require('../controllers/user');
const TokenChecker = require('../authorization');

router.post('/getUser', TokenChecker.validate, UserController.getUser);

module.exports = router;