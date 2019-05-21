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
    type: Number,
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

// Get Exercises for Selected User
module.exports.getExercisesByQueryObject = function(obj) {
  Exercise.find(obj.queryObject, obj.callback)
    .limit(obj.limit)
    .sort(obj.sortingOrder)
    .select(obj.filterObject);
};

// Get Exercise
module.exports.getExerciseById = function(id, callback) {
  Exercise.findById(id, callback);
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
