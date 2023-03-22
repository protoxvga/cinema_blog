const mongoose = require('mongoose');
const Comment = require('./Comment.models');

const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    category: {
        type: String,
        enum: ['cinema', 'tvShow'],
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    comments: [Comment.schema],
});

module.exports = mongoose.model('posts', Post, 'posts');