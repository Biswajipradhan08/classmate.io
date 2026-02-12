const axios = require('axios');

const GOOGLE_TTS_URL = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize';

// Avatar Voice Mapping (Chirp / Journey Voices)
const VOICE_MAP = {
    'Luna': { name: 'en-US-Journey-F', gender: 'FEMALE' },
    'Atlas': { name: 'en-US-Journey-D', gender: 'MALE' },
    'Nova': { name: 'en-US-Journey-O', gender: 'FEMALE' },
    'Sage': { name: 'en-US-Studio-M', gender: 'MALE' }, // Studio fallback for variety
    'Spark': { name: 'en-US-Studio-Q', gender: 'MALE' }
};

exports.synthesizeSpeech = async (text, avatar = 'Luna') => {
    const voiceConfig = VOICE_MAP[avatar] || VOICE_MAP['Luna'];

    // Emotion mapping to SSML (simplified)
    // Chirp models infer emotion from text context, but we can hint via SSML if needed
    // For now, sending plain text to let the model do the work

    const payload = {
        input: { text },
        voice: {
            languageCode: 'en-US',
            name: voiceConfig.name,
            ssmlGender: voiceConfig.gender
        },
        audioConfig: {
            audioEncoding: 'MP3'
        }
    };

    try {
        const response = await axios.post(`${GOOGLE_TTS_URL}?key=${process.env.GOOGLE_TTS_API_KEY}`, payload);
        return response.data.audioContent; // Base64 encoded audio
    } catch (error) {
        console.error('Google TTS Error:', error.response?.data || error.message);
        throw error;
    }
};
