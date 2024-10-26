// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.verifyToken = (req, res, next) => {
//   // Safely extract the Authorization header
//   const authHeader = req.header('Authorization');

//   // Check if Authorization header exists and starts with 'Bearer '
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   // Extract token by removing 'Bearer '
//   const token = authHeader.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }

//   try {
//     // Verify the token
//     const verified = jwt.verify(token, 'secretKey');
//     req.user = verified;  // Attach the decoded token payload (user) to req.user
//     next();  // Continue to the next middleware or route
//   } catch (error) {
//     res.status(400).send('Invalid token.');
//   }
// };





const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
  // Safely extract the Authorization header
  const authHeader = req.header('Authorization');

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access denied. No token provided.');
  }

  // Extract token by removing 'Bearer '
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, 'secretKey');
    
    // Decode the token (you can do this before or after verification)
    const decoded = jwt.decode(token);
    req.user = decoded;  // Attach the decoded token payload (user) to req.user
    next();  // Continue to the next middleware or route
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
