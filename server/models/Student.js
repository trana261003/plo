// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add any additional fields here, like class, age, etc.
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
