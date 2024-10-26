const Notice = require('../models/Notice'); 

exports.createNotice = async (req, res) => {
    try {
        const { title, content, issuedBy } = req.body;

        const newNotice = new Notice({
            title,
            content,
            issuedBy
        });

        await newNotice.save(); // Save the notice to the database
        res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ message: 'Error creating notice', error });
    }
};



// Fetch all notices
exports.getAllNotices = async (req, res) => {
    try {
        // Fetch all notices from the database
        const notices = await Notice.find().populate('issuedBy', 'name email'); // Optionally populate issuedBy field for more details
        
        res.status(200).json({ message: 'Notices fetched successfully', notices });
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Error fetching notices', error });
    }
};