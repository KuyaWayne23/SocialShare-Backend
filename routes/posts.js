const router = require('express').Router();
const Authorization = require('../authorization');
const PostController = require('../controllers/posts');

router.get('/', Authorization.validate, PostController.getAll);

router.get('/author/:UserID', Authorization.validate, PostController.getByAuthor);

router.get('/:PostID', Authorization.validate, PostController.getSpecific);

router.post('/create', Authorization.validate, PostController.createPost);

router.patch('/update/:PostID', Authorization.validate, PostController.updatePost);

router.delete('/delete/:PostID', Authorization.validate, PostController.deletePost);

module.exports = router;