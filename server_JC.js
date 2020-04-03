// Dependencies
// =============================================================
var express = require("express");
// path package reads .html files, generates a path to sent to the server
// replaces fs (file system)
var path = require("path");

// Sets up the Express App
// =============================================================
// instantiate a new express app using express()
var app = express();
//  declare a PORT number on our local machine so it knows where to locate our app
var PORT = process.env.PORT || 8080;

// MIDDLEWARE for handling POST requests
// Sets up the Express app to handle data parsing for incoming data,
// which is received as plain text, to object notation
// and it populates req.body object
// these listen for a post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Routes
// =============================================================
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
