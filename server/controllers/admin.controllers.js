const User = require("../models/User.models");
const Post = require("../models/Post.models");

exports.adminPostsPage = async (req, res) => {
    const allPosts = await Post.find()
    .populate('author', 'firstname lastname fullname email banner');

    return res.render('pages/admin/adminPosts', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        params: req.query,
        allPosts: allPosts,
    });
}

exports.adminUsersPage = async (req, res) => {
    const allUsers = await User.find();

    return res.render('pages/admin/adminUsers', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        params: req.query,
        allUsers: allUsers,
    });
}

exports.editPostPage = async (req, res) => {
    if (req.params.id) {
        try {
            const post = await Post.findById(req.params.id);
            if (post) {
                return res.status(200).render('pages/admin/editPost', {
                    user: req.session.user,
                    originalUrl: req.originalUrl,
                    post: post,
                });
            } else {
                return res.status(400).json({message: "Invalid post id"});
            }
        } catch {
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }
    } else {
        return res.status(400).json({message: "No post id in the request"});
    }
}

exports.createPostPage = async (req, res) => {
    try {
        return res.status(200).render('pages/admin/createPost', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        });
    } catch {
        return res.status(500).render('pages/errors/500', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        })
    }
}

exports.createPostRequest = async (req, res) => {
    if (req.body.postTitle && req.body.postContent) {
        const post = new Post({
            title: req.body.postTitle,
            banner: req.body.banner,
            content: req.body.postContent,
            category: req.body.category,
            author: req.session.user.id,
            comments: [],
            created_at: new Date(),
        })
        await post.save();

        return res.status(200).redirect(`/admin/admin-posts?created=${true}`);
    } else {
        return res.status(400).json({message: "Posts need a title and content"});
    }
}

exports.editPostRequest = async (req, res) => {
    if (req.params.id && req.body.postTitle && req.body.category && req.body.postContent) {
        try {
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.postTitle,
                banner: req.body.banner,
                category: req.body.category,
                content: req.body.postContent
            });
    
            return res.status(200).redirect(`/admin/admin-posts?edited=${true}`);
        } catch {
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }
    } else {
        return res.status(400).json({message: "No post id in the request"});
    }
}

exports.deletePostRequest = async (req, res) => {
    if (req.body.postId) {
        try {
            await Post.findByIdAndDelete(req.body.postId);
        } catch {
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }

        return res.status(200).redirect(`/admin/admin-posts?deleted=${true}`);
    } else {
        return res.status(400).json({message: "Invalid post id"});
    }
}

exports.deleteUserRequest = async (req, res) => {
    if (req.body.userId) {
        try {
            await User.findByIdAndDelete(req.body.userId);
        } catch {
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }

        return res.status(200).redirect(`/admin/admin-users?deleted=${true}`);
    } else {
        return res.status(400).json({message: "Invalid user id"});
    }
}