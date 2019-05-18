var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("./config");

app.use(bodyParser.json());

Genre = require("./models/genre");
Book = require("./models/book")

// Connect to mongoose
mongoose.connect(config.MLAB_URI, {
  useNewUrlParser: true
});

var db = mongoose.connection;

app.get("/", function(req, res) {
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", function(req, res) {
  Genre.getGenres(function(err, genre) {
      if (err){
          throw err;
      }
      res.json(genre);
  });
});

app.post("/api/genres", function(req, res) {
  var genre = req.body;
  Genre.addGenre(genre,function(err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put("/api/genres/:_id", function(req, res) {
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, function(err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete("/api/genres/:_id", function(req, res) {
  var id = req.params._id;

  Genre.deleteGenre(id, function(err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.get("/api/books", function(req, res) {
  Book.getBooks(function(err, book) {
    if (err) {
      throw err;
    }
   // console.log(books);
    res.json(book);
  });
});


app.post("/api/books", function(req, res) {
  var book = req.body;
  Book.addBook(book, function(err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.get("/api/books/:_id", function(req, res) {
  Book.getBookById(req.params._id, function(err, books) {
    if (err) {
      throw err;
    }
    // console.log(books);
    res.json(books);
  });
});

app.put("/api/books/:_id", function(req, res) {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, { new: true, useFindAndModify : false}, function(
    err,
    book
  ) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete("/api/books/:_id", function(req, res) {
  var id = req.params._id;

  Book.deleteBook(id, function(err, data) {
    if (err) {
      throw err;
    }
    res.json(data);
  });
});

app.listen(3000);

console.log("Running on port 3000...");
