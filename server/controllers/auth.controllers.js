const User = require('../models/User.models');
const bcrypt = require('bcrypt');

// Controller for login page
exports.loginPage = (req, res) => {
    return res.render('pages/auth/login', {
        errorMessage: ''
    });
}

// Controller for register page
exports.registerPage = (req, res) => {
    return res.render('pages/auth/register', {
        errorMessage: ''
    });
}

// Controller for the login request
exports.loginRequest = (req, res) => {
    // Check if the user exists in the database and if the password is correct
    User.findOne({ email: req.body.email }).then(async (user) => {
        // If the user exists
        if (user) {
            // Compare the password with the hashed password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                req.session.user = { id: user._id, firstname: user.firstname, lastname: user.lastname,  email: user.email, role: user.role };
                return res.status(200).redirect('/home');
            } else {
                // If the password is incorrect return an error
                return res.status(401).render('pages/auth/login', {
                    errorMessage: "Invalid email or password"
                });
            }
        } else {
            // If the user doesn't exist return an error
            return res.status(400).render('pages/auth/login', {
                errorMessage: "Invalid email or password"
            });
        }
    })
}

// Controller for the register request
exports.registerRequest = (req, res) => {
    // Check if the user exists in the database
    User.findOne({ email: req.body.email }).then(async (user) => {
        // If the user exists return an error
        if (user) {
            return res.status(401).render('pages/auth/register', {
                errorMessage: "Email already in use",
            })
        } else {
            // If the user doesn't exist, create a new user and save it to the database
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
                role: 'user',
            })
            await newUser.save();

            // Redirect to the home page
            return res.status(200).redirect('/home');
        }
    })
}

// Controller for the logout request
exports.logoutRequest = (req, res) => {
    // Destroy the session and redirect to the login page
    req.session.destroy(() => {
        return res.redirect('/login');
    });
}