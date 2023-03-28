const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/admin.controllers");

// Get the admin page to create and edit posts (only for admins)
router.route('/admin-posts')
.get(adminControllers.adminPostsPage);

// Get the admin page to see and delete users (only for admins)
router.route('/admin-users')
.get(adminControllers.adminUsersPage);

// Get the page to create a new post and the route to handle the request (only for admins)
router.route('/create-post')
.get(adminControllers.createPostPage)
.post(adminControllers.createPostRequest);

// Get the page to edit a post and the route to handle the request (only for admins)
router.route('/edit-post/:id')
.get(adminControllers.editPostPage)
.put(adminControllers.editPostRequest);

// Handle the request to delete a post (only for admins)
router.route('/delete-post')
.delete(adminControllers.deletePostRequest);

// Handle the request to delete a user (only for admins)
router.route('/delete-user')
.delete(adminControllers.deleteUserRequest);

module.exports = router;