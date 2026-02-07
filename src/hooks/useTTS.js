/**
 * Custom React Hook for TTS functionality
 * Provides easy integration of voice synthesis with emotional support
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import ttsService from '../services/ttsService';

export const useTTS = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const abortControllerRef = useRef(null);

    // Initialize voices on mount
    useEffect(() => {
        const loadVoices = async () => {
            try {
                await ttsService.loadVoices();
            } catch (error) {
                console.error('Failed to load voices:', error);
            }
        };
        loadVoices();
    }, []);

    /**
     * Speak with emotional context
     */
    const speak = useCallback(async (text, agent, emotion = 'supportive', options = {}) => {
        if (!isEnabled || !text || !agent) {
            return Promise.reject(new Error('TTS not properly configured'));
        }

        try {
            abortControllerRef.current = new AbortController();

            return new Promise((resolve, reject) => {
                ttsService
                    .speak(text, agent, emotion, {
                        onStart: () => {
                            setIsSpeaking(true);
                            options.onStart?.();
                        },
                        onEnd: () => {
                            setIsSpeaking(false);
                            options.onEnd?.();
                            resolve();
                        },
                        onError: (error) => {
                            setIsSpeaking(false);
                            options.onError?.(error);
                            reject(error);
                        },
                        ...options
                    })
                    .catch(reject);
            });
        } catch (error) {
            setIsSpeaking(false);
            return Promise.reject(error);
        }
    }, [isEnabled]);

    /**
     * Stop current speech
     */
    const stop = useCallback(() => {
        ttsService.stop();
        setIsSpeaking(false);
    }, []);

    /**
     * Pause current speech
     */
    const pause = useCallback(() => {
        ttsService.pause();
    }, []);

    /**
     * Resume speech
     */
    const resume = useCallback(() => {
        ttsService.resume();
    }, []);

    /**
     * Toggle TTS on/off
     */
    const toggleTTS = useCallback(() => {
        setIsEnabled(prev => !prev);
        if (isSpeaking) {
            stop();
        }
    }, [isSpeaking, stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isSpeaking) {
                ttsService.stop();
            }
        };
    }, [isSpeaking]);

    return {
        speak,
        stop,
        pause,
        resume,
        isSpeaking,
        isEnabled,
        toggleTTS
    };
};

export default useTTS;
