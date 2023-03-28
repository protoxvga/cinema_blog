const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post.controllers');

const checkAdmin = require('../middlewares/checkAdmin');
const checkUser = require('../middlewares/checkUser');

// Get the page for a specific post
router.route('/post/:id')
.get(postControllers.postPage);

// Post route to create a new comment (only for logged in users)
router.route('/post/:id/publish-comment')
.post(checkUser, postControllers.publishComment);

// Delete route to delete a comment (only for admins)
router.route('/post/:id/delete-comment')
.delete(checkAdmin, postControllers.deleteComment);

module.exports = router;