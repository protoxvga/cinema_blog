const mongoose = require('mongoose');

// Create Model
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('comments', Comment, 'comments');