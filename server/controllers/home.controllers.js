const Post = require("../models/Post.models");

exports.homePage = async (req, res) => {
    const posts = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');

    const latestPosts = posts
    .slice(0, 6);

    const cinemaPosts = posts
    .filter((post) => post.category === "cinema")
    .slice(0, 3);

    const tvShowPosts = posts
    .filter((post) => post.category === "tvShow")
    .slice(0, 3);

    return res.render('pages/index', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        latestPosts: latestPosts,
        cinemaPosts: cinemaPosts,
        tvShowPosts: tvShowPosts,
    });
}

exports.cinemaPage = async (req, res) => {
    const postsData = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');
    
    const posts = postsData
    .filter((post) => post.category === "cinema");

    return res.render('pages/cinema', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        posts: posts,
    });
}

exports.tvShowsPage = async (req, res) => {
    const postsData = await Post.find()
    .sort({ created_at: -1 })
    .populate('author', 'firstname lastname fullname banner');
    
    const posts = postsData
    .filter((post) => post.category === "tvShow");

    return res.render('pages/tvShows', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        posts: posts,
    });
}