const express = require('express');
const router = express.Router();

const adminControllers = require("../controllers/admin.controllers");

router.route('/create-post')
.get(adminControllers.createPostPage)
.post(adminControllers.createPostRequest)

module.exports = router;