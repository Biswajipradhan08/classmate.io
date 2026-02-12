const router = require('express').Router();
const passport = require('passport');

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed' }),
    (req, res) => {
        // Successful authentication
        // Redirect to frontend dashboard with session established
        res.redirect('http://localhost:5174/dashboard');
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('http://localhost:5174/');
    });
});

// Current User
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
