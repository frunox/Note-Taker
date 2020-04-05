//  express.Router() class to define groups of routes
var router = require("express").Router();
// use node fs package to read and write to files
const fs = require("fs");

//  notesDB is an array of objects, intialized with the data in db.json
//  that holds the objects with titles and text of each note
var notesDB = require('../db/db.json');

// CREATE API ROUTES
// When the /notes route is called, send the array of existing notes to the page to be rendered
router.get("/notes", function (req, res) {
    // .json() method sends the json formatted array, which is parsed by the browser for rendering
    // response to the GET request from the client, renders the existing db.json
    res.json(notesDB);
});

// Create the API POST route
router.post('/notes', function (req, res) {
    // after a note is added, the title and text is sent in req.body and added to the array of notes
    //  add the new note to the array of notes
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
router.delete('/notes/:id', function (req, res) {
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
});

// export the routes via Router
module.exports = router;