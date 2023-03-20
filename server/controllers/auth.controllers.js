const User = require('../models/User.models');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
    return res.render('pages/auth/login', {
        errorMessage: ''
    });
}

exports.registerPage = (req, res) => {
    return res.render('pages/auth/register', {
        errorMessage: ''
    });
}

exports.loginRequest = (req, res) => {
    User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                req.session.user = { id: user._id, firstname: user.firstname, lastname: user.lastname,  email: user.email, role: user.role };
                return res.status(200).redirect('/home');
            } else {
                return res.status(401).render('pages/auth/login', {
                    errorMessage: "Invalid email or password"
                });
            }
        } else {
            return res.status(400).render('pages/auth/login', {
                errorMessage: "Invalid email or password"
            });
        }
    })
}

exports.registerRequest = (req, res) => {
    User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            return res.status(401).render('pages/auth/register', {
                errorMessage: "Email already in use",
            })
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
                role: 'user',
            })
            await newUser.save();
            return res.status(200).redirect('/home');
        }
    })
}

exports.logoutRequest = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/login');
    });
}