require('dotenv').config()  // load environment variables

const express = require('express');         // server software
const bodyParser = require('body-parser');  // parser middleware
const cookieParser = require('cookie-parser');  // cookie middleware
const session = require('express-session');     // session middleware
const database = require("./server/utils/database");    // database connection
const methodOverride = require('method-override')       // method override middleware
const router = require("./server/routes/router");       // router middleware

// Create express app
var app = express();

// Set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Set up middlewares
app.set('trust proxy', 1);
app.use(session({
    name: `userStore`,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Set up routes
app.use("/", router);

// Start server and listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 3000');
})