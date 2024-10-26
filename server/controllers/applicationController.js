// const Application = require('../models/Application');

// // Create Application
// exports.createApplication = async (req, res) => {
//   try {
//     const { studentId, teacherId, content } = req.body;
//     const application = new Application({ studentId, teacherId, content });
//     await application.save();
//     res.status(201).json({ message: 'Application created', application });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// // Approve/Reject Application
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     res.json({ message: 'Application updated', application });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };






const Application = require('../models/Application');
// const mongoose = require('mongoose');


// Create Application
exports.createApplication = async (req, res) => {
  try {
    const { studentId, teacherId, content } = req.body;
    console.log("Received Application:", { studentId, teacherId, content }); // Log received data

    const application = new Application({ studentId, teacherId, content });
    await application.save();
    res.status(201).json({ message: 'Application created', application });
  } catch (error) {
    console.error("Error creating application:", error.message); // Log error message
    res.status(400).json({ error: error.message });
  }
};


// Approve/Reject Application
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application updated', application });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('studentId teacherId', 'name email'); // Adjust fields as necessary
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    
// Other imports and functions...

// Get Applications by Student ID
exports.getApplicationsByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const applications = await Application.find({ studentId }).populate('teacherId', 'name email'); // Adjust fields as necessary

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this student' });
    }

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error.message); // Log error message
    res.status(500).json({ error: error.message });
  }
};



exports.getUserApplications = async (req, res) => {
  try {
    // Get user ID from request parameters
    const userId = req.params.userId; // Assuming you're passing userId as a URL parameter

    // Fetch applications for the specific user
    const applications = await Application.find({
      $or: [{ studentId: userId }, { teacherId: userId }] // Adjust conditions based on your schema
    }).populate('studentId teacherId', 'name email'); // Adjust fields as necessary

    // If no applications found
    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user.' });
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











