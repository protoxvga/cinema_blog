const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home.controllers');

router.route('/home')
.get(homeControllers.homePage)

router.get('/about', function(req, res) {
    res.render('pages/about', {
        user: req.session.user,
        originalUrl: req.originalUrl,
    });
});

module.exports = router;