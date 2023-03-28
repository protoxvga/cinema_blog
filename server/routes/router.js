const express = require("express");

// Import routers for each part of the website
const authRoutes = require("./auth.routes");
const homeRoutes = require("./home.routes");
const postRoutes = require("./post.routes");
const adminRoutes = require("./admin.routes");

// Import middleware to check if user is admin
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

// Use the routers for each part of the website
router.use(authRoutes);
router.use(homeRoutes);
router.use(postRoutes);
router.use('/admin', checkAdmin, adminRoutes);

// Redirect to home page if user tries to access the root of the website
router.get('/', function (req, res) {
    res.redirect('/home');
});

// Redirect to home page if user tries to access a page that doesn't exist
router.get('*', function (req, res) {
    res.render('pages/errors/404', {
        user: req.session.user,
        originalUrl: req.originalUrl,
    })
});

module.exports = router;