const Post = require('../models/Post.models');
const Comment = require('../models/Comment.models');

exports.postPage = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate('author', 'firstname lastname fullname')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'firstname lastname fullname'
            }
        });

        return res.status(200).render('pages/post', {
            user: req.session.user,
            originalUrl: req.originalUrl,
            post: post,
        });
    } catch {        
        return res.status(404).redirect('/404');
    }
}

exports.publishComment = async (req, res) => {
    const { content } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        const user = req.session.user;

        if (!post) {
            return res.status(404).redirect('404');
        }

        const comment = new Comment({
            content: content,
            author: user.id,
            created_at: new Date()
        });

        post.comments.push(comment);
        await post.save();

        res.status(201).redirect(`/post/${req.params.id}`);
    } catch (err) {
        return res.status(500).render('pages/errors/500', {
            user: req.session.user,
            originalUrl: req.originalUrl,
        })
    }
}