const express = require('express');
const router = express.Router();

const authControllers = require("../controllers/auth.controllers");

router.route('/login')
.get(authControllers.loginPage)
.post(authControllers.loginRequest)

router.route('/register')
.get(authControllers.registerPage)
.post(authControllers.registerRequest)

router.route('/logout')
.get(authControllers.logoutRequest)

module.exports = router;