import React, { useState } from 'react';

const AssessmentHub = ({ buddy, userName = "friend", onComplete, onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [assessmentResults, setAssessmentResults] = useState(null);

    // MBTI Questions (60 questions - shortened to 20 for demo, expandable)
    const mbtiQuestions = [
        // Extroversion vs Introversion (E/I)
        { id: 1, text: "I feel energized after spending time with a large group of people", dimension: "E", reversed: false },
        { id: 2, text: "I prefer to spend my free time alone or with one or two close friends", dimension: "I", reversed: false },
        { id: 3, text: "I enjoy being the center of attention in social situations", dimension: "E", reversed: false },
        { id: 4, text: "I need time alone to recharge after socializing", dimension: "I", reversed: false },
        { id: 5, text: "I find it easy to strike up conversations with strangers", dimension: "E", reversed: false },

        // Sensing vs Intuition (S/N)
        { id: 6, text: "I focus on concrete facts and details rather than abstract possibilities", dimension: "S", reversed: false },
        { id: 7, text: "I trust my gut feelings and hunches when making decisions", dimension: "N", reversed: false },
        { id: 8, text: "I prefer practical, tried-and-true solutions over innovative ideas", dimension: "S", reversed: false },
        { id: 9, text: "I enjoy thinking about future possibilities and 'what ifs'", dimension: "N", reversed: false },
        { id: 10, text: "I pay attention to sensory details in my environment", dimension: "S", reversed: false },

        // Thinking vs Feeling (T/F)
        { id: 11, text: "I make decisions based on logic and objective analysis", dimension: "T", reversed: false },
        { id: 12, text: "I consider how others will feel when making important decisions", dimension: "F", reversed: false },
        { id: 13, text: "I value truth and justice over harmony and tact", dimension: "T", reversed: false },
        { id: 14, text: "I find it important to maintain positive relationships even if it means compromising", dimension: "F", reversed: false },
        { id: 15, text: "I prefer to analyze problems from a detached, objective perspective", dimension: "T", reversed: false },

        // Judging vs Perceiving (J/P)
        { id: 16, text: "I prefer to plan things in advance rather than be spontaneous", dimension: "J", reversed: false },
        { id: 17, text: "I enjoy keeping my options open and being flexible", dimension: "P", reversed: false },
        { id: 18, text: "I feel most comfortable when I have a clear schedule and plan", dimension: "J", reversed: false },
        { id: 19, text: "I often work best under pressure and close to deadlines", dimension: "P", reversed: false },
        { id: 20, text: "I prefer to finish one task before starting another", dimension: "J", reversed: false },
    ];

    // Cognitive Analysis Questions (40 questions - shortened to 15 for demo)
    const cognitiveQuestions = [
        // Analytical Thinking
        { id: 1, text: "I excel at identifying patterns in complex data", category: "analytical" },
        { id: 2, text: "I enjoy solving logical puzzles and brainteasers", category: "analytical" },
        { id: 3, text: "I can easily break down complex problems into smaller parts", category: "analytical" },

        // Creative Thinking
        { id: 4, text: "I often come up with creative solutions to problems", category: "creative" },
        { id: 5, text: "I enjoy brainstorming and generating new ideas", category: "creative" },
        { id: 6, text: "I can think outside the box when faced with challenges", category: "creative" },

        // Processing Style
        { id: 7, text: "I learn better by seeing visual representations than reading text", category: "visual" },
        { id: 8, text: "I prefer to follow step-by-step instructions", category: "sequential" },
        { id: 9, text: "I can grasp the big picture without getting lost in details", category: "global" },

        // Decision Making
        { id: 10, text: "I gather all available information before making decisions", category: "methodical" },
        { id: 11, text: "I trust my instincts when making quick decisions", category: "intuitive" },
        { id: 12, text: "I weigh pros and cons systematically before choosing", category: "methodical" },

        // Learning Style
        { id: 13, text: "I learn best through hands-on practice and experience", category: "kinesthetic" },
        { id: 14, text: "I prefer discussing ideas with others to understand them better", category: "verbal" },
        { id: 15, text: "I can focus deeply on one subject for extended periods", category: "focused" },
    ];

    // Behavioral Flexibility Questions (30 questions - shortened to 12 for demo)
    const behavioralQuestions = [
        // Stress Response
        { id: 1, text: "I remain calm and composed under pressure", category: "stress_resilience" },
        { id: 2, text: "I can quickly adapt my approach when faced with setbacks", category: "stress_resilience" },
        { id: 3, text: "I view challenges as opportunities for growth", category: "stress_resilience" },

        // Social Adaptability
        { id: 4, text: "I can adjust my communication style to different audiences", category: "social_flex" },
        { id: 5, text: "I feel comfortable in diverse social settings", category: "social_flex" },
        { id: 6, text: "I can easily see situations from others' perspectives", category: "social_flex" },

        // Change Management
        { id: 7, text: "I embrace new technologies and methods quickly", category: "change_adapt" },
        { id: 8, text: "I feel excited rather than anxious about new situations", category: "change_adapt" },
        { id: 9, text: "I can let go of old habits when better approaches emerge", category: "change_adapt" },

        // Learning Agility
        { id: 10, text: "I actively seek feedback to improve my performance", category: "learning_agility" },
        { id: 11, text: "I can quickly learn and apply new skills", category: "learning_agility" },
        { id: 12, text: "I enjoy stepping out of my comfort zone", category: "learning_agility" },
    ];

    const getQuestions = () => {
        if (activeTab === 'mbti') return mbtiQuestions;
        if (activeTab === 'cognitive') return cognitiveQuestions;
        if (activeTab === 'behavioral') return behavioralQuestions;
        return [];
    };

    const handleAnswer = (value) => {
        const questions = getQuestions();
        setAnswers(prev => ({ ...prev, [currentQuestion]: value }));

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
        } else {
            // Calculate results
            calculateResults();
        }
    };

    const calculateResults = () => {
        const questions = getQuestions();

        if (activeTab === 'mbti') {
            // Calculate MBTI type
            let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

            questions.forEach((q, idx) => {
                const answer = answers[idx] || 3; // Default to neutral
                const score = answer; // 1-5 scale
                scores[q.dimension] += score;
            });

            const type =
                (scores.E > scores.I ? 'E' : 'I') +
                (scores.S > scores.N ? 'S' : 'N') +
                (scores.T > scores.F ? 'T' : 'F') +
                (scores.J > scores.P ? 'J' : 'P');

            setAssessmentResults({ type, scores, assessment: 'mbti' });
        } else if (activeTab === 'cognitive') {
            // Calculate cognitive profile
            let categories = {
                analytical: 0,
                creative: 0,
                visual: 0,
                sequential: 0,
                global: 0,
                methodical: 0,
                intuitive: 0,
                kinesthetic: 0,
                verbal: 0,
                focused: 0
            };

            questions.forEach((q, idx) => {
                const answer = answers[idx] || 3;
                categories[q.category] += answer;
            });

            setAssessmentResults({ categories, assessment: 'cognitive' });
        } else if (activeTab === 'behavioral') {
            // Calculate behavioral scores
            let categories = {
                stress_resilience: 0,
                social_flex: 0,
                change_adapt: 0,
                learning_agility: 0
            };

            questions.forEach((q, idx) => {
                const answer = answers[idx] || 3;
                categories[q.category] += answer;
            });

            // Calculate overall flexibility score
            const total = Object.values(categories).reduce((a, b) => a + b, 0);
            const maxPossible = questions.length * 5;
            const flexibilityScore = Math.round((total / maxPossible) * 100);

            setAssessmentResults({ categories, flexibilityScore, assessment: 'behavioral' });
        }
    };

    const resetAssessment = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setAssessmentResults(null);
    };

    const startAssessment = (tab) => {
        setActiveTab(tab);
        resetAssessment();
    };

    // ... (continued in next part due to length)

    const containerStyle = {
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'auto',
    };

    const tabStyle = (isActive) => ({
        padding: '1rem 2rem',
        fontSize: '1rem',
        fontWeight: '600',
        backgroundColor: isActive ? '#4285f4' : 'transparent',
        color: isActive ? '#ffffff' : '#5f6368',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginRight: '0.5rem',
    });

    return (
        <div style={containerStyle}>
            {/* Header with tabs */}
            <div style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e8eaed',
                padding: '1.5rem 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '500', color: '#202124', margin: 0 }}>
                        🧭 Discover Your True Path
                    </h1  >
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.8rem 1.5rem',
                            backgroundColor: '#f1f3f4',
                            color: '#5f6368',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
                <div style={{ maxWidth: '1200px', margin: '1rem auto 0', display: 'flex' }}>
                    <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button style={tabStyle(activeTab === 'mbti')} onClick={() => setActiveTab('mbti')}>MBTI Personality</button>
                    <button style={tabStyle(activeTab === 'cognitive')} onClick={() => setActiveTab('cognitive')}>Cognitive Analysis</button>
                    <button style={tabStyle(activeTab === 'behavioral')} onClick={() => setActiveTab('behavioral')}>Behavioral Flexibility</button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 2rem' }}>
                {activeTab === 'overview' && (
                    <OverviewTab onStart={startAssessment} />
                )}

                {(activeTab === 'mbti' || activeTab === 'cognitive' || activeTab === 'behavioral') && !assessmentResults && (
                    <QuestionView
                        questions={getQuestions()}
                        currentQuestion={currentQuestion}
                        onAnswer={handleAnswer}
                        answers={answers}
                        assessmentType={activeTab}
                    />
                )}

                {assessmentResults && (
                    <ResultsView
                        results={assessmentResults}
                        onRetest={resetAssessment}
                        onComplete={() => onComplete && onComplete(assessmentResults)}
                    />
                )}
            </div>
        </div>
    );
};

