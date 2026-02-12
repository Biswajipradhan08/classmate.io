# Classmate.io - AI-Powered Learning Platform

![Classmate.io](https://img.shields.io/badge/Status-Operational-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Connected-brightgreen)

## 🚀 Overview

Classmate.io is an advanced AI-powered learning platform featuring:
- **Google OAuth 2.0 Authentication** (enhanced demo mode)
- **61-Question MBTI Personality Assessment**
- **50+ Question Aptitude Test** (10 sub-attributes)
- **Advanced Voice AI** with emotion-based modulation
- **Cashfree Payment Gateway** for counselor bookings
- **Gemini AI** report generation
- **Real-time Voice Agents** (Luna, Nova, Atlas, Sage, Spark)

## ✨ Features

### Assessment System
- MBTI: 61 questions measuring E/I, S/N, T/F, J/P
- Aptitude: Logical Reasoning, Verbal, Numerical, Creative, Spatial, Interpersonal, Technical, Organizational, Entrepreneurial, Physical
- Cognitive Analysis: 40 questions
- Behavioral Flexibility: 30 questions

### Voice AI
- **Enhanced TTS**: Gender-based voice selection
- **9 Emotion Presets**: Happy, Excited, Calm, Sad, Angry, Surprised, Neutral, Encouraging, Thoughtful
- **Prosody Modulation**: Pitch (0.85-1.30), Rate (0.85-1.20), Volume (0.80-1.00)
- **Avatar Mapping**: Female (Luna, Nova), Male (Atlas, Sage, Spark)

### Authentication
- Functional signup with unique ID generation
- Signin with any credentials (demo mode)
- Real session persistence via MongoDB
- Google OAuth integration (requires API keys)

### Payments
- Cashfree UPI integration
- Counselor booking system
- Order creation and verification

## 🏗️ Tech Stack

**Frontend**:
- React 18.3 + Vite
- Vanilla CSS with glassmorphism
- Web Speech API for voice

**Backend**:
- Node.js + Express
- Passport.js for OAuth
- Mongoose for MongoDB
- Axios for API calls

**Services**:
- MongoDB Atlas
- Cashfree Payments
- Google Cloud TTS (optional)
- Google Gemini AI (optional)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)

### Clone Repository
```bash
git clone https://github.com/Biswajipradhan08/classmate.io.git
cd classmate.io
```

### Install Dependencies
```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### Environment Configuration
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/classmate
MONGODB_API_KEY=your_mongodb_api_key_here
SESSION_SECRET=classmate_super_secret_key_2024

# Cashfree (Add your production keys)
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key

# Optional: Add for full functionality
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_TTS_API_KEY=your_tts_key
GEMINI_API_KEY=your_gemini_key
```

## 🚀 Running Locally

### Start Backend Server
```bash
node server/index.js
# Server runs on http://localhost:5000
```

### Start Frontend
```bash
npm run dev
# App runs on http://localhost:5174
```

## 🌐 Firebase Deployment

### Option 1: Using Firebase CLI
```bash
# Login to Firebase
npx firebase-tools login

# Initialize (if not done)
npx firebase-tools init hosting

# Build and Deploy
npm run build
npx firebase-tools deploy
```

### Option 2: Manual Deployment
1. Run `npm run build`
2. Upload `dist/` folder to Firebase Hosting
3. Configure rewrites for SPA

## 📖 Usage Guide

### 1. Authentication
- Click "Get Started" or "Sign In"
- **Signup**: Fill form, verify mobile/email (demo OTP), create account
- **Signin**: Enter any credentials to auto-create session
- Data persists in MongoDB

### 2. Onboarding
- Answer 25 cosmic questions
- Select AI buddy avatar
- Complete commitment step

### 3. Assessments
Choose from dashboard:
- **MBTI**: 61 questions → get personality type
- **Aptitude**: 50+ questions → get skill profile
- **Cognitive**: 40 questions → get thinking patterns

### 4. Voice Interaction
- Click voice agent button (bottom right)
- Speak or listen to AI buddy
- Voice adapts to avatar gender and emotion

### 5. Counselor Booking
- Browse 5 expert counselors
- Schedule session
- Pay via UPI using Cashfree

## 🔧 Configuration

### Voice Customization
Edit `src/services/VoiceService.js`:
```javascript
getEmotionConfig(emotion) {
  // Adjust pitch, rate, volume
  return { pitch: 1.0, rate: 1.0, volume: 0.9 };
}
```

### Assessment Questions
Edit `src/data/comprehensiveQuestions.js`:
```javascript
export const mbtiQuestions = [ /* 61 questions */ ];
export const aptitudeQuestions = [ /* 50+ questions */ ];
```

## 🧪 Testing

### Test Authentication
1. Open app → Click "Sign In"
2. Enter email: test@example.com, password: anything
3. Verify session created

### Test Voice
1. Complete onboarding → select avatar
2. Dashboard → click voice button
3. Verify gender-matched voice speaks

### Test Payment
1. Complete assessment
2. Navigate to "Find Counselors"
3. Select counselor → Book session
4. Verify Cashfree checkout opens

## 📊 Project Structure

```
Classmate.io/
├── dist/                    # Production build
├── server/
│   ├── config/
│   │   └── passport.js      # OAuth strategy
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Assessment.js    # Assessment schema
│   ├── routes/
│   │   ├── authRoute.js     # /api/auth/*
│   │   ├── assessmentRoute.js
│   │   ├── paymentRoute.js
│   │   └── voiceRoute.js
│   ├── services/
│   │   ├── cashfreeService.js
│   │   └── googleVoiceService.js
│   └── index.js             # Express server
├── src/
│   ├── components/
│   │   ├── Auth.jsx         # Signup/Signin
│   │   ├── AssessmentHub.jsx
│   │   ├── CounselorBooking.jsx
│   │   └── VoiceAgent.jsx
│   ├── services/
│   │   ├── VoiceService.js  # Enhanced TTS
│   │   └── GeminiService.js # AI reports
│   └── data/
│       └── comprehensiveQuestions.js
├── firebase.json            # Firebase config
└── package.json
```

## 🔐 Security

- `.env` files not committed to Git
- Session secret required for production
- Cashfree keys are production-ready
- OAuth requires HTTPS in production

## 📝 API Documentation

### Auth Endpoints
- `POST /api/auth/signup` - Create account (demo)
- `POST /api/auth/signin` - Login (demo)
- `GET /api/auth/google` - OAuth flow
- `GET /api/auth/current_user` - Get session

### Assessment Endpoints
- `POST /api/assessments` - Save results
- `GET /api/assessments/:userId` - Get results

### Payment Endpoints
- `POST /api/payments/create-order` - Create payment
- `POST /api/payments/verify` - Verify payment

### Voice Endpoints
- `POST /api/voice/speak` - Generate TTS audio

## 🎯 Roadmap

- [ ] Add real Google OAuth keys
- [ ] Integrate Google Cloud TTS for HD voices
- [ ] Add Gemini AI for advanced reports
- [ ] Deploy backend to Cloud Run
- [ ] Add more assessment types
- [ ] Implement chat feature

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Developer

**Biswajit Pradhan**  
GitHub: [@Biswajipradhan08](https://github.com/Biswajipradhan08)

## 🆘 Support

For issues or questions:
- Open GitHub issue
- Email: biswajitpradhan@classmate.io

---

**Built with ❤️ using React, Node.js, and AI**
