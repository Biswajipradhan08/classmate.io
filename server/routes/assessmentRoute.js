const router = require('express').Router();
const Assessment = require('../models/Assessment');

// Save Assessment Result
router.post('/', async (req, res) => {
    try {
        const { userId, type, scores, report } = req.body;

        // If no userId (guest), we might just return the analyzed result without saving
        // But for now, let's assume we save it if a user is logged in

        const newAssessment = new Assessment({
            userId: userId || 'guest', // specific logic for guest handling needed
            type,
            scores,
            report,
            timestamp: new Date()
        });

        const savedAssessment = await newAssessment.save();
        res.status(201).json(savedAssessment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Assessments
router.get('/:userId', async (req, res) => {
    try {
        const assessments = await Assessment.find({ userId: req.params.userId }).sort({ timestamp: -1 });
        res.json(assessments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
