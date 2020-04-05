// use 'path' node package to define paths to files
var path = require("path");
//  express.Router() class to define groups of routes
var router = require("express").Router();

// ROOT ROUTE - directs browser to the landing page
router.get("/", function (req, res) {
    // console.log("REACHED THE ROOT ROUTE")
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// NOTES ROUTE - directs browser to the notes page
router.get("/notes", function (req, res) {
    // console.log("REACHED THE NOTES ROUTE")
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

//  CATCH-ALL ROUTE - works as an error handler so if a request is received
// to an undefined route, the browser re-directs to the landing page and no HTML 404 error is created
router.get("*", function (req, res) {
    // console.log("REACHED THE CATCH_ALL ROUTE")
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export the routes via the Router
module.exports = router;