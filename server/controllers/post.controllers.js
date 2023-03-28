const Post = require('../models/Post.models');
const Comment = require('../models/Comment.models');

// Controller to get the page for a specific post (with comments)
exports.postPage = async (req, res) => {
    try {
        // Get the post by its id and populate the author and comments
        const post = await Post.findById(req.params.id)
        .populate('author', 'firstname lastname fullname banner')   
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'firstname lastname fullname'
            }
        });

        // Render the post page with the post data and the user session
        return res.status(200).render('pages/post', {
            user: req.session.user,
            originalUrl: req.originalUrl,
            post: post,
        });
    } catch {
        // If the post doesn't exist, redirect to the 404 page
        return res.status(404).redirect('/404');
    }
}

// Controller to create a new comment for a post
exports.publishComment = async (req, res) => {
    const { content } = req.body;

    try {
        // Get the post and the user from the session
        const post = await Post.findById(req.params.id);
        const user = req.session.user;

        // Create a new comment and push it to the post's comments array
        const comment = new Comment({
            content: content,
            author: user.id,
            created_at: new Date()
        });

        // Save the comment and the post
        post.comments.push(comment);
        await post.save();

        // Redirect to the post page
        res.status(201).redirect(`/post/${req.params.id}`);
    } catch (err) {
        // If an error occurs, redirect to the 500 page
        return res.status(500).render('pages/errors/500', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        })
    }
}

// Controller to delete a comment from a post
exports.deleteComment = async (req, res) => {
    const postId = req.params.id;
    const commentId = req.body.commentId;

    try {
        // Find the post and remove the comment from the comments array
        const post = await Post.findByIdAndUpdate(postId, {$pull: {comments: {_id: commentId}}});

        // If the post doesn't exist, redirect to the 404 page
        if (!post) {
            return res.status(404).render('pages/errors/404', {
                user: req.session.user,
                originalUrl: req.originalUrl,
            });
        }

        // Redirect to the post page with the post id
        res.status(200).redirect(`/post/${postId}`);
    } catch (err) {
        // If an error occurs, redirect to the 500 page
        return res.status(500).render('pages/errors/500', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        });
    }
};