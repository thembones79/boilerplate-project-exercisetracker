var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var config = require("./config");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Genre = require("./models/genre");
Book = require("./models/book");
User = require("./models/user");
Exercise = require("./models/exercise");

// Connect to mongoose
mongoose.connect(config.MLAB_URI, {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;

app.post("/api/exercise/new-user", function(req, res) {
  var user = req.body;
  User.addUser(user, function(err, user) {
    if (err) {
      res.send("username already taken");
      console.log(err.errmsg);
    }
    res.json(user);
  });
});

app.post("/api/exercise/add", function(req, res) {
  var exercise = req.body;
  if (!exercise.date) {
    exercise.date = Date.now();
  }

  Exercise.getExerciseById(exercise.userId, function(err, data) {
    if (err) {
      res.send("unknown_id");
      console.log(err);
    } else {
      Exercise.addExercise(exercise, function(err, exercise) {
        if (err) {
          res.send(err.message);
          console.log(err);
        }
        res.json(exercise);
      });
    }
  });
});

app.get("/api/exercise/users", function(req, res) {
  User.getUsers(function(err, user) {
    if (err) {
      throw err;
    }
    res.json(user);
  });
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
