const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Comment = require('./Comment.models')

const Post = new Schema({
    title: {
        type: String,
        required: true,
    },
    banner: {
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