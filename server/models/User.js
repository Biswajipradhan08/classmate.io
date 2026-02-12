const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    displayName: String,
    avatarUrl: String,

    // Onboarding Data
    buddy: { type: String, default: 'Luna' },
    onboardingCompleted: { type: Boolean, default: false },

    // Auth Metadata
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
