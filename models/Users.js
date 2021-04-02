const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is Required"]
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: [true, "Last Name is Required"]
    },
    username: {
        type: String,
        unique: [true, "Username Already Taken"],
        required: [true, "Username is Required"]
    },
    email: {
        type: String,
        unique: [true, "Email Already in Use"],
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    age: {
        type: Number,
        required: [true, "Age is Required"]
    },
    birthday: {
        type: Date,
        required: [true, "Birthday is Required"]
    },
    sex: {
        type: String,
        required: [true, "Sex is Required"]
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    friends: [{
        user_id: {
            type: String,
            required: false
        },

        friendversary: {
            type: Date,
            default: new Date(),
            required: false
        }
    }],
    posts: [{
        post_id: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    }]
});

module.exports = mongoose.model('User', users_schema);