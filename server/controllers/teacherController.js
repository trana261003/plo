const User = require('../models/User');

// Get all students
exports.getAllTeachers = async (req, res) => {
  try {
    const students = await User.find({ role: 'teacher' }).select('name email role'); // Fetch only the necessary fields
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};