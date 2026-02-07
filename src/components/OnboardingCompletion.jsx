import React, { useEffect, useRef, useState } from 'react';
import ttsService from '../services/ttsService';

const OnboardingCompletion = ({ buddy, userName = "friend", onContinue }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const completionMessage = `Hey nice to know all about you, you're nice. What you're thinking now? Don't worry I'm with you`;

    useEffect(() => {
        // Auto-speak completion message with emotion
        if (buddy) {
            speak(completionMessage);
        }
    }, [buddy]);

    const speak = async (text) => {
        if (!buddy) {
            console.warn('No buddy selected for speech');
            return;
        }

        try {
            setIsSpeaking(true);

            await ttsService.speak(text, buddy, 'supportive', {
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

    const cardStyle = {
        maxWidth: '700px',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '4rem',
        borderRadius: '32px',
        textAlign: 'center',
        boxShadow: `0 20px 60px ${buddy?.color || '#4285f4'}20`,
        border: `3px solid ${buddy?.color || '#4285f4'}30`,
        animation: 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };

    const buttonStyle = {
        padding: '1.2rem 3.5rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: buddy?.color || '#4285f4',
        border: 'none',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textTransform: 'none',
        letterSpacing: '0.5px',
        marginTop: '2rem',
    };

    return (
        <div style={containerStyle}>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes cosmicMove {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(120deg); }
                    66% { transform: translate(-20px, 20px) rotate(240deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
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
                        ${buddy?.color || '#4285f4'}08 0%, 
                        #ffffff 20%,
                        ${buddy?.color || '#4285f4'}05 40%,
                        #f8f9fa 60%,
                        ${buddy?.color || '#4285f4'}10 80%,
                        #ffffff 100%);
                    background-size: 400% 400%;
                    animation: gradientShift 15s ease infinite;
                }
                
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: cosmicMove 20s infinite ease-in-out;
                }
                
                .star {
                    position: absolute;
                    background: ${buddy?.color || '#4285f4'};
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
            `}</style>

            {/* Cosmic Background */}
            <div className="cosmic-bg" />

            {/* Nebula effects */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`nebula-${i}`}
                    className="nebula"
                    style={{
                        width: `${200 + i * 100}px`,
                        height: `${200 + i * 100}px`,
                        background: `radial-gradient(circle, ${buddy?.color || '#4285f4'}30 0%, transparent 70%)`,
                        left: `${10 + i * 20}%`,
                        top: `${10 + i * 15}%`,
                        animationDelay: `${i * 1.5}s`,
                        animationDuration: `${8 + i * 2}s`,
                    }}
                />
            ))}

            {/* Stars */}
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

            {/* Particles */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={`particle-${i}`}
                    className="particle"
                    style={{
                        width: `${Math.random() * 80 + 30}px`,
                        height: `${Math.random() * 80 + 30}px`,
                        background: `radial-gradient(circle, ${buddy?.color || '#4285f4'}${Math.floor(Math.random() * 30 + 20).toString(16)} 0%, transparent 70%)`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 20}s`,
                        animationDuration: `${15 + Math.random() * 15}s`,
                    }}
                />
            ))}

            {/* Main Content */}
            <div style={contentStyle}>
                <div style={cardStyle}>
                    {/* Buddy Avatar */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: `${buddy?.color || '#4285f4'}20`,
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}>
                        {buddy?.avatar || '✨'}
                    </div>

                    {/* Buddy Name */}
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        color: buddy?.color || '#4285f4',
                        marginBottom: '2rem',
                    }}>
                        {buddy?.name || 'Your Buddy'}
                    </h3>

                    {/* Completion Message */}
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '400',
                        color: '#202124',
                        lineHeight: '1.5',
                        marginBottom: '1rem',
                    }}>
                        Hey {userName}, nice to know all about you, you're nice.
                    </h2>

                    <p style={{
                        fontSize: '1.3rem',
                        color: '#5f6368',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                    }}>
                        What you're thinking now? <strong>Don't worry I'm with you</strong> 💫
                    </p>

                    <div style={{
                        padding: '1.5rem',
                        backgroundColor: `${buddy?.color || '#4285f4'}10`,
                        borderRadius: '16px',
                        marginBottom: '2rem',
                    }}>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#3c4043',
                            margin: 0,
                        }}>
                            Get ready for an exciting journey of career guidance, training sessions, breakthrough activities, and connecting with your peer pool! 🚀
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        style={buttonStyle}
                        onClick={onContinue}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = `0 6px 20px ${buddy?.color || '#4285f4'}40`;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        Let's Go! 🎉
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default OnboardingCompletion;
