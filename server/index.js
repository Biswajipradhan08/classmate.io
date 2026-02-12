require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieSession = require('express-session'); // Using express-session for simplicity
const passport = require('passport');

require('./models/User');
require('./models/Assessment');
require('./config/passport'); // Load passport config

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174', // Frontend URL
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Session Config
app.use(cookieSession({
    secret: 'classmate_secret_key_change_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: false // Set to true in production with https
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
// Using the provided Data API Key effectively means we might use the HTTP interface
// However, typically Mongoose uses a URI.
// If the user meant "MongoDB Data API" literally, we'd use axios.
// I'll assume standard connection for Mongoose is preferred if possible, 
// using a placeholder URI logic.
// If strictly Data API key, we should switch Mongoose for direct API calls.
// For likely "Standard" approach, assuming MONGODB_URI exists or will be provided.

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/classmate'; // Fallback
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/assessments', require('./routes/assessmentRoute'));
app.use('/api/payments', require('./routes/paymentRoute'));
app.use('/api/voice', require('./routes/voiceRoute'));

app.get('/', (req, res) => {
    res.send('Classmate.io Backend Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
