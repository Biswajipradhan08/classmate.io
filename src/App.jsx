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

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('classmate_user');
    const storedOnboarding = localStorage.getItem('classmate_onboarding');
    const storedAssessments = localStorage.getItem('classmate_assessments');

    if (storedUser && storedOnboarding) {
      try {
        const userData = JSON.parse(storedUser);
        const onboardingInfo = JSON.parse(storedOnboarding);

        setIsAuthenticated(true);
        setHasCompletedOnboarding(true);
        setUserName(userData.name || 'friend');
        setOnboardingData(onboardingInfo);
        setShowDashboard(true);

        if (storedAssessments) {
          setAssessmentResults(JSON.parse(storedAssessments));
        }

        console.log('Session restored - going to dashboard');
      } catch (error) {
        console.error('Error restoring session:', error);
        // Clear corrupted data
        localStorage.removeItem('classmate_user');
        localStorage.removeItem('classmate_onboarding');
        localStorage.removeItem('classmate_assessments');
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

  const handleAssessmentComplete = (results) => {
    console.log('Assessment completed:', results);
    const updatedResults = { ...assessmentResults, [results.assessment]: results };
    setAssessmentResults(updatedResults);

    // Save assessment results to localStorage
    localStorage.setItem('classmate_assessments', JSON.stringify(updatedResults));

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
          onComplete={handleAssessmentComplete}
          onBack={handleBackToDashboard}
        />
      )}

      {showCounselor && (
        <CounselorBooking
          buddy={onboardingData?.buddy}
          userName={userName}
          assessmentResults={assessmentResults}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
