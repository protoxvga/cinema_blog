const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/admin.controllers");

router.route('/admin-posts')
.get(adminControllers.adminPostsPage);

router.route('/admin-users')
.get(adminControllers.adminUsersPage);

router.route('/create-post')
.get(adminControllers.createPostPage)
.post(adminControllers.createPostRequest);

router.route('/edit-post/:id')
.get(adminControllers.editPostPage)
.put(adminControllers.editPostRequest);

router.route('/delete-post')
.delete(adminControllers.deletePostRequest);

router.route('/delete-user')
.delete(adminControllers.deleteUserRequest);

module.exports = router;