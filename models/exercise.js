var mongoose = require("mongoose");

// Exercise Schema
var exerciseSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Exercise = (module.exports = mongoose.model("Exercise", exerciseSchema));

// Get Exercises
module.exports.getExercises = function(callback, limit) {
  Exercise.find(callback).limit(limit);
};

//Add Exercise
module.exports.addExercise = function(exercise, callback) {
  Exercise.create(exercise, callback);
};

//Update Exercise
module.exports.updateExercise = function(id, exercise, options, callback) {
  var query = { _id: id };
  var update = {
    name: exercise.name
  };
  Exercise.findOneAndUpdate(query, update, options, callback);
};

//Delete Exercise
module.exports.deleteExercise = function(id, callback) {
  var query = { _id: id };
  Exercise.remove(query, callback);
};
