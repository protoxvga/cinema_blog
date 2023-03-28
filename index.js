require('dotenv').config()

const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const cookieParser = require('cookie-parser');
const session = require('express-session');  // session middleware
const database = require("./server/utils/database");
const methodOverride = require('method-override')

const router = require("./server/routes/router");

var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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

// Configure More Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use("/", router);

app.listen(3000);
    console.log('Server is listening on port 3000');