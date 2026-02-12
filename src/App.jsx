import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import OnboardingCompletion from './components/OnboardingCompletion';
import Dashboard from './components/Dashboard';
import AssessmentHub from './components/AssessmentHub';
import CounselorBooking from './components/CounselorBooking';
import VoiceAgent from './components/VoiceAgent';
import './index.css';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showCounselor, setShowCounselor] = useState(false);
  const [onboardingData, setOnboardingData] = useState(null);
  const [userName, setUserName] = useState('friend');
  const [assessmentResults, setAssessmentResults] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/current_user');
        if (response.ok) {
          const user = await response.json();
          if (user) {
            setIsAuthenticated(true);
            setUserName(user.displayName || 'friend');
            setCurrentUser(user);

            // Still check localStorage for onboarding status as that might be local only for MVP
            const storedOnboarding = localStorage.getItem('classmate_onboarding');
            if (storedOnboarding) {
              const onboardingInfo = JSON.parse(storedOnboarding);
              setOnboardingData(onboardingInfo);
              setHasCompletedOnboarding(true);
              setShowDashboard(true);
            } else {
              // If logged in but no onboarding data, show onboarding
              setShowOnboarding(true);
            }
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };

    checkSession();

    // Fallback to local storage if API fails or for continuity
    const storedUser = localStorage.getItem('classmate_user');
    const storedOnboarding = localStorage.getItem('classmate_onboarding');
    const storedAssessments = localStorage.getItem('classmate_assessments');

    if (storedUser && storedOnboarding && !isAuthenticated) {
      try {
        const userData = JSON.parse(storedUser);
        const onboardingInfo = JSON.parse(storedOnboarding);

        setIsAuthenticated(true);
        setHasCompletedOnboarding(true);
        setUserName(userData.name || 'friend');
        setOnboardingData(onboardingInfo);
        setShowDashboard(true);
        setCurrentUser(userData); // Ensure currentUser is set from local storage as well

        if (storedAssessments) {
          setAssessmentResults(JSON.parse(storedAssessments));
        }
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    console.log('Auth Success:', userData);
    setIsAuthenticated(true);
    setUserName(userData.name || 'friend');
    setCurrentUser(userData);

    // Save user data to localStorage
    localStorage.setItem('classmate_user', JSON.stringify(userData));

    setIsAuthOpen(false);

    // Check if user has already completed onboarding
    const storedOnboarding = localStorage.getItem('classmate_onboarding');
    if (storedOnboarding) {
      try {
        const onboardingInfo = JSON.parse(storedOnboarding);
        setOnboardingData(onboardingInfo);
        setHasCompletedOnboarding(true);
        setShowDashboard(true);
        console.log('Existing user - going to dashboard');
      } catch (error) {
        console.error('Error loading onboarding:', error);
        setShowOnboarding(true);
      }
    } else {
      // New user - show onboarding
      setShowOnboarding(true);
      console.log('New user - showing onboarding');
    }
  };

  const handleOnboardingComplete = (data) => {
    console.log('Onboarding complete with data:', data);
    setOnboardingData(data);
    setHasCompletedOnboarding(true);

    // Save onboarding data to localStorage
    localStorage.setItem('classmate_onboarding', JSON.stringify(data));

    setShowOnboarding(false);
    setShowCompletion(true);
  };

  const handleContinueToDashboard = () => {
    setShowCompletion(false);
    setShowDashboard(true);
  };

  const handleNavigate = (destination, subtype) => {
    if (destination === 'assessment') {
      setShowDashboard(false);
      setShowAssessment(true);
    } else if (destination === 'counselor') {
      setShowDashboard(false);
      setShowCounselor(true);
    }
  };

  const handleAssessmentComplete = async (results) => {
    console.log('Assessment completed:', results);
    const updatedResults = { ...assessmentResults, [results.assessment]: results };
    setAssessmentResults(updatedResults);

    // Save assessment results to localStorage
    localStorage.setItem('classmate_assessments', JSON.stringify(updatedResults));

    // Save to Backend if logged in
    if (currentUser) {
      try {
        // Dynamic import to avoid build issues if axios isn't fully ready yet, though it should be.
        // Or just use fetch
        await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser._id || currentUser.googleId || 'guest',
            type: results.assessment,
            scores: results.scores || results.categoryScores || { score: results.flexibilityScore },
            report: results.report || {}
          })
        });
      } catch (error) {
        console.error('Failed to save assessment to backend:', error);
      }
    }

    setShowAssessment(false);
    setShowDashboard(true);
  };

  const handleBackToDashboard = () => {
    setShowAssessment(false);
    setShowCounselor(false);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('classmate_user');
    localStorage.removeItem('classmate_onboarding');
    localStorage.removeItem('classmate_assessments');

    // Reset state
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setShowDashboard(false);
    setShowAssessment(false);
    setShowCounselor(false);
    setOnboardingData(null);
    setUserName('friend');
    setAssessmentResults({});
  };

  return (
    <div className="app">
      {!showDashboard && !showAssessment && !showCounselor && (
        <>
          <Navbar onOpenAuth={openAuth} />
          <main>
            <Hero onGetStarted={() => openAuth('signup')} />
            <Problem />
            <Features />
            <Pricing />
          </main>
          <Footer />
        </>
      )}

      {/* Voice Agent */}
      {(isAuthenticated || showOnboarding) && (
        <VoiceAgent buddy={onboardingData?.buddy} />
      )}

      <Auth
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {showOnboarding && (
        <Onboarding
          onClose={() => setShowOnboarding(false)}
          onComplete={handleOnboardingComplete}
          userName={userName}
        />
      )}

      {showCompletion && onboardingData && (
        <OnboardingCompletion
          buddy={onboardingData.buddy}
          userName={userName}
          onContinue={handleContinueToDashboard}
        />
      )}

      {showDashboard && onboardingData && (
        <Dashboard
          buddy={onboardingData.buddy}
          userName={userName}
          userAnswers={onboardingData.answers}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      {showAssessment && (
        <AssessmentHub
          buddy={onboardingData?.buddy}
          userName={userName}
          currentUser={currentUser}
          onComplete={handleAssessmentComplete}
          onBack={handleBackToDashboard}
        />
      )}

      {showCounselor && (
        <CounselorBooking
          buddy={onboardingData?.buddy}
          userName={userName}
          currentUser={currentUser}
          assessmentResults={assessmentResults}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
