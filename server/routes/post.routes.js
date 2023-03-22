const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post.controllers');

router.route('/post/:id')
.get(postControllers.postPage)

router.route('/post/:id/publish-comment')
.post(postControllers.publishComment)

module.exports = router;