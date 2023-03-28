const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User Schema
const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Virtuals for user fullname
User.virtual('fullname').get(function() {
    return this.firstname + ' ' + this.lastname;
});

module.exports = mongoose.model('userData', User, 'userData');