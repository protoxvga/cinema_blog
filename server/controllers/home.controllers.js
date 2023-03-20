const Post = require("../models/Post.models");

exports.homePage = async (req, res) => {
    const latestPosts = await Post.find()
    .sort({ created_at: -1 })
    .limit(3)
    .populate('author', 'firstname lastname');

    return res.render('pages/index', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        latestPosts: latestPosts
    });
}