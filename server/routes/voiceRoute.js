const router = require('express').Router();
const googleVoiceService = require('../services/googleVoiceService');

router.post('/speak', async (req, res) => {
    try {
        const { text, avatar, emotion } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Call the service to get audio content (base64 or buffer)
        // Assuming the service returns the audio content directly or an object with audioContent
        const audioContent = await googleVoiceService.synthesizeSpeech(text, avatar, emotion);

        // If the service returns base64, we can send it as JSON
        // If it returns a buffer, we might want to stream it or send as base64

        res.json({ audioContent });
    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).json({ error: 'Failed to synthesize speech' });
    }
});

module.exports = router;
