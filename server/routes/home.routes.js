const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home.controllers');

router.route('/home')
.get(homeControllers.homePage)

router.route('/cinema')
.get(homeControllers.cinemaPage)

router.route('/tv-shows')
.get(homeControllers.tvShowsPage)

module.exports = router;