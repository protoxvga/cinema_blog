// Description: Middleware to check if user is logged in

function checkUser(req, res, next) {
    if (req.session && req.session.user) {
        if (req.session.user.role === 'user' || req.session.user.role === 'admin')
            return next();
        else
            return res.redirect('/login');
    } else {
        return res.redirect('/login');
    }
}

module.exports = checkUser;