/**
 * Enhanced TTS Service for Indian Demographics
 * Provides natural, emotion-aware voice synthesis with gender and personality variations
 */

class IndianTTSService {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.voiceCache = {};
    }

    /**
     * Get available voices for Indian languages
     * Prioritizes Google voices and system voices with Indian accents
     */
    getAvailableVoices() {
        const voices = this.synth.getVoices();
        
        // Prioritize voices: Google High Quality > Indian accents > Default
        const preferredVoices = [
            // Google High Quality Voices
            { pattern: /Google UK English|Google US English/, priority: 1, region: 'Indian' },
            // Indian English accents
            { pattern: /India|Indian/, priority: 2, region: 'Indian' },
            // General English with good quality
            { pattern: /English/, priority: 3, region: 'English' }
        ];

        const categorizedVoices = {};
        
        voices.forEach(voice => {
            for (let pref of preferredVoices) {
                if (pref.pattern.test(voice.name) || pref.pattern.test(voice.lang)) {
                    const lang = voice.lang.split('-')[0];
                    if (!categorizedVoices[lang]) {
                        categorizedVoices[lang] = [];
                    }
                    categorizedVoices[lang].push({ voice, priority: pref.priority });
                }
            }
        });

        // Sort by priority
        Object.keys(categorizedVoices).forEach(lang => {
            categorizedVoices[lang].sort((a, b) => a.priority - b.priority);
        });

        return categorizedVoices;
    }

    /**
     * Get voice configuration based on agent profile
     * Considers name, gender, personality, and emotional state
     * Enhanced with more sophisticated emotion handling like Google/Apple/Copilot
     */
    getVoiceConfig(agent) {
        const baseConfigs = {
            // Female agents (within 30)
            'Isha': {
                gender: 'female',
                personality: 'Warm & Supportive Mentor',
                age: '28',
                baseRate: 0.88,
                basePitch: 1.12,
                volume: 1.0,
                emotions: {
                    calm: { rate: 0.80, pitch: 1.08, variance: 0.04 },
                    supportive: { rate: 0.88, pitch: 1.12, variance: 0.06 },
                    encouraging: { rate: 0.95, pitch: 1.18, variance: 0.09 },
                    playful: { rate: 0.98, pitch: 1.22, variance: 0.11 },
                    excited: { rate: 1.02, pitch: 1.25, variance: 0.12 },
                    thoughtful: { rate: 0.82, pitch: 1.05, variance: 0.05 },
                    confident: { rate: 0.92, pitch: 1.15, variance: 0.08 }
                },
                voiceHint: 'female'
            },
            'Elina': {
                gender: 'female',
                personality: 'Energetic & Motivating Coach',
                age: '26',
                baseRate: 1.02,
                basePitch: 1.28,
                volume: 1.0,
                emotions: {
                    excited: { rate: 1.08, pitch: 1.35, variance: 0.14 },
                    encouraging: { rate: 1.04, pitch: 1.30, variance: 0.12 },
                    playful: { rate: 1.05, pitch: 1.32, variance: 0.13 },
                    supportive: { rate: 0.98, pitch: 1.25, variance: 0.10 },
                    calm: { rate: 0.92, pitch: 1.18, variance: 0.08 },
                    confident: { rate: 1.00, pitch: 1.28, variance: 0.11 },
                    thoughtful: { rate: 0.88, pitch: 1.15, variance: 0.07 }
                },
                voiceHint: 'female'
            },
            'Amrita': {
                gender: 'female',
                personality: 'Intuitive & Empathetic Guide',
                age: '29',
                baseRate: 0.86,
                basePitch: 1.10,
                volume: 1.0,
                emotions: {
                    calm: { rate: 0.78, pitch: 1.05, variance: 0.03 },
                    supportive: { rate: 0.86, pitch: 1.10, variance: 0.06 },
                    thoughtful: { rate: 0.80, pitch: 1.03, variance: 0.04 },
                    encouraging: { rate: 0.93, pitch: 1.16, variance: 0.09 },
                    playful: { rate: 0.95, pitch: 1.18, variance: 0.10 },
                    excited: { rate: 1.00, pitch: 1.22, variance: 0.11 },
                    confident: { rate: 0.90, pitch: 1.12, variance: 0.07 }
                },
                voiceHint: 'female'
            },
            // Male agents
            'Ashu': {
                gender: 'male',
                personality: 'Casual & Friendly Buddy',
                age: '27',
                baseRate: 0.94,
                basePitch: 1.02,
                volume: 1.0,
                emotions: {
                    playful: { rate: 1.00, pitch: 1.08, variance: 0.11 },
                    encouraging: { rate: 0.97, pitch: 1.05, variance: 0.09 },
                    supportive: { rate: 0.92, pitch: 1.00, variance: 0.08 },
                    excited: { rate: 1.06, pitch: 1.12, variance: 0.13 },
                    calm: { rate: 0.88, pitch: 0.98, variance: 0.07 },
                    confident: { rate: 0.95, pitch: 1.04, variance: 0.09 },
                    thoughtful: { rate: 0.86, pitch: 0.95, variance: 0.06 }
                },
                voiceHint: 'male'
            },
            'Adi': {
                gender: 'male',
                personality: 'Confident & Analytical Mentor',
                age: '28',
                baseRate: 0.89,
                basePitch: 0.92,
                volume: 1.0,
                emotions: {
                    confident: { rate: 0.87, pitch: 0.90, variance: 0.05 },
                    supportive: { rate: 0.89, pitch: 0.92, variance: 0.07 },
                    thoughtful: { rate: 0.82, pitch: 0.88, variance: 0.05 },
                    encouraging: { rate: 0.94, pitch: 0.96, variance: 0.08 },
                    playful: { rate: 0.98, pitch: 0.98, variance: 0.10 },
                    excited: { rate: 1.02, pitch: 1.00, variance: 0.11 },
                    calm: { rate: 0.84, pitch: 0.89, variance: 0.06 }
                },
                voiceHint: 'male'
            },
            'Cliford': {
                gender: 'male',
                personality: 'Wise & Thoughtful Counselor',
                age: '30',
                baseRate: 0.84,
                basePitch: 0.88,
                volume: 1.0,
                emotions: {
                    thoughtful: { rate: 0.78, pitch: 0.84, variance: 0.04 },
                    supportive: { rate: 0.84, pitch: 0.88, variance: 0.06 },
                    calm: { rate: 0.80, pitch: 0.85, variance: 0.05 },
                    encouraging: { rate: 0.90, pitch: 0.92, variance: 0.08 },
                    confident: { rate: 0.87, pitch: 0.89, variance: 0.06 },
                    playful: { rate: 0.92, pitch: 0.92, variance: 0.09 },
                    excited: { rate: 0.98, pitch: 0.95, variance: 0.10 }
                },
                voiceHint: 'male'
            }
        };

        return baseConfigs[agent.name] || baseConfigs['Adi'];
    }

    /**
     * Select appropriate voice from available voices
     * Filters by gender and language preferences
     */
    selectVoice(genderHint = 'female') {
        const voices = this.synth.getVoices();
        
        // Enhanced filter for Indian voices
        const indianVoices = voices.filter(voice => {
            const voiceName = voice.name.toLowerCase();
            const voiceLang = voice.lang.toLowerCase();
            
            // Prioritize: Google voices > English voices (with some Indian bias)
            return (
                voiceLang.includes('en') && 
                (voiceName.includes('google') || 
                 voiceName.includes('english') ||
                 voiceLang.includes('india') ||
                 voiceLang.startsWith('en'))
            );
        });

        if (indianVoices.length === 0) {
            // Fallback to any English voice
            return voices.find(v => v.lang.startsWith('en'));
        }

        // For better gender-based selection if supported
        const genderedVoices = indianVoices.filter(v => {
            const name = v.name.toLowerCase();
            if (genderHint === 'male') {
                return !name.includes('female') && !name.includes('woman') && !name.includes('lady');
            } else {
                return !name.includes('male') && !name.includes('man') && !name.includes('boy');
            }
        });

        // Return gendered voice if found, otherwise return first Indian voice
        return genderedVoices[0] || indianVoices[0];
    }

    /**
     * Generate emotional variance to make speech more natural
     * Enhanced with more sophisticated emotion detection like major assistants
     */
    getEmotionalVariance(emotion = 'neutral') {
        const emotionalVariances = {
            calm: { rateFactor: -0.08, pitchFactor: -0.03, pauseFactor: 1.2 },
            excited: { rateFactor: 0.12, pitchFactor: 0.12, pauseFactor: 0.8 },
            thoughtful: { rateFactor: -0.10, pitchFactor: -0.05, pauseFactor: 1.3 },
            playful: { rateFactor: 0.10, pitchFactor: 0.10, pauseFactor: 0.9 },
            supportive: { rateFactor: 0.02, pitchFactor: 0.03, pauseFactor: 1.0 },
            encouraging: { rateFactor: 0.06, pitchFactor: 0.06, pauseFactor: 0.95 },
            confident: { rateFactor: -0.02, pitchFactor: 0.02, pauseFactor: 1.05 },
            neutral: { rateFactor: 0, pitchFactor: 0, pauseFactor: 1.0 }
        };

        return emotionalVariances[emotion] || emotionalVariances.neutral;
    }

    /**
     * Advanced emotion detection from text content
     * Similar to how Google Assistant, Apple Siri, and Copilot detect context
     */
    detectEmotion(text) {
        const lowerText = text.toLowerCase();
        
        // Excited/Energetic indicators
        if (/\!|\?\?|amazing|awesome|incredible|great|fantastic|excited|love|wow|wonderful|brilliant|perfect/i.test(text)) {
            return 'excited';
        }
        
        // Encouraging indicators
        if (/you can|believe|strong|capable|achieve|succeed|proud|well done|great job|keep going|progress/i.test(text)) {
            return 'encouraging';
        }
        
        // Calm/Soothing indicators
        if (/take your time|relax|breathe|no hurry|slowly|peace|calm|rest|comfortable|easy/i.test(text)) {
            return 'calm';
        }
        
        // Supportive indicators
        if (/I'm here|understand|hear you|with you|support|help|care|concern|matter|important/i.test(text)) {
            return 'supportive';
        }
        
        // Playful indicators
        if (/fun|play|laugh|joke|enjoy|party|celebrate|cool|awesome|haha|let's/i.test(text)) {
            return 'playful';
        }
        
        // Thoughtful indicators
        if (/think|consider|reflect|perhaps|maybe|wonder|curious|question|interesting|deeply/i.test(text)) {
            return 'thoughtful';
        }
        
        // Confident indicators
        if (/definitely|absolutely|certainly|confident|sure|clear|obvious|proven|verified|successful/i.test(text)) {
            return 'confident';
        }
        
        return 'supportive'; // Default
    }

    /**
     * Speak with full emotional and personality support
     * Enhanced with auto-emotion detection like Google Assistant/Copilot
     * Auto-detects emotion from text if not specified
     */
    speak(text, agent, emotion = 'auto', options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.synth) {
                reject(new Error('Speech Synthesis not available'));
                return;
            }

            // Cancel any ongoing speech
            this.synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            const voiceConfig = this.getVoiceConfig(agent);
            
            // Auto-detect emotion from text if set to 'auto'
            const finalEmotion = emotion === 'auto' ? this.detectEmotion(text) : emotion;
            const emotionConfig = voiceConfig.emotions[finalEmotion] || voiceConfig.emotions.supportive;
            const variance = this.getEmotionalVariance(finalEmotion);

            // Set voice
            const selectedVoice = this.selectVoice(voiceConfig.voiceHint);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Set rate and pitch with emotional variance
            utterance.rate = emotionConfig.rate + variance.rateFactor;
            utterance.pitch = emotionConfig.pitch + variance.pitchFactor;
            utterance.volume = voiceConfig.volume || options.volume || 1.0;
            utterance.lang = 'en-IN'; // Prioritize Indian English

            // Add natural pauses for better delivery (like major assistants)
            const textWithPauses = text
                .replace(/,/g, ', ')
                .replace(/\./g, '. ')
                .replace(/;/g, '; ')
                .replace(/\?/g, '? ');
            
            utterance.text = textWithPauses;

            // Callbacks
            utterance.onstart = () => {
                options.onStart && options.onStart();
            };

            utterance.onend = () => {
                options.onEnd && options.onEnd();
                resolve({ emotion: finalEmotion, agent: agent.name });
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                options.onError && options.onError(event);
                reject(event);
            };

            // Speak
            this.currentUtterance = utterance;
            this.synth.speak(utterance);
        });
    }

    /**
     * Stop current speech
     */
    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }

    /**
     * Pause speech
     */
    pause() {
        if (this.synth && this.synth.pause) {
            this.synth.pause();
        }
    }

    /**
     * Resume speech
     */
    resume() {
        if (this.synth && this.synth.resume) {
            this.synth.resume();
        }
    }

    /**
     * Check if currently speaking
     */
    isSpeaking() {
        return this.synth && this.synth.speaking;
    }

    /**
     * Preload voices to ensure they're ready
     */
    async loadVoices() {
        return new Promise((resolve) => {
            const voices = this.synth.getVoices();
            if (voices.length > 0) {
                resolve(voices);
            } else {
                this.synth.onvoiceschanged = () => {
                    resolve(this.synth.getVoices());
                };
            }
        });
    }
}

// Export singleton instance
export const ttsService = new IndianTTSService();
export default ttsService;
