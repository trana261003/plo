// const mongoose = require('mongoose');

// const assignmentSchema = new mongoose.Schema({
//   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   submittedAnswer: { type: String },
//   status: { type: String, enum: ['pending', 'submitted', 'reviewed'], default: 'pending' },
//   grade: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Assignment', assignmentSchema);




// const mongoose = require('mongoose');

// const assignmentSchema = new mongoose.Schema({
//   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   submittedAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubmittedAnswer' }], // Array to hold submitted answers
//   status: { type: String, enum: ['pending', 'submitted', 'reviewed'], default: 'pending' },
//   grade: { type: Number, default: 0 },
//   semester: { type: Number, required: true }, // Add semester field
//   dueDate: { type: Date, required: true },
//   points: { type: Number, required: true, default: 100 },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Assignment', assignmentSchema);




const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  submittedAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubmittedAnswer' }], // Array to hold submitted answers
  status: { type: String, enum: ['pending', 'submitted', 'reviewed'], default: 'pending' },
  grade: { type: Number, default: 0 },
  semester: { type: Number, required: true }, // Add semester field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);















