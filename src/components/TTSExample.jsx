/**
 * Example component demonstrating TTS usage
 * This shows how to integrate voice synthesis in any component
 */

import React from 'react';
import useTTS from '../hooks/useTTS';

export const TTSExample = ({ buddy }) => {
    const { speak, stop, isSpeaking, isEnabled, toggleTTS } = useTTS();

    const handleSpeakWithEmotion = async (text, emotion) => {
        try {
            await speak(text, buddy, emotion, {
                onStart: () => console.log('Started speaking'),
                onEnd: () => console.log('Finished speaking'),
                onError: (err) => console.error('Speech error:', err)
            });
        } catch (error) {
            console.error('Failed to speak:', error);
        }
    };

    if (!buddy) {
        return <div>No buddy selected</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            {/* TTS Toggle */}
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={toggleTTS}
                    style={{
                        padding: '0.8rem 1.5rem',
                        backgroundColor: isEnabled ? '#34a853' : '#f1f3f4',
                        color: isEnabled ? 'white' : '#5f6368',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    {isEnabled ? '🔊 Voice ON' : '🔇 Voice OFF'}
                </button>
            </div>

            {/* Speaking Status */}
            {isSpeaking && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#34a853',
                        borderRadius: '50%',
                        animation: 'pulse 1s infinite'
                    }} />
                    <span>{buddy.name} is speaking...</span>
                    <button
                        onClick={stop}
                        style={{
                            marginLeft: 'auto',
                            padding: '0.4rem 1rem',
                            backgroundColor: '#f1f3f4',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Stop
                    </button>
                </div>
            )}

            {/* Emotion Examples */}
            <div style={{ marginBottom: '1rem' }}>
                <h3>Try Different Emotions:</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleSpeakWithEmotion('I am here to support you on this journey!', 'supportive')}
                        style={buttonStyle('#4285f4')}
                    >
                        😊 Supportive
                    </button>
                    <button
                        onClick={() => handleSpeakWithEmotion('That is amazing! You are doing great!', 'encouraging')}
                        style={buttonStyle('#34a853')}
                    >
                        🎉 Encouraging
                    </button>
                    <button
                        onClick={() => handleSpeakWithEmotion('Just relax and take your time. We will figure this out together.', 'calm')}
                        style={buttonStyle('#a142f4')}
                    >
                        🧘 Calm
                    </button>
                    <button
                        onClick={() => handleSpeakWithEmotion('This is so exciting! I cannot wait to see what you create!', 'excited')}
                        style={buttonStyle('#fbbc04')}
                    >
                        🚀 Excited
                    </button>
                    <button
                        onClick={() => handleSpeakWithEmotion('Let me think about this deeply. That is interesting.', 'thoughtful')}
                        style={buttonStyle('#ea4335')}
                    >
                        💭 Thoughtful
                    </button>
                    <button
                        onClick={() => handleSpeakWithEmotion('Let us have fun with this! It will be awesome!', 'playful')}
                        style={buttonStyle('#5f6368')}
                    >
                        😄 Playful
                    </button>
                </div>
            </div>

            {/* Custom Message */}
            <div>
                <h3>Custom Message:</h3>
                <textarea
                    id="customMessage"
                    placeholder="Enter your message here..."
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #e8eaed',
                        fontFamily: 'inherit',
                        fontSize: '1rem'
                    }}
                />
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => {
                            const message = document.getElementById('customMessage').value;
                            if (message) {
                                handleSpeakWithEmotion(message, 'supportive');
                            }
                        }}
                        style={buttonStyle('#4285f4')}
                    >
                        Speak Message
                    </button>
                    <button
                        onClick={() => {
                            document.getElementById('customMessage').value = '';
                        }}
                        style={buttonStyle('#ea4335')}
                    >
                        Clear
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

const buttonStyle = (color) => ({
    padding: '0.6rem 1.2rem',
    backgroundColor: `${color}20`,
    color: color,
    border: `2px solid ${color}`,
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem'
});

export default TTSExample;
