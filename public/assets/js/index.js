var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $noteId = $("#id");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function () {
  // console.log('In getNotes()')
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
// note is the id for the note selected to delete (also the array index)
var saveNote = function (note) {
  // console.log('In saveNote()')
  activeNote = note;
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function (id) {
  return $.ajax({
    url: "/api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
  $saveNoteBtn.hide();

  if (activeNote.noteId) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
  // .data()

  if (activeNote.id === note.id) {
    activeNote = {};
  }
  //  create variable to hold the id for the element to delete
  var noteId = $(note).attr("id");
  // call deleteNote() with the new variable noteId as an argument
  deleteNote(noteId).then(function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};


// Sets the activeNote and displays it
var handleNoteView = function () {
  activeNote = $noteText.val().trim();
  console.log('activeNote = ' + JSON.stringify(activeNote))
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of existing note titles
// notes = notesDb array, passed from /api/routes in server.js, then through getAndRenderNotes()
var renderNoteList = function (notes) {
  // clear the ul element containing the list of notes
  $noteList.empty();
  // create an array to hold the new li elements
  var noteListItems = [];
  // start the loop at i = 1 to ignore the dummy element in db.json and the array
  for (var i = 1; i < notes.length; i++) {
    // declare a variable to hold the current note
    var note = notes[i];
    // create a new li element with class="list-group-item"
    var $li = $("<li class='list-group-item'>");
    // add the attribut id="i" to apply a unique id to each li element
    $li.attr("id", i);
    //  create a span element to hold the title of the note
    var $span = $("<span>").text(note.title);
    // create the 'delete note' icon element
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
    // append the title text and delete button to the new li element
    $li.append($span, $delBtn);
    // add the li element to the array
    noteListItems.push($li);

  }
  // append the array of new li elements to the ul element
  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

// event listener for the save new note icon
$saveNoteBtn.on("click", handleNoteSave);
// event listener for the note title in the list
$noteList.on("click", ".list-group-item", handleNoteView);
// event listener for new note icon
$newNoteBtn.on("click", handleNewNoteView);
// event listener for the delete note icon
$noteList.on("click", ".delete-note", handleNoteDelete);
// event listeners to render the new note save icon after the user clicks into the note title or note text boxes
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();

