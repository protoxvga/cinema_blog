const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/admin.controllers");

router.route('/admin-posts')
.get(adminControllers.adminPostsPage)

router.route('/create-post')
.post(adminControllers.createPostRequest);

router.route('/edit-post/:id')
.get(adminControllers.editPostPage)
.post(adminControllers.editPostRequest);

router.route('/delete-post')
.post(adminControllers.deletePostRequest);

module.exports = router;