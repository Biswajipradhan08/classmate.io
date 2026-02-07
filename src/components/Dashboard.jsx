import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Dashboard = ({ buddy, userName = "friend", userAnswers = {}, onNavigate }) => {
    const [activeSection, setActiveSection] = useState(null);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [assessmentProgress, setAssessmentProgress] = useState({
        mbti: 0,
        cognitive: 0,
        behavioral: 0
    });
    const [assessmentsCompleted, setAssessmentsCompleted] = useState(0);

    // Determine personality type from answers
    const getPersonalityType = () => {
        // Simple personality detection based on keywords in answers
        const allAnswers = Object.values(userAnswers).join(' ').toLowerCase();

        if (allAnswers.includes('creative') || allAnswers.includes('art') || allAnswers.includes('design')) {
            return 'Creative Innovator';
        } else if (allAnswers.includes('lead') || allAnswers.includes('strategic') || allAnswers.includes('manage')) {
            return 'Strategic Leader';
        } else if (allAnswers.includes('people') || allAnswers.includes('community') || allAnswers.includes('help')) {
            return 'Community Builder';
        } else if (allAnswers.includes('tech') || allAnswers.includes('code') || allAnswers.includes('science')) {
            return 'Tech Explorer';
        } else {
            return 'Visionary Entrepreneur';
        }
    };

    const personalityType = getPersonalityType();

    // Peer Pools data
    const peerPools = [
        {
            id: 1,
            name: 'Creative Innovators',
            description: 'For the artists, designers, and creative minds',
            members: 2847,
            color: '#a142f4',
            icon: '🎨',
            recommended: personalityType === 'Creative Innovator'
        },
        {
            id: 2,
            name: 'Strategic Leaders',
            description: 'For the planners, organizers, and future CEOs',
            members: 3521,
            color: '#4285f4',
            icon: '🎯',
            recommended: personalityType === 'Strategic Leader'
        },
        {
            id: 3,
            name: 'Community Builders',
            description: 'For the connectors, helpers, and empathetic souls',
            members: 4129,
            color: '#34a853',
            icon: '🤝',
            recommended: personalityType === 'Community Builder'
        },
        {
            id: 4,
            name: 'Tech Explorers',
            description: 'For the coders, hackers, and tech enthusiasts',
            members: 5234,
            color: '#ea4335',
            icon: '💻',
            recommended: personalityType === 'Tech Explorer'
        },
        {
            id: 5,
            name: 'Visionary Entrepreneurs',
            description: 'For the risk-takers, dreamers, and business builders',
            members: 2963,
            color: '#fbbc04',
            icon: '🚀',
            recommended: personalityType === 'Visionary Entrepreneur'
        }
    ];

    const recommendedPools = peerPools.filter(pool => pool.recommended);
    const otherPools = peerPools.filter(pool => !pool.recommended);

    // Career advice data
    const careerAdvice = [
        { id: 1, title: 'Discover Your Career Path', icon: '🧭', color: '#4285f4' },
        { id: 2, title: 'Industry Insights', icon: '📊', color: '#34a853' },
        { id: 3, title: 'Mentor Connect', icon: '👥', color: '#ea4335' },
        { id: 4, title: 'Skills Assessment', icon: '📈', color: '#fbbc04' }
    ];

    // Training sessions
    const trainingSessions = [
        { id: 1, title: 'Communication Skills', progress: 0, icon: '💬', color: '#4285f4' },
        { id: 2, title: 'Leadership Fundamentals', progress: 0, icon: '👑', color: '#34a853' },
        { id: 3, title: 'Critical Thinking', progress: 0, icon: '🧠', color: '#ea4335' },
        { id: 4, title: 'Time Management', progress: 0, icon: '⏰', color: '#fbbc04' }
    ];

    // Peer polls
    const peerPolls = [
        {
            id: 1,
            question: 'What motivates you most in your career?',
            options: ['Impact', 'Money', 'Recognition', 'Learning'],
            votes: [342, 156, 89, 413],
            voted: false
        },
        {
            id: 2,
            question: 'Preferred learning style?',
            options: ['Video', 'Reading', 'Hands-on', 'Discussion'],
            votes: [523, 234, 445, 298],
            voted: false
        }
    ];

    // Breakthrough activities
    const breakthroughActivities = [
        { id: 1, title: '30-Day Gratitude Challenge', streak: 0, icon: '🙏', color: '#a142f4' },
        { id: 2, title: 'Weekly Reflection Journal', streak: 0, icon: '📝', color: '#4285f4' },
        { id: 3, title: 'Skill-a-Day Learning', streak: 0, icon: '🎓', color: '#34a853' },
        { id: 4, title: 'Comfort Zone Breaker', streak: 0, icon: '💪', color: '#ea4335' }
    ];

    const containerStyle = {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflow: 'auto',
    };

    const heroStyle = {
        background: `linear-gradient(135deg, ${buddy?.color || '#4285f4'}15 0%, #ffffff 100%)`,
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
    };

    const contentStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
    };

    const sectionGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
    };

    const cardStyle = (color = '#4285f4') => ({
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: `2px solid ${color}15`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    });

    const badgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.8rem 1.5rem',
        backgroundColor: `${buddy?.color || '#4285f4'}20`,
        color: buddy?.color || '#4285f4',
        borderRadius: '20px',
        fontSize: '1rem',
        fontWeight: '600',
    };

    return (
        <div style={containerStyle}>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                .hover-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important;
                }
                
                .progress-bar {
                    height: 8px;
                    background: #e8eaed;
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4285f4, #34a853);
                    border-radius: 10px;
                    transition: width 0.3s ease;
                }
            `}</style>

            {/* Hero Section */}
            <div style={heroStyle}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '2rem', textAlign: 'left', paddingLeft: '0' }}>
                        <Logo />
                    </div>

                    {/* Buddy Avatar */}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: `${buddy?.color || '#4285f4'}20`,
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        animation: 'float 3s ease-in-out infinite',
                    }}>
                        {buddy?.avatar || '✨'}
                    </div>

                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '400',
                        color: '#202124',
                        marginBottom: '1rem',
                    }}>
                        Welcome back, {userName}! 🎉
                    </h1>

                    <p style={{
                        fontSize: '1.3rem',
                        color: '#5f6368',
                        marginBottom: '2rem',
                    }}>
                        {buddy?.name} is here to guide your journey
                    </p>

                    {/* Personality Badge */}
                    <div style={badgeStyle}>
                        <span>Your Personality:</span>
                        <strong>{personalityType}</strong>
                    </div>

                    {/* Quick Stats */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        marginTop: '2rem',
                        flexWrap: 'wrap',
                    }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '600', color: buddy?.color || '#4285f4' }}>100%</div>
                            <div style={{ fontSize: '0.9rem', color: '#5f6368' }}>Onboarding Complete</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '600', color: '#34a853' }}>0</div>
                            <div style={{ fontSize: '0.9rem', color: '#5f6368' }}>Activities Started</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '600', color: '#ea4335' }}>New</div>
                            <div style={{ fontSize: '0.9rem', color: '#5f6368' }}>Member</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={contentStyle}>
                {/* Discover Your True Path - Assessment Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #a142f4 0%, #4285f4 100%)',
                        borderRadius: '32px',
                        padding: '3rem',
                        color: '#ffffff',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 12px 40px rgba(66, 133, 244, 0.3)',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                        }} />

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            position: 'relative',
                        }}>
                            🧭 Discover Your True Path
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            marginBottom: '2rem',
                            opacity: 0.95,
                            maxWidth: '800px',
                            position: 'relative',
                        }}>
                            Unlock deep insights about yourself through scientifically-backed assessments.
                            Based on psychology, NLP, and psychometric guidelines to reveal your personality,
                            cognitive patterns, and behavioral strengths.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem',
                            marginTop: '2rem',
                            position: 'relative',
                        }}>
                            {/* MBTI Card */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '2px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                                onClick={() => onNavigate && onNavigate('assessment', 'mbti')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                                }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧬</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    MBTI Personality
                                </h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                                    60 questions • 15 min
                                </p>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${assessmentProgress.mbti}%`,
                                        height: '100%',
                                        backgroundColor: '#ffffff',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Cognitive Analysis Card */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '2px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                                onClick={() => onNavigate && onNavigate('assessment', 'cognitive')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                                }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧠</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    Cognitive Analysis
                                </h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                                    40 questions • 10 min
                                </p>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${assessmentProgress.cognitive}%`,
                                        height: '100%',
                                        backgroundColor: '#ffffff',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Behavioral Flexibility Card */}
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '2px solid rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                                onClick={() => onNavigate && onNavigate('assessment', 'behavioral')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                                }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    Behavioral Flexibility
                                </h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                                    30 questions • 8 min
                                </p>
                                <div style={{
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: `${assessmentProgress.behavioral}%`,
                                        height: '100%',
                                        backgroundColor: '#ffffff',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                            </div>
                        </div>

                        <button style={{
                            marginTop: '2rem',
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            backgroundColor: '#ffffff',
                            color: '#4285f4',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                        }}
                            onClick={() => onNavigate && onNavigate('assessment', 'overview')}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}>
                            Start Your Journey →
                        </button>
                    </div>
                </section>

                {/* Talk to Your Master Guide - Counselor Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        background: assessmentsCompleted > 0
                            ? 'linear-gradient(135deg, #34a853 0%, #fbbc04 100%)'
                            : 'linear-gradient(135deg, #9aa0a6 0%, #80868b 100%)',
                        borderRadius: '32px',
                        padding: '3rem',
                        color: '#ffffff',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: assessmentsCompleted > 0
                            ? '0 12px 40px rgba(52, 168, 83, 0.3)'
                            : '0 12px 40px rgba(0,0,0,0.1)',
                        opacity: assessmentsCompleted > 0 ? 1 : 0.7,
                    }}>
                        {assessmentsCompleted === 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '0.5rem 1rem',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                🔒 Complete 1 assessment to unlock
                            </div>
                        )}

                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            left: '-50px',
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                        }} />

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            position: 'relative',
                        }}>
                            👨‍🏫 Talk to Your Master Guide
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            marginBottom: '2rem',
                            opacity: 0.95,
                            maxWidth: '800px',
                            position: 'relative',
                        }}>
                            Connect with expert counselors for personalized one-on-one guidance.
                            Get expert advice on career choices, college admissions, mental health, and more.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2rem',
                            position: 'relative',
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>Career Guidance</div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏛️</div>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>College Admissions</div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💚</div>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>Mental Health</div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💼</div>
                                <div style={{ fontSize: '1rem', fontWeight: '600' }}>Skill Development</div>
                            </div>
                        </div>

                        <button style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            backgroundColor: assessmentsCompleted > 0 ? '#ffffff' : 'rgba(255,255,255,0.3)',
                            color: assessmentsCompleted > 0 ? '#34a853' : '#ffffff',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: assessmentsCompleted > 0 ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                        }}
                            onClick={() => assessmentsCompleted > 0 && onNavigate && onNavigate('counselor')}
                            onMouseEnter={(e) => {
                                if (assessmentsCompleted > 0) {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (assessmentsCompleted > 0) {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}>
                            {assessmentsCompleted > 0 ? 'Book a Session →' : '🔒 Complete Assessment First'}
                        </button>
                    </div>
                </section>

                {/* Recommended Peer Pools */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#202124',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        🎯 Your Peer Pool
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '1.5rem' }}>
                        Based on your personality, we recommend this community for you
                    </p>

                    <div style={sectionGridStyle}>
                        {recommendedPools.map(pool => (
                            <div
                                key={pool.id}
                                className="hover-lift"
                                style={{
                                    ...cardStyle(pool.color),
                                    border: `3px solid ${pool.color}40`,
                                }}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                }}>
                                    {pool.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: pool.color,
                                    marginBottom: '0.5rem',
                                }}>
                                    {pool.name}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#5f6368',
                                    marginBottom: '1rem',
                                }}>
                                    {pool.description}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '1.5rem',
                                }}>
                                    <span style={{ fontSize: '0.95rem', color: '#80868b' }}>
                                        {pool.members.toLocaleString()} members
                                    </span>
                                    <button style={{
                                        padding: '0.8rem 1.5rem',
                                        backgroundColor: pool.color,
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}>
                                        Join Pool
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Career Advice & Training Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}>
                    {/* Career Advice */}
                    <section>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '500',
                            color: '#202124',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}>
                            🧭 Career Guidance
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {careerAdvice.map(item => (
                                <div
                                    key={item.id}
                                    className="hover-lift"
                                    style={cardStyle(item.color)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            fontSize: '2.5rem',
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: `${item.color}20`,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: '1.2rem',
                                                fontWeight: '600',
                                                color: '#202124',
                                                margin: 0,
                                            }}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div style={{ fontSize: '1.5rem', color: item.color }}>→</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Training Sessions */}
                    <section>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '500',
                            color: '#202124',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}>
                            🎓 Training Sessions
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {trainingSessions.map(item => (
                                <div
                                    key={item.id}
                                    className="hover-lift"
                                    style={cardStyle(item.color)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: `${item.color}20`,
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                color: '#202124',
                                                margin: 0,
                                            }}>
                                                {item.title}
                                            </h3>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${item.progress}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Personality Insights */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#202124',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        🧠 Know Yourself Better
                    </h2>
                    <div style={sectionGridStyle}>
                        <div className="hover-lift" style={cardStyle('#a142f4')}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#a142f4', marginBottom: '1rem' }}>
                                How You Think 🤔
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#5f6368', lineHeight: '1.6' }}>
                                Discover your cognitive patterns, decision-making style, and problem-solving approach through interactive assessments.
                            </p>
                            <button style={{
                                marginTop: '1rem',
                                padding: '0.8rem 1.5rem',
                                backgroundColor: '#a142f420',
                                color: '#a142f4',
                                border: `2px solid #a142f4`,
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}>
                                Explore →
                            </button>
                        </div>

                        <div className="hover-lift" style={cardStyle('#4285f4')}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#4285f4', marginBottom: '1rem' }}>
                                How You Lead 👑
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#5f6368', lineHeight: '1.6' }}>
                                Understand your leadership style, strengths, and areas for growth through personality insights and feedback.
                            </p>
                            <button style={{
                                marginTop: '1rem',
                                padding: '0.8rem 1.5rem',
                                backgroundColor: '#4285f420',
                                color: '#4285f4',
                                border: `2px solid #4285f4`,
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}>
                                Discover →
                            </button>
                        </div>

                        <div className="hover-lift" style={cardStyle('#34a853')}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#34a853', marginBottom: '1rem' }}>
                                Your Strengths 💪
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#5f6368', lineHeight: '1.6' }}>
                                Identify your natural talents and learn how to leverage them for personal and professional success.
                            </p>
                            <button style={{
                                marginTop: '1rem',
                                padding: '0.8rem 1.5rem',
                                backgroundColor: '#34a85320',
                                color: '#34a853',
                                border: `2px solid #34a853`,
                                borderRadius: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}>
                                Learn More →
                            </button>
                        </div>
                    </div>
                </section>

                {/* Peer Polls */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#202124',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        📊 Community Polls
                    </h2>
                    <div style={sectionGridStyle}>
                        {peerPolls.map(poll => {
                            const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                            return (
                                <div key={poll.id} className="hover-lift" style={cardStyle('#ea4335')}>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        color: '#202124',
                                        marginBottom: '1.5rem',
                                    }}>
                                        {poll.question}
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {poll.options.map((option, idx) => {
                                            const percentage = ((poll.votes[idx] / totalVotes) * 100).toFixed(0);
                                            return (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        padding: '1rem',
                                                        backgroundColor: '#f8f9fa',
                                                        borderRadius: '12px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        height: '100%',
                                                        width: `${percentage}%`,
                                                        backgroundColor: '#ea433520',
                                                        transition: 'width 0.3s ease',
                                                    }} />
                                                    <div style={{
                                                        position: 'relative',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}>
                                                        <span style={{ fontWeight: '500', color: '#202124' }}>{option}</span>
                                                        <span style={{ fontWeight: '600', color: '#ea4335' }}>{percentage}%</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{
                                        marginTop: '1rem',
                                        fontSize: '0.9rem',
                                        color: '#80868b',
                                        textAlign: 'center',
                                    }}>
                                        {totalVotes.toLocaleString()} votes • Vote to see results
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Breakthrough Activities */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#202124',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        🚀 Breakthrough Activities
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '1.5rem' }}>
                        Daily challenges to help you grow and break through your limits
                    </p>
                    <div style={sectionGridStyle}>
                        {breakthroughActivities.map(activity => (
                            <div
                                key={activity.id}
                                className="hover-lift"
                                style={cardStyle(activity.color)}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                }}>
                                    {activity.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    color: activity.color,
                                    marginBottom: '0.5rem',
                                }}>
                                    {activity.title}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: activity.color }}>
                                        {activity.streak}
                                    </span>
                                    <span style={{ fontSize: '0.95rem', color: '#5f6368' }}>day streak</span>
                                </div>
                                <button style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    padding: '0.8rem',
                                    backgroundColor: activity.color,
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                }}>
                                    Start Challenge
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Other Peer Pools */}
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '500',
                        color: '#202124',
                        marginBottom: '1rem',
                    }}>
                        🌟 Explore Other Pools
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '1.5rem' }}>
                        Connect with diverse communities and expand your network
                    </p>
                    <div style={sectionGridStyle}>
                        {otherPools.map(pool => (
                            <div
                                key={pool.id}
                                className="hover-lift"
                                style={cardStyle(pool.color)}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '1rem',
                                }}>
                                    {pool.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    color: pool.color,
                                    marginBottom: '0.5rem',
                                }}>
                                    {pool.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: '#5f6368',
                                    marginBottom: '1rem',
                                }}>
                                    {pool.description}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '1.5rem',
                                }}>
                                    <span style={{ fontSize: '0.9rem', color: '#80868b' }}>
                                        {pool.members.toLocaleString()} members
                                    </span>
                                    <button style={{
                                        padding: '0.6rem 1.2rem',
                                        backgroundColor: 'transparent',
                                        color: pool.color,
                                        border: `2px solid ${pool.color}`,
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}>
                                        Explore
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
