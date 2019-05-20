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

  User.getUserById(exercise.userId, function(err, user) {
    if (err) {
      res.send("unknown_id");
      console.log(err);
    } else {
      Exercise.addExercise(exercise, function(err, exercise) {
        if (err) {
          res.send(err.message);
          console.log(err);
        }
        res.json({
          username: user.username,
          description: exercise.description,
          duration: exercise.duration,
          _id: exercise.userId,
          date: exercise.date
        });
      });
    }
  });
});

app.get("/api/exercise/users", function(req, res) {
  User.getUsers(function(err, users) {
    if (err) {
      res.send(err.message);
      console.log(err);
    }
    res.json(users);
  });
});

app.get("/api/exercise/log", function(req, res) {
  
  var userId = req.query.userId;
  var limit = req.query.limit;
  var from = req.query.from;
  var to = req.query.to;
  User.getUserById(userId, function(err, user) {
    if (err) {
      res.send("unknown_id");
      console.log(err);
    } else {
      Exercise.getExercisesByQueryObject(
        { userId, date: { $gt: from, $lt: to } },
        function(err, exercises) {
          if (err) {
            res.send(err.message);
            console.log(err);
          }
          res.json({
            _id: userId,
            username: user.username,
            count: exercises.length,
            log: exercises
          });
        },
        limit,
        { date: 1 },
        { userId: 0, _id: 0, __v: 0 }
      );
    }
  });
});






// Find people who like "burrito". Sort them alphabetically by name,
// Limit the results to two documents, and hide their age.
// Chain `.find()`, `.sort()`, `.limit()`, `.select()`, and then `.exec()`,
// passing the `done(err, data)` callback to it.

var queryChain = function(done) {
  var foodToSearch = "burrito";

   Person.find({ favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select( {age: 0} ).exec(function(err, people) {
if(err){done(err)}
     done(null, people)
})
};






app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
