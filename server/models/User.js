// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['student', 'teacher', 'hod', 'admin'], required: true },
//   // semester: { type: Number, required: function() { return this.role === 'student'; } }, // Add semester for students
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'hod', 'admin'], required: true },
  semester: {
    type: Number,
    required: function() { return this.role === 'student'; }, // Required if the role is 'student'
  },
  enrollmentNumber: {
    type: String,
    required: function() { return this.role === 'student'; }, // Required if the role is 'student'
    unique: true, // Assuming enrollment numbers should be unique
  },
});

module.exports = mongoose.model('User', userSchema);
