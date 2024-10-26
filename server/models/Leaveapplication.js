// const mongoose = require('mongoose');

// const leaveapplicationSchema = new mongoose.Schema({
//     staffId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User', // Reference to the Staff model
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     leaveStartDate: {
//         type: Date,
//         required: true,
//     },
//     leaveEndDate: {
//         type: Date,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Leaveapplication', leaveapplicationSchema);











const mongoose = require('mongoose');

const leaveapplicationSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the Staff model
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    leaveStartDate: {
        type: Date,
        required: true,
    },
    leaveEndDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'], // Define possible statuses
        default: 'Pending', // Default status
    },
});

module.exports = mongoose.model('Leaveapplication', leaveapplicationSchema);
