const Post = require("../models/Post.models");

exports.createPostPage = (req, res) => {
    return res.render('pages/admin/createPost', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        successMessage: "",
    });
}

exports.createPostRequest = async (req, res) => {
    if (req.body.postTitle && req.body.postContent) {
        const post = new Post({
            title: req.body.postTitle,
            content: req.body.postContent,
            category: req.body.category,
            author: req.session.user.id,
        })
        await post.save();
        return res.status(200).render('pages/admin/createPost', {
            user: req.session.user,
            originalUrl: req.originalUrl,
            successMessage: "Post successfully created !",
        });
    } else {
        return res.status(400).json({message: "Posts need a title and content"});
    }
}