// Overview Tab Component
const OverviewTab = ({ onStart }) => (
    <div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '500', color: '#202124', marginBottom: '1.5rem' }}>
            What's Best For You?
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#5f6368', lineHeight: '1.8', marginBottom: '2rem' }}>
            Welcome to your personalized assessment journey! These scientifically-backed assessments will help you understand yourself better and unlock insights about your personality, thinking patterns, and behavioral strengths.
        </p>

        {/* Assessment Cards */}
        <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            {/* MBTI Card */}
            <AssessmentCard
                icon="🧬"
                title="MBTI Personality Assessment"
                duration="15 minutes • 60 questions"
                description="Discover your personality type through the Myers-Briggs Type Indicator. Based on Carl Jung's theory of psychological types, this assessment reveals your preferences across four dimensions: Extroversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving."
                features={[
                    "Identify your 4-letter personality type (e.g., INTJ, ENFP)",
                    "Understand your natural strengths and tendencies",
                    "Get personalized career and learning recommendations",
                    "Improve your communication and relationships"
                ]}
                color="#a142f4"
                onStart={() => onStart('mbti')}
            />

            {/* Cognitive Analysis Card */}
            <AssessmentCard
                icon="🧠"
                title="Cognitive Analysis"
                duration="10 minutes • 40 questions"
                description="Explore how you think, learn, and solve problems. This assessment evaluates your cognitive patterns including analytical vs. creative thinking, visual vs. verbal processing, and decision-making styles based on cognitive psychology research."
                features={[
                    "Discover your thinking style and cognitive strengths",
                    "Optimize your learning and study strategies",
                    "Understand your decision-making approach",
                    "Identify your information processing preferences"
                ]}
                color="#4285f4"
                onStart={() => onStart('cognitive')}
            />

            {/* Behavioral Flexibility Card */}
            <AssessmentCard
                icon="⚡"
                title="Behavioral Flexibility Assessment"
                duration="8 minutes • 30 questions"
                description="Measure your adaptability and resilience across different situations. This assessment evaluates your stress response, social flexibility, change management skills, and learning agility based on behavioral psychology principles."
                features={[
                    "Assess your adaptability and resilience",
                    "Understand your stress response patterns",
                    "Improve your social and communication flexibility",
                    "Enhance your ability to embrace change"
                ]}
                color="#34a853"
                onStart={() => onStart('behavioral')}
            />
        </div>

        <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: '#e8f0fe',
            borderRadius: '16px',
            borderLeft: '4px solid #4285f4',
        }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1a73e8', marginBottom: '1rem' }}>
                💡 Why Take These Assessments?
            </h3>
            <ul style={{ fontSize: '1.05rem', color: '#3c4043', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Gain deep self-awareness and personal insights</li>
                <li>Make informed career and education decisions</li>
                <li>Unlock personalized counselor recommendations</li>
                <li>Access expert guidance tailored to your profile</li>
                <li>Join peer communities aligned with your personality</li>
            </ul>
        </div>
    </div>
);

// Assessment Card Component
const AssessmentCard = ({ icon, title, duration, description, features, color, onStart }) => (
    <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: `3px solid ${color}20`,
    }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div style={{
                fontSize: '4rem',
                width: '80px',
                height: '80px',
                backgroundColor: `${color}20`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {icon}
            </div>
            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#202124', marginBottom: '0.5rem' }}>
                    {title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: color, fontWeight: '600', marginBottom: '1rem' }}>
                    {duration}
                </p>
                <p style={{ fontSize: '1.05rem', color: '#5f6368', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {description}
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                    {features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: color, fontSize: '1.2rem' }}>✓</span>
                            <span style={{ fontSize: '0.95rem', color: '#3c4043' }}>{feature}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onStart}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        backgroundColor: color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = `0 6px 20px ${color}40`;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    Start Assessment →
                </button>
            </div>
        </div>
    </div>
);

// Question View Component
const QuestionView = ({ questions, currentQuestion, onAnswer, answers, assessmentType }) => {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const colors = {
        mbti: '#a142f4',
        cognitive: '#4285f4',
        behavioral: '#34a853'
    };
    const color = colors[assessmentType];

    return (
        <div>
            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e8eaed',
                borderRadius: '10px',
                marginBottom: '2rem',
                overflow: 'hidden',
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: color,
                    transition: 'width 0.3s ease',
                }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1rem', color: '#5f6368', fontWeight: '600' }}>
                    Question {currentQuestion + 1} of {questions.length}
                </span>
            </div>

            {/* Question Card */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    color: '#202124',
                    lineHeight: '1.5',
                    marginBottom: '3rem',
                    textAlign: 'center',
                }}>
                    {question.text}
                </h2>

                {/* Answer Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { value: 5, label: 'Strongly Agree' },
                        { value: 4, label: 'Agree' },
                        { value: 3, label: 'Neutral' },
                        { value: 2, label: 'Disagree' },
                        { value: 1, label: 'Strongly Disagree' },
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onAnswer(option.value)}
                            style={{
                                padding: '1.2rem 2rem',
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                backgroundColor: answers[currentQuestion] === option.value ? `${color}20` : '#f8f9fa',
                                color: answers[currentQuestion] === option.value ? color : '#3c4043',
                                border: `2px solid ${answers[currentQuestion] === option.value ? color : '#e8eaed'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                                if (answers[currentQuestion] !== option.value) {
                                    e.target.style.backgroundColor = `${color}10`;
                                    e.target.style.borderColor = `${color}40`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (answers[currentQuestion] !== option.value) {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                    e.target.style.borderColor = '#e8eaed';
                                }
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            {currentQuestion > 0 && (
                <button
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    style={{
                        padding: '0.8rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: '#f1f3f4',
                        color: '#5f6368',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    ← Previous
                </button>
            )}
        </div>
    );
};

// Results View Component (simplified, full version would include visualizations)
const ResultsView = ({ results, onRetest, onComplete }) => {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#202124', marginBottom: '1rem' }}>
                Assessment Complete!
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '2rem' }}>
                Your results have been calculated and saved.
            </p>

            {results.type && (
                <div style={{
                    padding: '2rem',
                    backgroundColor: '#a142f420',
                    borderRadius: '16px',
                    marginBottom: '2rem',
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧬</div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#a142f4' }}>
                        {results.type}
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: '#5f6368', marginTop: '0.5rem' }}>
                        Your MBTI Personality Type
                    </p>
                </div>
            )}

            {results.flexibilityScore !== undefined && (
                <div style={{
                    padding: '2rem',
                    backgroundColor: '#34a85320',
                    borderRadius: '16px',
                    marginBottom: '2rem',
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#34a853' }}>
                        {results.flexibilityScore}%
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: '#5f6368', marginTop: '0.5rem' }}>
                        Behavioral Flexibility Score
                    </p>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button
                    onClick={onRetest}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        backgroundColor: '#f1f3f4',
                        color: '#5f6368',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                    }}
                >
                    Retake Assessment
                </button>
                <button
                    onClick={onComplete}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        backgroundColor: '#4285f4',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                    }}
                >
                    Continue to Dashboard
                </button>
            </div>
        </div>
    );
};

export default AssessmentHub;
