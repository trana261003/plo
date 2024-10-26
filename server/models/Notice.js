const mongoose = require('mongoose');

// Define the notice schema
const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the notice
    content: { type: String, required: true }, // Content of the notice
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the notice was created
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the HOD who issued the notice
    // Optional: you can add fields for 'teachers' if you want to track which teachers received the notice
});

// Create and export the Notice model
module.exports = mongoose.model('Notice', noticeSchema);
