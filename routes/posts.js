const router = require('express').Router();
const Authorization = require('../authorization');
const Post = require('../models/Posts');

router.get('/', Authorization.validate, (request, response, next) => {
    response.send(`Get all posts here`);
});

router.get('/author/:UserID', Authorization.validate, (request, response, next) => {
    response.send(`Get all posts from user`);
});

router.get('/:PostID', Authorization.validate, (request, response, next) => {
    response.send(`Get One Post`);
});

router.post('/create', Authorization.validate, (request, response, next) => {
    const {author, message} = request.body;

    Post.create({ author, message })
    .then((result) => {
        response.send(result);
    })
    .catch(next);
});

router.patch('/update/:PostID', Authorization.validate, (request, response, next) => {
    response.send('Update Post Here');
});

router.delete('/delete/:PostID', Authorization.validate, (request, response, next) => {
    response.send('Delete Post Here');
});

module.exports = router;