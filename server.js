// require express package
const express = require("express");

//Initialize app to hold express methods and create a port
const app = express();
const PORT = process.env.PORT || 8080;

//Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//  access .js files for api and html routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
//  tell express that any request including '/api' goes to apiRoutes.js
app.use("/api", apiRoutes);
//  tell express that any request including '/' goes to htmlRoutes.js
app.use("/", htmlRoutes);
//  define notesDB to be equal to the current value of db.json
var notesDB = require('./db/db.json');

//Start the Server on the port defined above
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));