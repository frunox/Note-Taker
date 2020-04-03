//DECLARE DEPENDENCIES
var http = require("http");
var fs = require('fs');
var path = require('path');
var express = require('express');
var notesDB = require('./db/db.json');
// var notesDB = [];

// Cynthia's code
// var temp = fs.readFileSync("./db/db.json", "utf8");

// var tempArray = JSON.parse(temp);

// var notesDB = Object.keys(tempArray).map(i => tempArray[i]);

// console.log('notesDB intialized: ', notesDB + "  typeof: " + (typeof (notesDB)));
console.log('notesdDB[0]: ', JSON.stringify(notesDB[0]));

// Instantiate a new express app utilizing the express() method.
var app = express();

//Decleare a port number for the server to find the application.
var PORT = process.env.PORT || 8080;


var notesArray = [];

// Middleware to handle parsing of the request string and converts to a json object. Later referred to as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//  Create .get routes

// Return the index page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Return the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// Create API get routes
//set up the notes
app.get("/api/notes", function (req, res) {
    //response to access notesDB variable in order to send to response.
    res.json(notesDB);
});

// Create the API POST routes
app.post('/api/notes', function (req, res) {
    // console.log('newNote:  ' + JSON.stringify(req.body));
    // var newNote = JSON.stringify(req.body);
    notesDB.push(req.body);
    // console.log('notesDB:  ' + notesDB);
    // console.log('notesDB:  ' + JSON.stringify(notesDB));



    // var junk = notesDB.splice(0, 1);

    for (var i = 0; i < notesDB.length; i++) {
        console.log('notesDB[i]:  ' + JSON.stringify(notesDB[i]));
    }

    // console.log('notesDB:  ' + JSON.stringify(notesDB));

    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    });



    // notesDB.push(newNote)
    // console.log('notesDB:  ' + notesDB)
    res.json(notesDB)
});

// Create the API delete routes
app.delete('/api/notes/:id', function (req, res) {

    // console.log(req.params.id)
    notesDB.splice(req.params.id, 1)

    fs.writeFile('db/db.json', JSON.stringify(notesDB), function (err) {
        if (err) {
            throw error;
        }
    })
    res.json(true);
})


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});





//Turns our server on
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});