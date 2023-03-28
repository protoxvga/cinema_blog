const express = require('express');
const router = express.Router();

const authControllers = require("../controllers/auth.controllers");

// Get the login page and handle login requests
router.route('/login')
.get(authControllers.loginPage)
.post(authControllers.loginRequest)

// Get the register page and handle register requests
router.route('/register')
.get(authControllers.registerPage)
.post(authControllers.registerRequest)

// Handle logout requests
router.route('/logout')
.get(authControllers.logoutRequest)

module.exports = router;