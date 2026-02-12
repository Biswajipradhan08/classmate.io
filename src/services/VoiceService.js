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
        // Try backend TTS first (Google Cloud / ElevenLabs)
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
            console.warn('Backend TTS failed, falling back to browser synthesis:', error);
        }

        // Fallback to Browser Synthesis
        if (!this.synthesis) return;

        // Cancel any current speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        if (this.preferredVoice) {
            utterance.voice = this.preferredVoice;
        }

        // Adjust prosody based on emotion (heuristic)
        switch (emotion) {
            case 'excited':
                utterance.pitch = 1.2;
                utterance.rate = 1.1;
                break;
            case 'calm':
            case 'soothing':
                utterance.pitch = 0.9;
                utterance.rate = 0.9;
                break;
            case 'sad':
                utterance.pitch = 0.8;
                utterance.rate = 0.8;
                break;
            default:
                utterance.pitch = 1.0;
                utterance.rate = 1.0;
        }

        this.synthesis.speak(utterance);
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
