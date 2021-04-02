const router = require('express').Router();
const Authorization = require('../authorization');
const Post = require('../models/Posts');
const User = require('../models/Users');

router.get('/', Authorization.validate, (request, response, next) => {
    Post.find({})
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => {
        response.send(result);
    }).catch(next);
});

router.get('/author/:UserID', Authorization.validate, async (request, response, next) => {
    const {UserID} = request.params;

    const Posts = await Post.find({author: UserID})
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => result)
    .catch(next);

    response.send(Posts);
});

router.get('/:PostID', Authorization.validate, (request, response, next) => {
    const {PostID} = request.params;

    Post.findById(PostID)
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => {
        response.send(result);    
    }).catch(next);
});

router.post('/create', Authorization.validate, async (request, response, next) => {
    const {author, message} = request.body;
    const PostID = await Post.create({ author, message }).then((result) => result._id).catch(next);
    
    const PostsByUser =  await User.findByIdAndUpdate(author, {$push: {posts: PostID}}, {new: true})
    .then((result) => true)
    .catch(next);

    response.send(PostsByUser);
});

router.patch('/update/:PostID', Authorization.validate, (request, response, next) => {
    response.send('Update Post Here');
});

router.delete('/delete/:PostID', Authorization.validate, (request, response, next) => {
    response.send('Delete Post Here');
});

module.exports = router;