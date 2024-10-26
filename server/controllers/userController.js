const User = require("../models/User");

// controllers/userController.js
// exports.getUserProfile = async (req, res) => {
//     try {
//       // Fetch the user using the ID from the JWT
//       const userId = req.user._id; // Ensure this corresponds to the correct property
//       const user = await User.findById(userId).select('-password'); // Exclude password from response
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(user); // Send user details
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch users with role 'student' or 'teacher'
    const users = await User.find({ role: { $in: ['student', 'teacher', 'hod'] } }).select('name email role'); // Fetch only necessary fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};





// user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Fetch user ID from req.user (attached by the verifyToken middleware)
    const userId = req.user.id;

    // Find the user in the database, excluding the password
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send the user information as a response
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      semester: user.semester, // Include semester if present
      enrollmentNumber: user.enrollmentNumber, // Include enrollment number if present
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
