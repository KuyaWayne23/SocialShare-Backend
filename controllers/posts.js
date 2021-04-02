const Post = require('../models/Posts');
const User = require('../models/Users');

module.exports.getAll = (request, response, next) => {
    Post.find({})
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => {
        response.send(result);
    }).catch(next);
};

module.exports.getByAuthor = async (request, response, next) => {
    const {UserID} = request.params;

    const Posts = await Post.find({author: UserID})
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => result)
    .catch(next);

    response.send(Posts);
};

module.exports.getSpecific = (request, response, next) => {
    const {PostID} = request.params;

    Post.findById(PostID)
    .populate('author', ['firstname', 'middlename', 'lastname'])
    .exec()
    .then((result) => {
        response.send(result);    
    }).catch(next);
};

module.exports.createPost = async (request, response, next) => {
    const {author, message} = request.body;
    const PostID = await Post.create({ author, message }).then((result) => result._id).catch(next);
    
    const PostsByUser =  await User.findByIdAndUpdate(author, {$push: {posts: PostID}}, {new: true})
    .then((result) => true)
    .catch(next);

    response.send(PostsByUser);
};

module.exports.updatePost = async (request, response, next) => {
    const {PostID} = await request.params;
    const {message} = await request.body;

    const updated = await Post.findByIdAndUpdate(PostID, {
        $set: {
            message,
            date_posted: new Date()
        }
    })
    .then(result => true)
    .catch(error => false)

    await response.send(updated)
};

module.exports.deletePost = (request, response, next) => {
    const {PostID} = request.params;
    
    Post.findByIdAndDelete(PostID)
    .then((result) => {
        response.send(true);
    }).catch(next)
};