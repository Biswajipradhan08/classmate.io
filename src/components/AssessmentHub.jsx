import React, { useState } from 'react';
import Logo from './Logo';
import { MBTI_QUESTIONS, APTITUDE_SUB_ATTRIBUTES } from '../data/comprehensiveQuestions';

const AssessmentHub = ({ buddy, userName, onComplete, onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [assessmentResults, setAssessmentResults] = useState(null);

    // Transform Aptitude Object to Array for the UI
    const APTITUDE_QUESTIONS = React.useMemo(() => {
        return Object.entries(APTITUDE_SUB_ATTRIBUTES).flatMap(([category, questions]) =>
            questions.map((text, i) => ({
                id: `apt-${category}-${i}`,
                text,
                category
            }))
        );
    }, []);

    // Behavioral questions (kept simple for now, can be expanded later)
    const BEHAVIORAL_QUESTIONS = [
        { id: 'b1', text: "I remain calm and composed under pressure", category: "stress_resilience" },
        { id: 'b2', text: "I can quickly adapt my approach when faced with setbacks", category: "stress_resilience" },
        { id: 'b3', text: "I can adjust my communication style to different audiences", category: "social_flex" },
        { id: 'b4', text: "I embrace new technologies and methods quickly", category: "change_adapt" },
        { id: 'b5', text: "I actively seek feedback to improve my performance", category: "learning_agility" }
    ];

    const getQuestions = () => {
        if (activeTab === 'mbti') return MBTI_QUESTIONS;
        if (activeTab === 'aptitude') return APTITUDE_QUESTIONS;
        if (activeTab === 'behavioral') return BEHAVIORAL_QUESTIONS;
        return [];
    };

    const handleAnswer = (value) => {
        const questions = getQuestions();
        setAnswers(prev => ({ ...prev, [`${activeTab}-${currentQuestionIndex}`]: value }));

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
        } else {
            calculateResults();
        }
    };

    const calculateResults = () => {
        const questions = getQuestions();

        if (activeTab === 'mbti') {
            let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
            questions.forEach((q, idx) => {
                const answer = answers[`${activeTab}-${idx}`] || 3;
                // Simplified scoring: 4-5 adds to first char dimension, 1-2 adds to second
                // Real MBTI scoring is more complex, this is a heuristic for the MVP
                const [dim1, dim2] = q.dimension.split('');
                if (answer > 3) scores[dim1] += (answer - 3);
                if (answer < 3) scores[dim2] += (3 - answer);
            });

            const type =
                (scores.E >= scores.I ? 'E' : 'I') +
                (scores.S >= scores.N ? 'S' : 'N') +
                (scores.T >= scores.F ? 'T' : 'F') +
                (scores.J >= scores.P ? 'J' : 'P');

            setAssessmentResults({ type, scores, assessment: 'mbti' });

        } else if (activeTab === 'aptitude') {
            let categoryScores = {};
            questions.forEach((q, idx) => {
                const answer = answers[`${activeTab}-${idx}`] || 3;
                categoryScores[q.category] = (categoryScores[q.category] || 0) + answer;
            });
            setAssessmentResults({ categoryScores, assessment: 'aptitude' });

        } else if (activeTab === 'behavioral') {
            let total = 0;
            questions.forEach((q, idx) => {
                total += (answers[`${activeTab}-${idx}`] || 3);
            });
            const flexibilityScore = Math.round((total / (questions.length * 5)) * 100);
            setAssessmentResults({ flexibilityScore, assessment: 'behavioral' });
        }
    };

    const resetAssessment = () => {
        setCurrentQuestionIndex(0);
        setAnswers(prev => {
            // Clear answers only for current tab
            const newAnswers = { ...prev };
            Object.keys(newAnswers).forEach(key => {
                if (key.startsWith(`${activeTab}-`)) delete newAnswers[key];
            });
            return newAnswers;
        });
        setAssessmentResults(null);
    };

    const startAssessment = (tab) => {
        setActiveTab(tab);
        resetAssessment();
    };

    // Styles
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
                <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '1rem' }}>
                    <Logo />
                </div>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '500', color: '#202124', margin: 0 }}>
                        🧭 Discover Your True Path
                    </h1>
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
                <div style={{ maxWidth: '1200px', margin: '1rem auto 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button style={tabStyle(activeTab === 'mbti')} onClick={() => setActiveTab('mbti')}>MBTI Personality</button>
                    <button style={tabStyle(activeTab === 'aptitude')} onClick={() => setActiveTab('aptitude')}>Comprehensive Aptitude</button>
                    <button style={tabStyle(activeTab === 'behavioral')} onClick={() => setActiveTab('behavioral')}>Behavioral Flexibility</button>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 2rem' }}>
                {activeTab === 'overview' && (
                    <OverviewTab onStart={startAssessment} />
                )}

                {(activeTab !== 'overview') && !assessmentResults && (
                    <QuestionView
                        questions={getQuestions()}
                        currentQuestion={currentQuestionIndex}
                        onAnswer={handleAnswer}
                        answers={answers}
                        assessmentType={activeTab}
                        questionPrefix={`${activeTab}-`}
                    />
                )}

                {assessmentResults && (
                    <ResultsView
                        results={assessmentResults}
                        onRetest={resetAssessment}
                        onComplete={() => {
                            if (onComplete) onComplete(assessmentResults);
                            // Optionally go back to overview or stay
                            setActiveTab('overview');
                            setAssessmentResults(null);
                        }}
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
            Welcome to your personalized assessment journey! These scientifically-backed assessments will help you understand yourself better and unlock insights about your personality, aptitudes, and behavioral strengths.
        </p>

        <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            <AssessmentCard
                icon="🧬"
                title="MBTI Personality Assessment"
                duration="20 minutes • 61 questions"
                description="Discover your personality type (e.g., INTJ, ENFP) through our comprehensive 61-question analysis based on Jungian psychology."
                features={["4-Letter Personality Type", "Detailed Strength Analysis", "Communication Style", "Career Matches"]}
                color="#a142f4"
                onStart={() => onStart('mbti')}
            />

            <AssessmentCard
                icon="🧠"
                title="Comprehensive Aptitude"
                duration="25 minutes • 50+ questions"
                description="Evaluate your core competencies across multiple dimensions: Logical, Verbal, Numerical, Spatial, and more."
                features={["Logical Reasoning", "Verbal & Communication", "Numerical Aptitude", "Spatial Awareness"]}
                color="#4285f4"
                onStart={() => onStart('aptitude')}
            />

            <AssessmentCard
                icon="⚡"
                title="Behavioral Flexibility"
                duration="5 minutes • 5 questions"
                description="Measure your adaptability, resilience, and learning agility in a fast-changing world."
                features={["Stress Resilience", "Social Adaptability", "Change Management", "Learning Agility"]}
                color="#34a853"
                onStart={() => onStart('behavioral')}
            />
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
                fontSize: '3rem',
                minWidth: '80px',
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#202124', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: color, fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{duration}</p>
                <p style={{ fontSize: '1rem', color: '#5f6368', lineHeight: '1.6', marginBottom: '1.5rem' }}>{description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {features.map((feature, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: color, fontSize: '1.2rem' }}>✓</span>
                            <span style={{ fontSize: '0.9rem', color: '#3c4043' }}>{feature}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onStart}
                    style={{
                        padding: '0.8rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                >
                    Start Assessment →
                </button>
            </div>
        </div>
    </div>
);

// Question View Component
const QuestionView = ({ questions, currentQuestion, onAnswer, answers, assessmentType, questionPrefix }) => {
    const question = questions[currentQuestion];
    if (!question) return <div>Loading...</div>;

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const colors = { mbti: '#a142f4', aptitude: '#4285f4', behavioral: '#34a853' };
    const color = colors[assessmentType] || '#4285f4';

    const currentAnswer = answers[`${questionPrefix}${currentQuestion}`];

    return (
        <div>
            {/* Progress */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#e8eaed', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: color, transition: 'width 0.3s ease' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#5f6368', fontWeight: '600' }}>
                Question {currentQuestion + 1} of {questions.length}
            </div>

            {/* Question Card */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '500', color: '#202124', lineHeight: '1.5', marginBottom: '2rem' }}>
                    {question.text}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '500px', margin: '0 auto' }}>
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
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: '500',
                                backgroundColor: currentAnswer === option.value ? `${color}20` : '#f8f9fa',
                                color: currentAnswer === option.value ? color : '#3c4043',
                                border: `2px solid ${currentAnswer === option.value ? color : '#e8eaed'}`,
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Results View Component
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
            <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#202124', marginBottom: '1rem' }}>Assessment Complete!</h2>
            <p style={{ fontSize: '1.1rem', color: '#5f6368', marginBottom: '2rem' }}>Your results have been calculated.</p>

            {results.assessment === 'mbti' && (
                <div style={{ padding: '2rem', backgroundColor: '#a142f420', borderRadius: '16px', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '3rem', fontWeight: '700', color: '#a142f4', marginBottom: '0.5rem' }}>{results.type}</h3>
                    <p>Your Estimated Personality Type</p>
                </div>
            )}

            {results.assessment === 'aptitude' && (
                <div style={{ padding: '2rem', backgroundColor: '#4285f420', borderRadius: '16px', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#4285f4', marginBottom: '0.5rem' }}>Apptitude Analyzed</h3>
                    <p>We've mapped your strengths across {Object.keys(results.categoryScores).length} dimensions.</p>
                </div>
            )}

            {results.assessment === 'behavioral' && (
                <div style={{ padding: '2rem', backgroundColor: '#34a85320', borderRadius: '16px', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '3rem', fontWeight: '700', color: '#34a853', marginBottom: '0.5rem' }}>{results.flexibilityScore}%</h3>
                    <p>Flexibility Score</p>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={onRetest} style={{ padding: '1rem 2rem', border: 'none', background: '#f1f3f4', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Retake</button>
                <button onClick={onComplete} style={{ padding: '1rem 2rem', border: 'none', background: '#1a73e8', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save & Continue</button>
            </div>
        </div>
    );
};

export default AssessmentHub;
