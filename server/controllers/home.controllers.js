const Post = require("../models/Post.models");

// Controller to get the home page (with latest posts)
exports.homePage = async (req, res) => {
    // Get all the posts and sort them by creation date
    const posts = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');

    // Get the latest 6 posts
    const latestPosts = posts
    .slice(0, 6);

    // Get the latest 3 posts for each category
    const cinemaPosts = posts
    .filter((post) => post.category === "cinema")
    .slice(0, 3);

    const tvShowPosts = posts
    .filter((post) => post.category === "tvShow")
    .slice(0, 3);

    // Render the home page with the posts and the user session
    return res.render('pages/index', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        latestPosts: latestPosts,
        cinemaPosts: cinemaPosts,
        tvShowPosts: tvShowPosts,
    });
}

// Controller to get the page for a specific category (with posts)
exports.cinemaPage = async (req, res) => {
    // Get all the posts and sort them by creation date
    const postsData = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');
    
    // Filter the posts by category
    const posts = postsData
    .filter((post) => post.category === "cinema");

    // Render the cinema page with the posts and the user session
    return res.render('pages/cinema', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        posts: posts,
    });
}

// Controller to get the page for a specific category (with posts)
exports.tvShowsPage = async (req, res) => {
    // Get all the posts and sort them by creation date
    const postsData = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');
    
    // Filter the posts by category
    const posts = postsData
    .filter((post) => post.category === "tvShow");

    // Render the tv shows page with the posts and the user session
    return res.render('pages/tvShows', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        posts: posts,
    });
}