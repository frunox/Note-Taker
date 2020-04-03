// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/", function (req, res) {
        // utilize the res.sendFile() method which transfer the given file path and sets the content-type response HTTP header to the appropriate header (example- sends the html path to the browser)
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Basic (root) route that sends the user to index.html
    // use express (app.) to declare a GET route (root in this case)
    // .get has 2 args - route ("/")
    // second arg is a callback == function  to defin the path to index.html
    app.get("/", function (req, res) {

        res.sendFile(path.join(__dirname, "public/index.html"));
    });

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });


    // If no matching route is found default to home
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
