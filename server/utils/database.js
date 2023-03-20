const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));

database.once('open', function() {
    console.log("Database connected successfully");
});

module.exports = database;