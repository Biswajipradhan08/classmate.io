# Indian TTS Voice Configuration Guide

## Overview

The Classmate.io app now features advanced Text-to-Speech (TTS) with Indian-specific voice synthesis that provides:

- **Gender-aware voice selection** - Different voices based on agent gender
- **Emotion-based speech** - Varies tone, pitch, and rate based on emotional context
- **Natural Indian English** - Optimized for Indian subcontinent demographics
- **Non-robotic delivery** - Each agent has unique personality and speech patterns

## Agent Voice Profiles

### Female Agents

#### Luna - "Gentle & Calming"
- **Gender**: Female
- **Base Rate**: 0.85 (slower, soothing)
- **Base Pitch**: 1.15 (slightly higher)
- **Emotions**:
  - Calm: Very gentle and soothing
  - Supportive: Caring and encouraging
  - Encouraging: Slightly more energetic
  - Playful: Light and friendly

#### Nova - "Energetic & Enthusiastic"
- **Gender**: Female
- **Base Rate**: 1.0 (normal to fast)
- **Base Pitch**: 1.25 (higher energy)
- **Emotions**:
  - Excited: Very enthusiastic and fast
  - Encouraging: Positive and uplifting
  - Calm: Still friendly but more measured
  - Supportive: Caring with energy

### Male Agents

#### Atlas - "Confident & Guiding"
- **Gender**: Male
- **Base Rate**: 0.90 (steady)
- **Base Pitch**: 0.85 (confident, lower tone)
- **Emotions**:
  - Confident: Strong and assured
  - Supportive: Caring and steady
  - Encouraging: Motivating tone
  - Calm: Reassuring presence

#### Sage - "Wise & Thoughtful"
- **Gender**: Male
- **Base Rate**: 0.85 (measured, thoughtful)
- **Base Pitch**: 0.80 (reflective, deeper)
- **Emotions**:
  - Thoughtful: Contemplative and measured
  - Supportive: Understanding and patient
  - Encouraging: Inspiring with wisdom
  - Calm: Peaceful and centered

#### Spark - "Playful & Friendly"
- **Gender**: Male
- **Base Rate**: 0.95 (upbeat)
- **Base Pitch**: 1.05 (friendly, slightly higher)
- **Emotions**:
  - Playful: Fun and lighthearted
  - Encouraging: Motivating and fun
  - Supportive: Friendly and helpful
  - Excited: Very enthusiastic

## Available Emotions

Each emotion modifies the base voice settings:

1. **calm** - For relaxing, reassuring contexts
   - Slower speech rate
   - Slightly lower pitch
   - Creates soothing atmosphere

2. **supportive** - For encouragement and comfort
   - Steady, confident delivery
   - Natural tone
   - Caring undertone

3. **encouraging** - For motivation and pushing forward
   - Slightly faster speech
   - Slightly higher pitch
   - Energy and positivity

4. **excited** - For celebrations and positive moments
   - Fast speech rate
   - Higher pitch
   - Enthusiastic delivery

5. **thoughtful** - For reflective moments
   - Slower delivery
   - Measured pauses
   - Deeper contemplation

6. **playful** - For light, fun interactions
   - Upbeat speech
   - Higher pitch
   - Friendly tone

## Voice Selection Logic

The TTS service automatically:

1. **Selects voice based on gender preference**
   - Prioritizes voices matching the agent's gender
   - Falls back to English voices if specific gendered voice unavailable
   - Uses Google high-quality voices when available

2. **Optimizes for Indian English**
   - Sets language to `en-IN` (Indian English)
   - Filters for voices supporting Indian subcontinent
   - Uses Google voices which support Indian accent

3. **Applies emotional modulation**
   - Detects emotion from context
   - Applies rate and pitch adjustments
   - Adds natural variance for non-robotic sound

## Usage Examples

### In Onboarding
```javascript
// Automatically detects emotion and applies it
await ttsService.speak(
    "Hi there! Let's get started!",
    buddy,           // Agent object (Luna, Atlas, etc.)
    'encouraging',   // Emotion
    { onEnd: callback }
);
```

### In Dashboard or Other Components
```javascript
// Import the service
import ttsService from '../services/ttsService';

// Use in your component
const handleSpeak = async (message) => {
    try {
        await ttsService.speak(message, buddy, 'supportive');
    } catch (error) {
        console.error('Speech failed:', error);
    }
};
```

## Customization

### Modify Agent Voice Properties

Edit `src/services/ttsService.js` in the `getVoiceConfig()` method:

```javascript
'YourAgentName': {
    gender: 'male|female',
    personality: 'Description',
    baseRate: 0.85,    // 0.5-2.0 (slower to faster)
    basePitch: 1.0,    // 0.5-2.0 (lower to higher)
    emotions: {
        'emotionName': {
            rate: 0.90,
            pitch: 1.1,
            variance: 0.05
        }
    },
    voiceHint: 'male|female'
}
```

### Add New Emotions

1. Add to agent's emotions object
2. Add variance to `getEmotionalVariance()` method
3. Use in speech calls

### Voice Selection

Modify `selectVoice()` method in `ttsService.js` to change voice filtering logic.

## Browser Compatibility

- **Chrome/Edge**: Full support with best voice quality
- **Firefox**: Supported
- **Safari**: Supported (iOS 14.5+)
- **Mobile**: Voice quality varies by OS and available system voices

## Performance Notes

- First voice load may take 100-200ms
- Subsequent calls are faster (cached)
- Speech generation is non-blocking (async)
- Multiple agents can have different voices on same device

## Troubleshooting

### No Sound
1. Check browser volume settings
2. Verify system text-to-speech is enabled
3. Check console for errors
4. Test with simple text first

### Robotic Sound
- Emotion is already applied to vary pitch/rate
- Try different agents (different base settings)
- Check device voice availability (Chrome works best)

### Wrong Voice/Accent
- Voice depends on system availability
- Google Chrome typically has best voice options
- Voice selection prioritizes Indian English when available

## Future Enhancements

- [ ] Integration with premium TTS APIs (Google Cloud, AWS Polly) for studio-quality voices
- [ ] Hindi/Regional language support
- [ ] Voice modulation based on user response sentiment
- [ ] Audio recording and playback of buddy responses
- [ ] Custom voice training per agent
