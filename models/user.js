var mongoose = require("mongoose");

// User Schema
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

var User = (module.exports = mongoose.model("User", userSchema));


// Get User
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

// Get Users
module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
};

//Add User
module.exports.addUser = function(user, callback) {
  User.create(user, callback);
};

//Update User
module.exports.updateUser = function(id, user, options, callback) {
  var query = { _id: id };
  var update = {
    name: user.name
  };
  User.findOneAndUpdate(query, update, options, callback);
};

//Delete User
module.exports.deleteUser = function(id, callback) {
  var query = { _id: id };
  User.remove(query, callback);
};
