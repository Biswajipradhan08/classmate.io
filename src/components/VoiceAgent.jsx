import React, { useState, useEffect } from 'react';
import { voiceService } from '../services/VoiceService';

const VoiceAgent = ({ buddy }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        // Initialize voice service preference
        // In a real app, this might wait for user interaction to unlock audio context
        const initVoice = () => {
            voiceService.selectVoice();
        };

        window.addEventListener('click', initVoice, { once: true });
        return () => window.removeEventListener('click', initVoice);
    }, []);

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
            // Stop recognition logic if implemented manually
        } else {
            setIsListening(true);
            voiceService.listen((text) => {
                console.log("User said:", text);
                setIsListening(false);
                handleUserCommand(text);
            });
        }
    };

    const handleUserCommand = (text) => {
        // Simple command handling
        const lowerText = text.toLowerCase();

        let response = "I'm not sure how to help with that yet.";
        let emotion = 'neutral';

        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            response = `Hello there! I'm ${buddy?.name || 'Classy'}. How can I help you today?`;
            emotion = 'excited';
        } else if (lowerText.includes('logout') || lowerText.includes('sign out')) {
            response = "You can logout using the button in the top right corner.";
            emotion = 'calm';
        } else if (lowerText.includes('sad') || lowerText.includes('help')) {
            response = "I hear you. It's okay to feel that way. I'm here to support you.";
            emotion = 'soothing';
        }

        speak(response, emotion);
    };

    const speak = (text, emotion) => {
        setIsSpeaking(true);
        voiceService.speak(text, emotion);

        // Simple timeout to reset speaking state since SpeechSynthesis event handling can be flaky
        // In a robust app, use onend event from speech synthesis
        const estimatedDuration = text.length * 100; // rough estimate
        setTimeout(() => setIsSpeaking(false), estimatedDuration);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem', // Left is usually for chat, keep right or adjust
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
        }}>
            {/* Speech Bubble */}
            {(isListening || isSpeaking) && (
                <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    marginBottom: '0.5rem',
                    maxWidth: '200px',
                    fontSize: '0.9rem',
                    color: '#202124',
                    animation: 'float 3s ease-in-out infinite',
                }}>
                    {isListening ? "Listening..." : "Speaking..."}
                </div>
            )}

            {/* Agent Button */}
            <button
                onClick={toggleListening}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: isListening ? '#ea4335' : (buddy?.color || '#4285f4'),
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                    transform: isListening ? 'scale(1.1)' : 'scale(1)',
                }}
            >
                {isListening ? '🎤' : (buddy?.avatar || '🤖')}
            </button>
        </div>
    );
};

export default VoiceAgent;
