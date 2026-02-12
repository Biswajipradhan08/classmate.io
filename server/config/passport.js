const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID') {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user exists
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            // Create new user
            const newUser = await new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                avatarUrl: profile.photos[0].value
            }).save();

            done(null, newUser);
        } catch (err) {
            done(err, null);
        }
    }));
} else {
    console.warn("⚠️ Google OAuth keys are missing or placeholders. Google Strategy skipped.");
}
