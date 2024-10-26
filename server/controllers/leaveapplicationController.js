// // const LeaveApplication = require('../models/Leaveapplication');
// // const User = require('../models/User'); // Assuming you have a User model to get the user's role

// // // Create Leave Application
// // const createLeaveApplication = async (req, res) => {
// //     const { title, content, leaveStartDate, leaveEndDate } = req.body;
// //     const userId = req.user.id; // Get the authenticated user's ID

// //     try {
// //         // Fetch user details to check the role
// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         // Ensure that the user is a teacher
// //         if (user.role !== 'teacher') {
// //             return res.status(403).json({ message: 'Only teachers can create leave applications' });
// //         }

// //         // Create a leave application with the user's ID as the staffId
// //         const leaveApplication = new LeaveApplication({
// //             staffId: userId, // Set staffId from the authenticated user's ID
// //             title,
// //             content,
// //             leaveStartDate,
// //             leaveEndDate,
// //         });

// //         await leaveApplication.save();
// //         res.status(201).json({ message: 'Leave application created successfully', leaveApplication });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // };

// // // Get Leave Applications for a Staff Member
// // const getLeaveApplications = async (req, res) => {
// //     const { staffId } = req.params;

// //     try {
// //         const leaveApplications = await LeaveApplication.find({ staffId }).populate('staffId', 'name email');
        
// //         res.status(200).json(leaveApplications);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // };

// // // Export the controller functions
// // module.exports = {
// //     createLeaveApplication,
// //     getLeaveApplications,
// // };




// const LeaveApplication = require('../models/Leaveapplication');
// const User = require('../models/User'); // Assuming you have a User model to get the user's role

// // Create Leave Application
// const createLeaveApplication = async (req, res) => {
//     const { title, content, leaveStartDate, leaveEndDate } = req.body;
//     const userId = req.user.id; // Get the authenticated user's ID

//     try {
//         // Fetch user details to check the role
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Ensure that the user is a teacher
//         if (user.role !== 'teacher') {
//             return res.status(403).json({ message: 'Only teachers can create leave applications' });
//         }

//         // Create a leave application with the user's ID as the staffId
//         const leaveApplication = new LeaveApplication({
//             staffId: userId, // Set staffId from the authenticated user's ID
//             title,
//             content,
//             leaveStartDate,
//             leaveEndDate,
//         });

//         await leaveApplication.save();
//         res.status(201).json({ message: 'Leave application created successfully', leaveApplication });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Get Leave Applications for a Specific Staff Member
// const getLeaveApplications = async (req, res) => {
//     const { staffId } = req.params;

//     try {
//         const leaveApplications = await LeaveApplication.find({ staffId }).populate('staffId', 'name email');
//         res.status(200).json(leaveApplications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Get All Leave Applications (for HOD or Admin)
// const getAllLeaveApplications = async (req, res) => {
//     try {
//         // Find all leave applications and populate staff details (name and email)
//         const leaveApplications = await LeaveApplication.find().populate('staffId', 'name email');

//         res.status(200).json(leaveApplications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Export the controller functions
// module.exports = {
//     createLeaveApplication,
//     getLeaveApplications,
//     getAllLeaveApplications, // Export the new function
// };




const LeaveApplication = require('../models/Leaveapplication');
const User = require('../models/User'); // Assuming you have a User model to get the user's role

// Create Leave Application
const createLeaveApplication = async (req, res) => {
    const { title, content, leaveStartDate, leaveEndDate } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        // Fetch user details to check the role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure that the user is a teacher
        if (user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can create leave applications' });
        }

        // Create a leave application with the user's ID as the staffId
        const leaveApplication = new LeaveApplication({
            staffId: userId, // Set staffId from the authenticated user's ID
            title,
            content,
            leaveStartDate,
            leaveEndDate,
        });

        await leaveApplication.save();
        res.status(201).json({ message: 'Leave application created successfully', leaveApplication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Leave Applications for a Specific Staff Member
const getLeaveApplications = async (req, res) => {
    const { staffId } = req.params;

    try {
        const leaveApplications = await LeaveApplication.find({ staffId }).populate('staffId', 'name email');
        res.status(200).json(leaveApplications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Leave Applications (for HOD or Admin)
const getAllLeaveApplications = async (req, res) => {
    try {
        // Find all leave applications and populate staff details (name and email)
        const leaveApplications = await LeaveApplication.find().populate('staffId', 'name email');
        res.status(200).json(leaveApplications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Leave Application Status
const updateLeaveApplicationStatus = async (req, res) => {
    const { id } = req.params; // Leave application ID from the request parameters
    const { status } = req.body; // New status from the request body

    // Validate the status
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        // Find the leave application by ID
        const leaveApplication = await LeaveApplication.findById(id);
        if (!leaveApplication) {
            return res.status(404).json({ message: 'Leave application not found' });
        }

        // Update the status
        leaveApplication.status = status;
        await leaveApplication.save();

        res.status(200).json({ message: 'Leave application status updated successfully', leaveApplication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateApplicationStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const leaveApplication = await LeaveApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!leaveApplication) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.json({ message: 'Application updated', leaveApplication });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Export the controller functions
module.exports = {
    createLeaveApplication,
    getLeaveApplications,
    getAllLeaveApplications,
    updateLeaveApplicationStatus, // Export the new function
};
