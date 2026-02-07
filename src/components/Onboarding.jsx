import React, { useState, useEffect, useRef } from 'react';
import ttsService from '../services/ttsService';

const Onboarding = ({ onClose, onComplete, userName = "friend" }) => {
    const [onboardingPhase, setOnboardingPhase] = useState('buddy-selection'); // 'buddy-selection' | 'commitment' | 'questions'
    const [selectedBuddy, setSelectedBuddy] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const recognitionRef = useRef(null);

    // Voice Buddy options - with real Indian names
    const buddies = [
        {
            name: 'Isha',
            personality: 'Warm & Supportive Mentor',
            description: 'A compassionate guide who listens and understands your journey',
            color: '#a142f4',
            avatar: '👩🏾‍🦱',
            age: '28'
        },
        {
            name: 'Elina',
            personality: 'Energetic & Motivating Coach',
            description: 'Your enthusiastic cheerleader who brings energy to every conversation',
            color: '#ea4335',
            avatar: '👩🏽',
            age: '26'
        },
        {
            name: 'Amrita',
            personality: 'Intuitive & Empathetic Guide',
            description: 'A thoughtful companion who truly gets what you\'re going through',
            color: '#fbbc04',
            avatar: '👩🏾',
            age: '29'
        },
        {
            name: 'Ashu',
            personality: 'Casual & Friendly Buddy',
            description: 'Your cool friend who makes everything fun and relatable',
            color: '#4285f4',
            avatar: '👨🏾',
            age: '27'
        },
        {
            name: 'Adi',
            personality: 'Confident & Analytical Mentor',
            description: 'A sharp guide who helps you think through everything clearly',
            color: '#34a853',
            avatar: '👨🏽',
            age: '28'
        },
        {
            name: 'Cliford',
            personality: 'Wise & Thoughtful Counselor',
            description: 'A reflective presence who brings depth and wisdom to your growth',
            color: '#5f6368',
            avatar: '🧔🏾‍♂️',
            age: '30'
        }
    ];

    // Extensive casual conversational questions
    const questions = [
        { id: 'location', text: `Hey ${userName}! Where are you calling home these days?`, placeholder: "Your city or town...", theme: 'blue' },
        { id: 'currentLife', text: "So what's your vibe right now? Student, working, building something on your own?", placeholder: "Tell me what you're up to...", theme: 'green' },
        { id: 'passionActivity', text: "Hey, what do you love to do passionately when you get some time from your work?", placeholder: "Share your passion...", theme: 'yellow' },
        { id: 'morningRoutine', text: "What's the first thing you do when you wake up?", placeholder: "Your morning ritual...", theme: 'red' },
        { id: 'gender', text: "Just so I know you better - how do you identify?", placeholder: "Your answer...", theme: 'purple' },
        { id: 'studyField', text: "What field gets you excited to learn more about?", placeholder: "Your favorite subject area...", theme: 'blue' },
        { id: 'socialStyle', text: "Are you the type who loves hanging with a bunch of friends or do you prefer your own space?", placeholder: "Your social vibe...", theme: 'green' },
        { id: 'inspiration', text: "Who's someone you look up to? Could be anyone - family, celebrity, historical figure...", placeholder: "Your inspiration...", theme: 'yellow' },
        { id: 'musicVibe', text: "What kind of music do you vibe with?", placeholder: "Your music taste...", theme: 'red' },
        { id: 'weekendPlan', text: "What's your ideal weekend look like?", placeholder: "Dream weekend...", theme: 'purple' },
        { id: 'learningStyle', text: "How do you learn best? Reading, watching videos, hands-on, or chatting with people?", placeholder: "Your learning style...", theme: 'blue' },
        { id: 'dreamJob', text: "If money wasn't a thing, what would you be doing with your time?", placeholder: "Your dream...", theme: 'green' },
        { id: 'strength', text: "What's something you're naturally good at?", placeholder: "Your strength...", theme: 'yellow' },
        { id: 'challenge', text: "What's something you find challenging but want to get better at?", placeholder: "Your growth area...", theme: 'red' },
        { id: 'motivation', text: "What gets you out of bed in the morning? Like, what really drives you?", placeholder: "Your motivation...", theme: 'purple' },
        { id: 'books', text: "Do you read for fun? If yes, what kind of stuff?", placeholder: "Your reading vibe...", theme: 'blue' },
        { id: 'proudMoment', text: "Tell me about a moment you felt genuinely proud of yourself", placeholder: "Your proud moment...", theme: 'green' },
        { id: 'stressRelief', text: "When life gets crazy, what helps you chill out?", placeholder: "Your calm zone...", theme: 'yellow' },
        { id: 'values', text: "What's one value or principle you won't compromise on?", placeholder: "Your core value...", theme: 'red' },
        { id: 'futureGoal', text: "Where do you see yourself in 5 years? Dream big!", placeholder: "Your vision...", theme: 'purple' },
        { id: 'friendshipQuality', text: "What do you value most in a friendship?", placeholder: "What matters to you...", theme: 'blue' },
        { id: 'creativeSide', text: "Do you consider yourself creative? What's your creative outlet?", placeholder: "Your creative side...", theme: 'green' },
        { id: 'toughTime', text: "What's a tough experience that taught you something valuable?", placeholder: "If you're comfortable sharing...", theme: 'yellow' },
        { id: 'changeEducation', text: "If you could change one thing about how education works, what would it be?", placeholder: "Your idea...", theme: 'red' },
        { id: 'nickname', text: "And what do your close friends call you? Any special nickname?", placeholder: "Your nickname...", theme: 'purple' }
    ];

    const currentQ = questions[currentQuestion];
    const progress = onboardingPhase === 'questions' ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    // Google-inspired theme colors
    const themeColors = {
        blue: '#4285f4',
        green: '#34a853',
        yellow: '#fbbc04',
        red: '#ea4335',
        purple: '#a142f4'
    };

    const currentThemeColor = onboardingPhase === 'questions'
        ? themeColors[currentQ?.theme]
        : selectedBuddy?.color || '#4285f4';

    useEffect(() => {
        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                setIsListening(false);
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    useEffect(() => {
        // Auto-speak question or commitment message
        if (onboardingPhase === 'commitment' && selectedBuddy) {
            const commitmentMessage = `Hey ${userName}, I'm ${selectedBuddy.name}! I'll be your guide through this journey. Before we start, can you commit to sharing your authentic self with me? Answer with your honest thoughts and feelings - that's what makes our connection real.`;
            speak(commitmentMessage, selectedBuddy);
        } else if (onboardingPhase === 'questions' && currentQ) {
            speak(currentQ.text, selectedBuddy);
        }

        // Animation trigger
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timer);
    }, [onboardingPhase, currentQuestion]);

    /**
     * Enhanced speak function with auto-emotion detection
     * Like Google Assistant and Copilot - intelligently detects emotion from context
     */
    const speak = async (text, buddy = null) => {
        if (!buddy) {
            console.warn('No buddy selected for speech');
            return;
        }

        try {
            setIsSpeaking(true);

            // Auto-detect emotion from text content (like major assistants do)
            await ttsService.speak(text, buddy, 'auto', {
                onStart: () => setIsSpeaking(true),
                onEnd: () => setIsSpeaking(false),
                onError: (error) => {
                    console.error('TTS Error:', error);
                    setIsSpeaking(false);
                }
            });
        } catch (error) {
            console.error('Speech synthesis error:', error);
            setIsSpeaking(false);
        }
    };

    const handleBuddySelect = (buddy) => {
        setSelectedBuddy(buddy);
        speak(`Hi ${userName}! I'm ${buddy.name}. ${buddy.description}. Let's get to know each other!`, buddy);

        setTimeout(() => {
            setOnboardingPhase('commitment');
        }, 4000);
    };

    const handleCommitment = () => {
        speak(`Awesome! Let's begin this journey together, ${userName}!`, selectedBuddy);
        setTimeout(() => {
            setOnboardingPhase('questions');
        }, 3000);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleNext = () => {
        if (transcript.trim()) {
            setAnswers({ ...answers, [currentQ.id]: transcript });
            setTranscript('');

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                // Complete onboarding
                console.log('Onboarding Complete:', { buddy: selectedBuddy.name, ...answers });

                // Pass data to completion screen
                if (onComplete) {
                    onComplete({ buddy: selectedBuddy, answers: { ...answers, [currentQ.id]: transcript } });
                } else if (onClose) {
                    onClose();
                }
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && transcript.trim()) {
            e.preventDefault();
            handleNext();
        }
    };

    // Styles
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        zIndex: 5000,
        overflow: 'hidden',
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    };

    const contentStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        zIndex: 2,
    };

    // Buddy Selection Styles
    const buddyGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '1100px',
        width: '100%',
        marginTop: '3rem',
        transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
        opacity: isAnimating ? 0 : 1,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };

    const buddyCardStyle = (buddy) => ({
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '24px',
        border: `3px solid ${buddy.color}20`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    });

    // Commitment Screen Styles
    const commitmentCardStyle = {
        maxWidth: '700px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '4rem',
        borderRadius: '32px',
        textAlign: 'center',
        boxShadow: `0 20px 60px ${currentThemeColor}20`,
        border: `3px solid ${currentThemeColor}30`,
        transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
        opacity: isAnimating ? 0 : 1,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };

    // Question Styles
    const questionCardStyle = {
        maxWidth: '700px',
        width: '100%',
        transform: isAnimating ? 'translateY(30px)' : 'translateY(0)',
        opacity: isAnimating ? 0 : 1,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };

    const questionTextStyle = {
        fontSize: '2.5rem',
        fontWeight: '400',
        color: '#202124',
        lineHeight: '1.4',
        marginBottom: '3rem',
        textAlign: 'center',
        letterSpacing: '-0.5px',
    };

    const textareaStyle = {
        width: '100%',
        minHeight: '120px',
        padding: '1.5rem 2rem',
        fontSize: '1.3rem',
        fontWeight: '400',
        color: '#3c4043',
        backgroundColor: '#f8f9fa',
        border: `2px solid ${isSpeaking ? currentThemeColor : '#e8eaed'}`,
        borderRadius: '12px',
        outline: 'none',
        resize: 'none',
        fontFamily: 'inherit',
        transition: 'all 0.3s ease',
        boxShadow: isSpeaking ? `0 0 0 4px ${currentThemeColor}15` : 'none',
    };

    const buttonStyle = (enabled = true, color = currentThemeColor) => ({
        padding: '1.2rem 3.5rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: color,
        border: 'none',
        borderRadius: '24px',
        cursor: enabled ? 'pointer' : 'not-allowed',
        opacity: enabled ? 1 : 0.4,
        transition: 'all 0.2s ease',
        textTransform: 'none',
        letterSpacing: '0.5px',
    });

    const micButtonStyle = {
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: isListening ? currentThemeColor : '#f8f9fa',
        border: `3px solid ${isListening ? currentThemeColor : '#e8eaed'}`,
        color: isListening ? '#ffffff' : currentThemeColor,
        fontSize: '1.8rem',
        display: onboardingPhase === 'questions' ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isListening ? `0 0 0 8px ${currentThemeColor}20, 0 8px 16px rgba(0,0,0,0.15)` : '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 10,
        transform: isListening ? 'scale(1.1)' : 'scale(1)',
    };

    const progressMeterStyle = {
        position: 'fixed',
        top: '2.5rem',
        right: '2.5rem',
        width: '80px',
        height: '80px',
        zIndex: 10,
        display: onboardingPhase === 'questions' ? 'block' : 'none',
    };

    return (
        <div style={containerStyle}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600&display=swap');
                
                @keyframes cosmicMove {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(120deg); }
                    66% { transform: translate(-20px, 20px) rotate(240deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); opacity: 0.7; }
                    50% { transform: translateY(-40px); opacity: 1; }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                
                @keyframes nebulaPulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
                
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .cosmic-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, 
                        ${currentThemeColor}08 0%, 
                        #ffffff 20%,
                        ${currentThemeColor}05 40%,
                        #f8f9fa 60%,
                        ${currentThemeColor}10 80%,
                        #ffffff 100%);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                    transition: all 1.5s ease;
                }
                
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: cosmicMove 20s infinite ease-in-out;
                    will-change: transform;
                }
                
                .star {
                    position: absolute;
                    background: ${currentThemeColor};
                    border-radius: 50%;
                    animation: twinkle 3s infinite ease-in-out;
                    pointer-events: none;
                }
                
                .nebula {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(40px);
                    animation: nebulaPulse 8s infinite ease-in-out;
                    pointer-events: none;
                }

                .buddy-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
                }
            `}</style>

            {/* Constantly Moving Cosmic Background */}
            <div className="cosmic-bg" />

            {/* Multi-layered nebula effects */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`nebula-${i}`}
                    className="nebula"
                    style={{
                        width: `${200 + i * 100}px`,
                        height: `${200 + i * 100}px`,
                        background: `radial-gradient(circle, ${currentThemeColor}30 0%, transparent 70%)`,
                        left: `${10 + i * 20}%`,
                        top: `${10 + i * 15}%`,
                        animationDelay: `${i * 1.5}s`,
                        animationDuration: `${8 + i * 2}s`,
                    }}
                />
            ))}

            {/* Starfield effect */}
            {[...Array(50)].map((_, i) => (
                <div
                    key={`star-${i}`}
                    className="star"
                    style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                />
            ))}

            {/* Multi-layered floating particles */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={`particle-${i}`}
                    className="particle"
                    style={{
                        width: `${Math.random() * 80 + 30}px`,
                        height: `${Math.random() * 80 + 30}px`,
                        background: `radial-gradient(circle, ${currentThemeColor}${Math.floor(Math.random() * 30 + 20).toString(16)} 0%, transparent 70%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 20}s`,
                        animationDuration: `${15 + Math.random() * 15}s`,
                    }}
                />
            ))}

            {/* Main Content */}
            <div style={contentStyle}>
                {/* Buddy Selection Phase */}
                {onboardingPhase === 'buddy-selection' && (
                    <>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: '400',
                            color: '#202124',
                            marginBottom: '1rem',
                            textAlign: 'center',
                        }}>
                            Choose Your Voice Buddy
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#5f6368',
                            marginBottom: '2rem',
                            textAlign: 'center',
                        }}>
                            Select an AI companion to guide you through your journey
                        </p>

                        <div style={buddyGridStyle}>
                            {buddies.map((buddy) => (
                                <div
                                    key={buddy.name}
                                    className="buddy-card"
                                    style={buddyCardStyle(buddy)}
                                    onClick={() => handleBuddySelect(buddy)}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        backgroundColor: `${buddy.color}20`,
                                        margin: '0 auto 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                    }}>
                                        {buddy.avatar}
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '600',
                                        color: buddy.color,
                                        marginBottom: '0.5rem',
                                    }}>
                                        {buddy.name}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#5f6368',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem',
                                    }}>
                                        {buddy.personality}
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#80868b',
                                        lineHeight: '1.4',
                                    }}>
                                        {buddy.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Commitment Phase */}
                {onboardingPhase === 'commitment' && selectedBuddy && (
                    <div style={commitmentCardStyle}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: `${selectedBuddy.color}20`,
                            margin: '0 auto 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                        }}>
                            {selectedBuddy.avatar}
                        </div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '400',
                            color: '#202124',
                            marginBottom: '2rem',
                        }}>
                            Hey {userName}, I'm {selectedBuddy.name}!
                        </h2>

                        <p style={{
                            fontSize: '1.3rem',
                            color: '#5f6368',
                            lineHeight: '1.6',
                            marginBottom: '3rem',
                        }}>
                            I'll be your guide through this journey. Before we start, can you commit to sharing your <strong>authentic self</strong> with me? Answer with your honest thoughts and feelings - that's what makes our connection real.
                        </p>

                        <button
                            style={buttonStyle(true, selectedBuddy.color)}
                            onClick={handleCommitment}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = `0 6px 20px ${selectedBuddy.color}40`;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            I Commit to Being Authentic 🤝
                        </button>
                    </div>
                )}

                {/* Questions Phase */}
                {onboardingPhase === 'questions' && currentQ && (
                    <div style={questionCardStyle}>
                        <h2 style={questionTextStyle}>
                            {currentQ.text}
                        </h2>

                        <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
                            <textarea
                                style={textareaStyle}
                                placeholder={currentQ.placeholder}
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={(e) => e.target.style.border = `2px solid ${currentThemeColor}`}
                                onBlur={(e) => e.target.style.border = '2px solid #e8eaed'}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                style={buttonStyle(transcript.trim())}
                                onClick={handleNext}
                                disabled={!transcript.trim()}
                                onMouseEnter={(e) => {
                                    if (transcript.trim()) {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = `0 6px 20px ${currentThemeColor}40`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                {currentQuestion < questions.length - 1 ? 'Continue' : 'Finish'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mic Button - Only in Questions Phase */}
            {onboardingPhase === 'questions' && (
                <button
                    style={micButtonStyle}
                    onClick={toggleListening}
                    onMouseEnter={(e) => {
                        if (!isListening) {
                            e.target.style.backgroundColor = `${currentThemeColor}10`;
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isListening) {
                            e.target.style.backgroundColor = '#f8f9fa';
                        }
                    }}
                >
                    {isListening ? '⏹' : '🎤'}
                </button>
            )}

            {/* Circular Progress Meter - Only in Questions Phase */}
            {onboardingPhase === 'questions' && (
                <div style={progressMeterStyle}>
                    <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#e8eaed"
                            strokeWidth="6"
                            fill="none"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke={currentThemeColor}
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 35}`}
                            strokeDashoffset={`${2 * Math.PI * 35 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.6s ease' }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: currentThemeColor,
                        transition: 'color 0.6s ease',
                    }}>
                        {Math.round(progress)}%
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
