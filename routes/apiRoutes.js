// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        // response needs to access the notesDB variable in order to send a response
        res.json(notesDB);
    });


    // reference app as our instance of an express application to declare a POST route named '/api/tables
    // req and res are our objects that are populated via the express app.post method
    app.post("/api/notes", function (req, res) {

        notesDB.push(req.body);
        console.log(JSON.stringify(req.body));
        //notesDB.push("dinner", "pasta")
        // add the new note to the db.json file
        fs.readFile("./develop/db/db.json", "utf-8", function (error) {
            req.body.push(notesDB);
        })
        fs.appendFile("./develop/db/db.json", JSON.stringify(notesDB), function (error) {
            req.body
        })
        // return the new note to the client
        res.json(notesDB);
    });
};
