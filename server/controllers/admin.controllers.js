const User = require("../models/User.models");
const Post = require("../models/Post.models");

// Controller for the admin dashboard page for posts (only for admins)
exports.adminPostsPage = async (req, res) => {
    // Get all the posts and populate the author field with the firstname, lastname, fullname, email and banner
    const allPosts = await Post.find()
    .populate('author', 'firstname lastname fullname email banner');

    // Render the admin dashboard page with the posts and the user session
    return res.render('pages/admin/adminPosts', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        params: req.query,
        allPosts: allPosts,
    });
}

// Controller for the admin dashboard page for users (only for admins)
exports.adminUsersPage = async (req, res) => {
    // Get all the users
    const allUsers = await User.find();

    // Render the admin dashboard page with the users and the user session
    return res.render('pages/admin/adminUsers', {
        user: req.session.user,
        originalUrl: req.originalUrl,
        params: req.query,
        allUsers: allUsers,
    });
}

// Controller to get the page to edit a post (only for admins)
exports.editPostPage = async (req, res) => {
    // Check if the post id is in the request
    if (req.params.id) {
        try {
            // Get the post with the id in the request
            const post = await Post.findById(req.params.id);
            if (post) {
                // Render the edit post page with the post and the user session
                return res.status(200).render('pages/admin/editPost', {
                    user: req.session.user,
                    originalUrl: req.originalUrl,
                    post: post,
                });
            } else {
                // If the post doesn't exist, return a 400 error
                return res.status(400).json({message: "Invalid post id"});
            }
        } catch {
            // If an error occurs, redirect to the 500 page
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }
    } else {
        // If the post id is not in the request, return a 400 error
        return res.status(400).json({message: "No post id in the request"});
    }
}

// Controller for the page to create a post (only for admins)
exports.createPostPage = async (req, res) => {
    try {
        // Render the create post page with the user session
        return res.status(200).render('pages/admin/createPost', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        });
    } catch {
        // If an error occurs, redirect to the 500 page
        return res.status(500).render('pages/errors/500', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        })
    }
}

// Controller to handle the request to create a post (only for admins)
exports.createPostRequest = async (req, res) => {
    // Check if the post title and content are in the request
    if (req.body.postTitle && req.body.postContent) {
        // Create a new post with the title, content, category, author, comments and created_at
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

        // Redirect to the admin dashboard page with the created parameter set to true
        return res.status(200).redirect(`/admin/admin-posts?created=${true}`);
    } else {
        // If the post title or content are not in the request, return a 400 error
        return res.status(400).json({message: "Posts need a title and content"});
    }
}

// Controller to handle the request to edit a post (only for admins)
exports.editPostRequest = async (req, res) => {
    // Check if the post id, title, category and content are in the request
    if (req.params.id && req.body.postTitle && req.body.category && req.body.postContent) {
        try {
            // Update the post with the id in the request with the title, category and content in the request
            await Post.findByIdAndUpdate(req.params.id, {
                title: req.body.postTitle,
                banner: req.body.banner,
                category: req.body.category,
                content: req.body.postContent
            });

            // Redirect to the admin dashboard page with the edited parameter set to true
            return res.status(200).redirect(`/admin/admin-posts?edited=${true}`);
        } catch {

            // If an error occurs, redirect to the 500 page
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }
    } else {
        // If the post id, title, category or content are not in the request, return a 400 error
        return res.status(400).json({message: "No post id in the request"});
    }
}

// Controller to handle the request to delete a post (only for admins)
exports.deletePostRequest = async (req, res) => {
    // Check if the post id is in the request
    if (req.body.postId) {
        try {
            // Delete the post with the id in the request
            await Post.findByIdAndDelete(req.body.postId);
        } catch {
            // If an error occurs, redirect to the 500 page
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }

        // Redirect to the admin dashboard page with the deleted parameter set to true
        return res.status(200).redirect(`/admin/admin-posts?deleted=${true}`);
    } else {
        // If the post id is not in the request, return a 400 error
        return res.status(400).json({message: "Invalid post id"});
    }
}

// Controller to handle the request to delete a user (only for admins)
exports.deleteUserRequest = async (req, res) => {
    // Check if the user id is in the request
    if (req.body.userId) {
        try {
            // Delete the user with the id in the request
            await User.findByIdAndDelete(req.body.userId);
        } catch {
            // If an error occurs, redirect to the 500 page
            return res.status(500).render('pages/errors/500', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            })
        }

        // Redirect to the admin dashboard page with the deleted parameter set to true
        return res.status(200).redirect(`/admin/admin-users?deleted=${true}`);
    } else {
        // If the user id is not in the request, return a 400 error
        return res.status(400).json({message: "Invalid user id"});
    }
}