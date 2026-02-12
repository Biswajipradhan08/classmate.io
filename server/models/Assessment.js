const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['mbti', 'aptitude', 'comprehensive'],
        required: true
    },
    version: { type: String, default: '2.0' },
    completedAt: { type: Date, default: Date.now },

    // Raw Answers (flexible structure)
    answers: { type: Map, of: String },

    // Calculated Scores
    scores: {
        // MBTI Dimensions
        E: Number, I: Number,
        S: Number, N: Number,
        T: Number, F: Number,
        J: Number, P: Number,

        // Aptitude Dimensions
        logical: Number,
        verbal: Number,
        numerical: Number,
        spatial: Number,
        technical: Number,

        // Behavioral
        leadership: Number,
        interpersonal: Number,
        organizational: Number,
        entrepreneurial: Number
    },

    // AI Generated Report
    report: {
        personalityType: String, // e.g., 'INTJ', 'Creative Innovator'
        summary: String,
        strengths: [String],
        weaknesses: [String],
        careerPath: [String],
        growthPlan: String
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
