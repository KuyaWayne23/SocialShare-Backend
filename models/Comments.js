const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
        required: [true, 'Comment Message is Required']
    },
    date_commented: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Comment', commentSchema);