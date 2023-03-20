function checkAdmin(req, res, next) {
    if (req.session && req.session.user) {
        if (req.session.user.role === 'admin')
            return next();
        else
            return res.redirect('/login');
    } else {
        return res.redirect('/login');
    }
}

module.exports = checkAdmin;