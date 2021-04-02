const router = require('express').Router();
const TokenChecker = require('../authorization');
const UserController = require('../controllers/user');
const IndexController = require('../controllers/index');

router.get('/clock', IndexController.clock);
  
router.get('/', (request, response, next) => {
    response.render('index', {title: `SocialShare`});
});
  
router.post('/login', UserController.login);
  
router.post('/signup', UserController.register);

module.exports = router;