const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// // Register user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, role });
//     await user.save();
//     res.status(201).json({ message: 'User registered' });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !bcrypt.compareSync(password, user.password)) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Create a token with user ID and role
//     const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey');

//     // Send back the token and the role
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(400).json({ error: error.message }); // Send a more informative error message
//   }
// };




// new login register with semester and enrollment


// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, semester, enrollmentNumber } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = { name, email, password: hashedPassword, role };

    // Include semester and enrollmentNumber only for students
    if (role === 'student') {
      userData.semester = semester;
      userData.enrollmentNumber = enrollmentNumber;
    }

    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token with user ID and role, and set an expiration time (e.g., 1 hour)
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

    // Send back the token and the role
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send a more informative error message
  }
};
