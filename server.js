const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(process.env.MLAB_URI || "mongodb://localhost/exercise-track", {
  useNewUrlParser: true
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

////////////////////////////////////////////////////////////////////////////////////////////
/// database initialisation

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

function createAndSaveUser(username) {
    var user = new User({
      username: username
    });
    user.save(function(err, data) {(err ? console.log(err) : console.log(data))});
  }

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));

////////////////////////////////////////////////////////////////////////////////////////////


function findUsersByName(username, cb) {
  User.find({ username: username }, function(err, data) {
    if (err) {
      console.log(err);
    }
    cb({id: data[0]._id}) ;
  });
};

/////////////////////

app.post("/api/exercise/new-user",(req,res)=>{
createAndSaveUser(req.body.username);
res.json({username: req.body.username});
});

app.get("/api/:username", (req,res)=>{
//  let user = req.params.username;
//findUsersByName(user, res.json())
//res.json({user: user})
//res.json(findUsersByName(user));
User.find({ username: req.params.username }, function(err, data) {
  if (err) {
    console.log(err);
  }
  res.json({ id: data[0]._id });
});


});

findUsersByName("goldberg",console.log);

/*
// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: "not found" });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res
    .status(errCode)
    .type("txt")
    .send(errMessage);
});

*/

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
