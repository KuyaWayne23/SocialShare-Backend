const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: [true, 'Post Message is Required']
    },
    date_posted: {
        type: Date,
        default: new Date()
    },
    comments: [{
        comment_id: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }]
});

module.exports = mongoose.model('Post', postSchema);