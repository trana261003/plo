// const Assignment = require('../models/Assignment');
// const mongoose = require('mongoose');

// // Create Assignment
// exports.createAssignment = async (req, res) => {
//   try {
//     const { teacherId, studentId, title, content } = req.body;
    
//     // Validate ObjectId for teacherId and studentId
//     if (!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(studentId)) {
//       return res.status(400).json({ message: 'Invalid teacherId or studentId' });
//     }

//     const assignment = new Assignment({ teacherId, studentId, title, content });
//     await assignment.save();
//     res.status(201).json({ message: 'Assignment created', assignment });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Submit Assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { submittedAnswer } = req.body;

    // Validate that submittedAnswer is provided
    if (!submittedAnswer) {
      return res.status(400).json({ message: 'Submitted answer is required' });
    }

    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { submittedAnswer, status: 'submitted' },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment submitted', assignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Assignments
// exports.getAllAssignments = async (req, res) => {
//   try {
//     const assignments = await Assignment.find()
//       .populate('teacherId', 'name') // Assuming 'name' is a field in the User model
//       .populate('studentId', 'name'); // Assuming 'name' is a field in the User model

//     res.status(200).json(assignments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Controller: Get single assignment by ID
// exports.getAssignmentById = async (req, res) => {
//   try {
//     const assignment = await Assignment.findById(req.params.id)
//       .populate('teacherId', 'name') // Assuming you're populating teacher and student details
//       .populate('studentId', 'name');

//     // If the assignment is not found, return a 404 error
//     if (!assignment) {
//       return res.status(404).json({ message: 'Assignment not found' });
//     }

//     // Return the assignment details
//     res.status(200).json(assignment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




// // Get count of students who submitted a specific assignment by assignment ID
// exports.getSubmittedStudentsCount = async (req, res) => {
//   try {
//     const { assignmentId } = req.params;

//     // Validate ObjectId for assignmentId
//     if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
//       return res.status(400).json({ message: 'Invalid assignmentId' });
//     }

//     // Count the distinct students who have submitted the assignment
//     const count = await Assignment.countDocuments({
//       _id: assignmentId,
//       submittedAnswer: { $exists: true, $ne: null },
//       status: 'submitted'
//     });

//     res.status(200).json({ count });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





// // Get count of assignments
// exports.getAssignmentCount = async (req, res) => {
//   try {
//       const count = await Assignment.countDocuments();
//       res.status(200).json({ count });
//   } catch (error) {
//       res.status(500).json({ message: 'Error fetching assignment count', error });
//   }
// };






const Assignment = require('../models/Assignment');
const User = require('../models/User');
const mongoose = require('mongoose');

// Create Assignment
// exports.createAssignment = async (req, res) => {
//   try {
//     const { teacherId, title, content, semester } = req.body;

//     // Validate ObjectId for teacherId
//     if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//       return res.status(400).json({ message: 'Invalid teacherId' });
//     }

//     const assignment = new Assignment({ teacherId, title, content, semester });
//     await assignment.save();

//     // Optionally, notify all students in the specified semester
//     const students = await User.find({ role: 'student', semester: semester });
//     // Here you could send notifications to students about the new assignment if needed

//     res.status(201).json({ message: 'Assignment created', assignment });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Create Assignment
exports.createAssignment = async (req, res) => {
  try {
    const { teacherId, title, content, semester, dueDate, points } = req.body;

    // Validate ObjectId for teacherId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacherId' });
    }

    // Ensure that the required fields are provided
    if (!title || !content || !semester || !dueDate || !points) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new assignment with additional fields
    const assignment = new Assignment({
      teacherId,
      title,
      content,
      semester,
      dueDate: new Date(dueDate),
      points,
      status: 'pending', // Default status is pending
    });

    await assignment.save();

    // Optionally, notify all students in the specified semester
    const students = await User.find({ role: 'student', semester: semester });
    // Here you could send notifications to students about the new assignment

    res.status(201).json({ message: 'Assignment created', assignment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};







// // Submit Assignment
// exports.submitAssignment = async (req, res) => {
//   try {
//     const { submittedAnswer } = req.body;

//     // Validate that submittedAnswer is provided
//     if (!submittedAnswer) {
//       return res.status(400).json({ message: 'answer submited' });
//     }

//     const assignment = await Assignment.findById(req.params.id);

//     if (!assignment) {
//       return res.status(404).json({ message: 'Assignment not found' });
//     }

//     // Here, you may want to save the submitted answer in a way that tracks which student submitted it
//     assignment.submittedAnswers.push(submittedAnswer); // Assuming submittedAnswer is a student ID or a reference to an answer model
//     assignment.status = 'submitted';
//     await assignment.save();

//     res.json({ message: 'Assignment submitted', assignment });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Get All Assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({semester: 7})
      .populate('teacherId', 'name'); // Populate teacher details only

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller: Get single assignment by ID
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('teacherId', 'name'); // Populate teacher details only

    // If the assignment is not found, return a 404 error
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Return the assignment details
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of students who submitted a specific assignment by assignment ID
exports.getSubmittedStudentsCount = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Validate ObjectId for assignmentId
    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: 'Invalid assignmentId' });
    }

    // Count the distinct students who have submitted the assignment
    const count = await Assignment.countDocuments({
      _id: assignmentId,
      submittedAnswers: { $exists: true, $ne: [] },
      status: 'submitted'
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of assignments
exports.getAssignmentCount = async (req, res) => {
  try {
    const count = await Assignment.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment count', error });
  }
};
