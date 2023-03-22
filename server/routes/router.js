const express = require("express");

const authRoutes = require("./auth.routes");
const homeRoutes = require("./home.routes");
const postRoutes = require("./post.routes");
const adminRoutes = require("./admin.routes");

const checkUser = require('../middlewares/checkUser');
const checkAdmin = require('../middlewares/checkAdmin');

const router = express.Router();

router.use(authRoutes);
router.use(checkUser, homeRoutes);
router.use(checkUser, postRoutes);
router.use('/admin', checkAdmin, adminRoutes);

router.get('/', function (req, res) {
    res.redirect('/home');
});

router.get('*', function (req, res) {
    res.render('pages/errors/404', {
        user: req.session.user,
        originalUrl: req.originalUrl,
    })
});

module.exports = router;