const mongoose = require('mongoose');

// Create Model
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
        default: new Date(),
    }
});

module.exports = mongoose.model('posts', Post, 'posts');