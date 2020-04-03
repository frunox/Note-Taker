//DECLARE DEPENDENCIES
// fs and path are packages included in node
var fs = require('fs');
var path = require('path');
// express is a package in the npm library and must be installed
var express = require('express');

// Instantiate a new express app utilizing the express() method.
var app = express();

//  notesDB is an array of objects, intialized with the data in db.json
//  that holds the objects with titles and text of each note
var notesDB = require('./db/db.json');

// Declare a port number for the server to find the application.
// this format is needed for Heroku
var PORT = process.env.PORT || 8080;

// Middleware to handle parsing of the request string and converts to a json object. Later referred to as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// we needed this to access the files in the folders inside the 'public' folder
app.use(express.static('public'));

//  CREATE GET ROUTES

// ROOT ROUTE: Return the path to the index.html file so it can be rendered
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// NOTES ROUTE: Return the path to the notes.html file so it can be rendered
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// CREATE API ROUTES
// When the /notes route is called, send the array of existing notes to the page to be rendered
app.get("/api/notes", function (req, res) {
    // .json() method sends the json formatted array, which is parsed by the browser for rendering
    res.json(notesDB);
});

// Create the API POST route
app.post('/api/notes', function (req, res) {
    // after a note is added, the title and text is sent in req.body and added to the array of notes
    notesDB.push(req.body);

    // over-write db.json with the array containing the new note
    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    });
    // respond with the updated array to be rendered
    res.json(notesDB)
});

// Create the API delete routes
app.delete('/api/notes/:id', function (req, res) {
    // the id for the note to be deleted is in req.params.id
    // use .splice() to remove the note from the array
    notesDB.splice(req.params.id, 1)
    //  over-write db.json again, this time without the note that was deleted
    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    })
    // a default response to the request.  A response is required for every request.
    res.json(true);
})

//  a catch-all route to return to the home page (index.html) if an incorrect route is hit
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//Turns our server on.  The app is now listening to the port defined above for client requests
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});