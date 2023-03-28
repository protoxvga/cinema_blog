const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home.controllers');

// Get the home page
router.route('/home')
.get(homeControllers.homePage)

// Get the page for cinema
router.route('/cinema')
.get(homeControllers.cinemaPage)

// Get the page for tv shows
router.route('/tv-shows')
.get(homeControllers.tvShowsPage)

module.exports = router;