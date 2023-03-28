const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post.controllers');
const checkAdmin = require('../middlewares/checkAdmin');

router.route('/post/:id')
.get(postControllers.postPage);

router.route('/post/:id/publish-comment')
.post(postControllers.publishComment);

router.route('/post/:id/delete-comment')
.post(checkAdmin, postControllers.deleteComment);

module.exports = router;