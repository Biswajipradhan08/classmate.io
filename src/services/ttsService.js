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
     */
    getVoiceConfig(agent) {
        const baseConfigs = {
            // Female agents
            'Luna': {
                gender: 'female',
                personality: 'Gentle & Calming',
                baseRate: 0.85,
                basePitch: 1.15,
                emotions: {
                    calm: { rate: 0.80, pitch: 1.10, variance: 0.05 },
                    supportive: { rate: 0.85, pitch: 1.15, variance: 0.07 },
                    encouraging: { rate: 0.90, pitch: 1.20, variance: 0.10 },
                    playful: { rate: 0.95, pitch: 1.25, variance: 0.12 }
                },
                voiceHint: 'female'
            },
            'Nova': {
                gender: 'female',
                personality: 'Energetic & Enthusiastic',
                baseRate: 1.0,
                basePitch: 1.25,
                emotions: {
                    excited: { rate: 1.05, pitch: 1.30, variance: 0.15 },
                    encouraging: { rate: 1.0, pitch: 1.25, variance: 0.12 },
                    calm: { rate: 0.90, pitch: 1.15, variance: 0.08 },
                    supportive: { rate: 0.95, pitch: 1.20, variance: 0.10 }
                },
                voiceHint: 'female'
            },
            // Male agents
            'Atlas': {
                gender: 'male',
                personality: 'Confident & Guiding',
                baseRate: 0.90,
                basePitch: 0.85,
                emotions: {
                    confident: { rate: 0.88, pitch: 0.83, variance: 0.05 },
                    supportive: { rate: 0.90, pitch: 0.85, variance: 0.07 },
                    encouraging: { rate: 0.92, pitch: 0.87, variance: 0.08 },
                    calm: { rate: 0.85, pitch: 0.82, variance: 0.06 }
                },
                voiceHint: 'male'
            },
            'Sage': {
                gender: 'male',
                personality: 'Wise & Thoughtful',
                baseRate: 0.85,
                basePitch: 0.80,
                emotions: {
                    thoughtful: { rate: 0.80, pitch: 0.78, variance: 0.04 },
                    supportive: { rate: 0.85, pitch: 0.80, variance: 0.06 },
                    encouraging: { rate: 0.88, pitch: 0.82, variance: 0.07 },
                    calm: { rate: 0.82, pitch: 0.78, variance: 0.05 }
                },
                voiceHint: 'male'
            },
            'Spark': {
                gender: 'male',
                personality: 'Playful & Friendly',
                baseRate: 0.95,
                basePitch: 1.05,
                emotions: {
                    playful: { rate: 1.0, pitch: 1.10, variance: 0.12 },
                    encouraging: { rate: 0.95, pitch: 1.05, variance: 0.10 },
                    supportive: { rate: 0.90, pitch: 1.00, variance: 0.08 },
                    excited: { rate: 1.05, pitch: 1.15, variance: 0.15 }
                },
                voiceHint: 'male'
            }
        };

        return baseConfigs[agent.name] || baseConfigs['Atlas'];
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
     */
    getEmotionalVariance(emotion = 'neutral') {
        const emotionalVariances = {
            calm: { rateFactor: -0.05, pitchFactor: -0.02 },
            excited: { rateFactor: 0.1, pitchFactor: 0.1 },
            thoughtful: { rateFactor: -0.08, pitchFactor: -0.03 },
            playful: { rateFactor: 0.08, pitchFactor: 0.08 },
            supportive: { rateFactor: 0.02, pitchFactor: 0.03 },
            encouraging: { rateFactor: 0.05, pitchFactor: 0.05 },
            neutral: { rateFactor: 0, pitchFactor: 0 }
        };

        return emotionalVariances[emotion] || emotionalVariances.neutral;
    }

    /**
     * Speak with full emotional and personality support
     */
    speak(text, agent, emotion = 'neutral', options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.synth) {
                reject(new Error('Speech Synthesis not available'));
                return;
            }

            // Cancel any ongoing speech
            this.synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            const voiceConfig = this.getVoiceConfig(agent);
            const emotionConfig = voiceConfig.emotions[emotion] || voiceConfig.emotions.supportive;
            const variance = this.getEmotionalVariance(emotion);

            // Set voice
            const selectedVoice = this.selectVoice(voiceConfig.voiceHint);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Set rate and pitch with emotional variance
            utterance.rate = emotionConfig.rate + variance.rateFactor;
            utterance.pitch = emotionConfig.pitch + variance.pitchFactor;
            utterance.volume = options.volume || 1.0;
            utterance.lang = 'en-IN'; // Prioritize Indian English

            // Add natural pauses for comma and period
            const textWithPauses = text
                .replace(/,/g, ', ')
                .replace(/\./g, '. ');
            
            utterance.text = textWithPauses;

            // Callbacks
            utterance.onstart = () => {
                options.onStart && options.onStart();
            };

            utterance.onend = () => {
                options.onEnd && options.onEnd();
                resolve();
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
