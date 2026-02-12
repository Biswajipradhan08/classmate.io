class VoiceService {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.voices = [];
        this.preferredVoice = null;

        if (this.synthesis) {
            this.synthesis.onvoiceschanged = () => {
                this.voices = this.synthesis.getVoices();
                this.selectVoice();
            };
        }
    }

    selectVoice() {
        // Try to find a "Google" voice or a female voice for "Luna" / "Nova"
        // In a real integration, we'd use ElevenLabs API here
        this.preferredVoice = this.voices.find(v => v.name.includes('Google') && v.name.includes('Female'))
            || this.voices.find(v => v.name.includes('Samantha'))
            || this.voices[0];
    }

    async speak(text, emotion = 'neutral', avatar = 'Luna') {
        // Try backend TTS first (for production with API keys)
        try {
            const response = await fetch('http://localhost:5000/api/voice/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, emotion, avatar })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.audioContent) {
                    const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
                    audio.play();
                    return;
                }
            }
        } catch (error) {
            console.log('Backend TTS unavailable, using enhanced browser synthesis');
        }

        // Enhanced Browser Synthesis with Advanced Modulation
        if (!this.synthesis) return;

        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Select optimal voice based on avatar gender
        const preferredVoices = this.selectVoiceByAvatar(avatar);
        if (preferredVoices.length > 0) {
            utterance.voice = preferredVoices[0];
        }

        // Advanced emotion-based prosody modulation
        const emotionConfig = this.getEmotionConfig(emotion);
        utterance.pitch = emotionConfig.pitch;
        utterance.rate = emotionConfig.rate;
        utterance.volume = emotionConfig.volume;

        // Add subtle variations for naturalness
        utterance.pitch += (Math.random() * 0.1 - 0.05);
        utterance.rate += (Math.random() * 0.1 - 0.05);

        // Speak with enhanced settings
        this.synthesis.speak(utterance);
    }

    // Select voice based on avatar gender and quality
    selectVoiceByAvatar(avatar) {
        const voices = this.synthesis.getVoices();
        const avatarGender = this.getAvatarGender(avatar);

        // Priority list: Enhanced voices > Google voices > Native voices
        const voicePriority = [
            'Google UK English Female',
            'Google US English Female',
            'Google UK English Male',
            'Google US English Male',
            'Microsoft Zira',
            'Microsoft David',
            'Alex',
            'Samantha',
            'Karen'
        ];

        // Filter by gender
        let filteredVoices = voices.filter(v => {
            const voiceName = v.name.toLowerCase();
            if (avatarGender === 'female') {
                return voiceName.includes('female') || voiceName.includes('woman') ||
                    ['samantha', 'karen', 'victoria', 'zira'].some(n => voiceName.includes(n));
            } else {
                return voiceName.includes('male') || voiceName.includes('man') ||
                    ['alex', 'david', 'daniel', 'james'].some(n => voiceName.includes(n));
            }
        });

        // Sort by priority
        filteredVoices.sort((a, b) => {
            const aIndex = voicePriority.findIndex(p => a.name.includes(p));
            const bIndex = voicePriority.findIndex(p => b.name.includes(p));
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });

        return filteredVoices;
    }

    getAvatarGender(avatar) {
        const femaleAvatars = ['Luna', 'Nova'];
        return femaleAvatars.includes(avatar) ? 'female' : 'male';
    }

    // Enhanced emotion configuration with realistic prosody
    getEmotionConfig(emotion) {
        const configs = {
            happy: { pitch: 1.15, rate: 1.05, volume: 0.95 },
            excited: { pitch: 1.25, rate: 1.15, volume: 1.0 },
            calm: { pitch: 0.95, rate: 0.90, volume: 0.85 },
            sad: { pitch: 0.85, rate: 0.85, volume: 0.80 },
            angry: { pitch: 0.90, rate: 1.10, volume: 0.95 },
            surprised: { pitch: 1.30, rate: 1.20, volume: 0.90 },
            neutral: { pitch: 1.0, rate: 1.0, volume: 0.90 },
            encouraging: { pitch: 1.10, rate: 0.95, volume: 0.90 },
            thoughtful: { pitch: 0.98, rate: 0.88, volume: 0.85 }
        };
        return configs[emotion] || configs.neutral;
    }

    listen(callback) {
        if (!this.recognition) {
            console.warn("Speech recognition not supported");
            return;
        }

        const recognizer = new this.recognition();
        recognizer.continuous = false;
        recognizer.interimResults = false;
        recognizer.lang = 'en-US';

        recognizer.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            callback(transcript);
        };

        recognizer.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };

        recognizer.start();
    }
}

export const voiceService = new VoiceService();
