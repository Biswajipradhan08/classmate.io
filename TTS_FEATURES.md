# 🎙️ Indian TTS Integration - Feature Overview

## What's New

Your Classmate.io application now features **advanced Text-to-Speech (TTS) powered by Indian-specific voice synthesis**. This creates a more personal, engaging experience with:

### Key Features

✨ **5 Unique Agent Voices** - Each with distinct personality and gender-aware delivery
- **Luna** (Female) - Gentle & Calming
- **Nova** (Female) - Energetic & Enthusiastic  
- **Atlas** (Male) - Confident & Guiding
- **Sage** (Male) - Wise & Thoughtful
- **Spark** (Male) - Playful & Friendly

🎭 **6 Emotional States** - Adaptive voice modulation for natural-sounding speech
- 😊 Supportive
- 🎉 Encouraging
- 🧘 Calm
- 🚀 Excited
- 💭 Thoughtful
- 😄 Playful

🗣️ **Indian English Optimization** - Voices tuned for Indian subcontinent demographics
- Gender-aware voice selection
- Optimized for Indian English (en-IN)
- Natural pacing and pronunciation
- Non-robotic, human-like delivery

## How It Works

### 1. **Voice Selection**
Each agent has a configured voice profile that includes:
- Base speech rate (speed of delivery)
- Base pitch (tone - higher for feminine, lower for masculine)
- Emotional variation ranges
- Gender hint for voice selection

### 2. **Emotion Modulation**
When an agent speaks, the TTS service:
- Analyzes the context to determine appropriate emotion
- Adjusts speech rate and pitch based on emotion
- Adds natural variance to prevent robotic sound
- Applies emotion-specific delivery patterns

### 3. **Agent Differentiation**
Each agent sounds distinctly different:
- **Luna**: Slow, soothing, high pitch - very calming presence
- **Nova**: Fast, energetic, higher pitch - exciting and motivating
- **Atlas**: Steady, confident, lower pitch - secure and reliable
- **Sage**: Measured, thoughtful, deeper tone - wise and reflective
- **Spark**: Upbeat, friendly, moderately high pitch - fun and playful

## Where It's Used

### Currently Active
- ✅ **Onboarding** - Initial buddy selection and commitment messaging
- ✅ **Question Asking** - Each question read with appropriate emotion
- ✅ **Completion Message** - Supportive message after onboarding

### Available for Integration
- Dashboard interactions and guidance
- Assessment instructions and feedback
- Counselor booking assistance
- General guidance and encouragement

## Configuration

### For Developers

All TTS logic is centralized in:
- `src/services/ttsService.js` - Core TTS engine with voice profiles
- `src/hooks/useTTS.js` - React hook for easy integration
- `src/components/TTSExample.jsx` - Example implementation

### Customizing Agent Voices

Edit `src/services/ttsService.js` → `getVoiceConfig()` method:

```javascript
'NewAgent': {
    gender: 'male',                    // or 'female'
    personality: 'Your Description',
    baseRate: 0.90,                    // 0.5 (slow) to 2.0 (fast)
    basePitch: 0.85,                   // 0.5 (low) to 2.0 (high)
    emotions: {
        'calm': { rate: 0.80, pitch: 0.80, variance: 0.05 },
        'supportive': { rate: 0.90, pitch: 0.85, variance: 0.07 },
        // ... other emotions
    },
    voiceHint: 'male'                  // or 'female'
}
```

### Using TTS in Your Components

```javascript
import useTTS from '../hooks/useTTS';

function MyComponent({ buddy }) {
    const { speak, isSpeaking, stop } = useTTS();

    const handleSpeak = async () => {
        await speak(
            'Hello! How are you today?',
            buddy,
            'supportive',  // emotion
            { 
                onEnd: () => console.log('Done speaking')
            }
        );
    };

    return (
        <div>
            <button onClick={handleSpeak} disabled={isSpeaking}>
                {isSpeaking ? 'Speaking...' : 'Hear it!'}
            </button>
        </div>
    );
}
```

## Audio Voices Available

The TTS service automatically:

1. **Detects available voices** on the device
2. **Prioritizes high-quality voices**:
   - Google High Quality voices (best)
   - English voices with Indian accent support
   - System English voices (fallback)
3. **Filters by gender** when possible
4. **Sets language to Indian English** (`en-IN`)

### Best Voice Experience

- **Chrome/Chromium** - Best quality voices (Google's high-quality voices)
- **Edge** - Good quality (Chromium-based)
- **Firefox** - Good quality
- **Safari** - Supported (iOS 14.5+)

## Emotion System

### How Emotions Work

Each emotion modifies the base voice:

| Emotion | Rate Change | Pitch Change | Effect |
|---------|------------|-------------|--------|
| **calm** | -5% | -2% | Soothing, slow |
| **supportive** | +2% | +3% | Caring, steady |
| **encouraging** | +5% | +5% | Motivating |
| **excited** | +10% | +10% | Energetic |
| **thoughtful** | -8% | -3% | Reflective |
| **playful** | +8% | +8% | Fun, light |

### Context-Based Emotion Detection

The system intelligently detects emotions from message content:

```javascript
- "Hi! Let's get started!" → 'encouraging'
- "Take your time, relax" → 'calm'
- "That's amazing!" → 'excited'
- "I'm here for you" → 'supportive'
```

## Performance

- **Load Time**: First voice load ~100-200ms
- **Speak Time**: Depends on text length (natural speed)
- **Memory**: Minimal impact, voices are system resources
- **Async**: Non-blocking, doesn't freeze UI
- **Multiple Agents**: Different voices don't conflict

## Browser Compatibility

| Browser | Support | Quality |
|---------|---------|---------|
| Chrome | ✅ Full | 🌟🌟🌟 Excellent |
| Edge | ✅ Full | 🌟🌟🌟 Excellent |
| Firefox | ✅ Full | 🌟🌟 Good |
| Safari | ✅ Full | 🌟🌟 Good |
| Mobile | ✅ Full | 🌟🌟 Good (varies) |

## Accessibility Features

- 🔇 **Mute Toggle**: Users can disable voice with single click
- 🎚️ **Volume Control**: Adjustable volume in TTS service
- ⏸️ **Pause/Resume**: Users can pause and resume speech
- 🛑 **Stop Button**: Immediate halt to speaking
- 📱 **Keyboard Support**: Can trigger speech with keyboard events

## Future Enhancements

We're planning to add:

- **Premium TTS APIs** (Google Cloud Speech, AWS Polly) for studio-quality voices
- **Regional Language Support** (Hindi, Tamil, Telugu, Bengali, etc.)
- **Contextual Voice Tone** - Based on user emotional signals
- **Audio Recording** - Record buddy responses and play back
- **Voice Analytics** - Track which voices and emotions users prefer
- **Custom Voice Training** - Per-agent voice customization
- **Real-time Speech Recognition** - Better handling of user speech input
- **Multilingual Support** - Seamless switching between languages

## Troubleshooting

### No Sound Output
1. Check system volume settings
2. Verify browser speech synthesis is enabled
3. Check browser console for errors (F12)
4. Try with Google Chrome (best support)

### Robotic or Unnatural Sound
- This is automatically addressed with emotion system
- Different agents have varied base settings
- System voices on device determine final quality
- Chrome typically has best voice variety

### Wrong Accent/Voice
- Voice selection depends on installed system voices
- Update your OS for better voice options
- Chrome browser typically has more voice options
- Indian English voices are prioritized when available

### Speech Not Playing After Selection
- Enable sound in browser settings
- Clear browser cache
- Try incognito/private mode
- Verify Text-to-Speech is enabled in accessibility settings

## Technical Details

### Architecture

```
Onboarding.jsx / Other Components
    ↓
useTTS Hook (React wrapper)
    ↓
ttsService (Core engine)
    ↓
Web Speech API + Voice Selection
    ↓
System Text-to-Speech Engine
    ↓
Audio Output
```

### Voice Selection Priority

1. Agent's preferred voice gender
2. Google High Quality voices
3. English voices with Indian support  
4. Any English voice available
5. System default voice (fallback)

### Emotion Application

1. Detect emotion from context
2. Get emotion config for agent
3. Add emotional variance
4. Apply to speech utterance
5. Deliver with personality

## API Reference

### ttsService

```javascript
import ttsService from '../services/ttsService';

// Speak with emotion
await ttsService.speak(
    text,              // string to speak
    agent,             // buddy object
    emotion,           // 'supportive', 'encouraging', etc.
    {                  // options
        onStart: () => {},
        onEnd: () => {},
        onError: (error) => {},
        volume: 1.0
    }
);

// Control speech
ttsService.stop();      // Stop current speech
ttsService.pause();     // Pause speech
ttsService.resume();    // Resume speech
ttsService.isSpeaking(); // Check if currently speaking
```

### useTTS Hook

```javascript
const {
    speak,              // Function to trigger speech
    stop,               // Function to stop speech
    pause,              // Function to pause speech
    resume,             // Function to resume speech
    isSpeaking,         // Boolean: is currently speaking
    isEnabled,          // Boolean: is TTS enabled
    toggleTTS           // Function to toggle TTS on/off
} = useTTS();
```

## Support

For issues or feature requests related to TTS:
1. Check this documentation
2. Review the voice configuration guide
3. Check browser console for errors
4. Test with example component: `TTSExample.jsx`
5. Contact development team with browser/OS details

---

**Built with ❤️ for Indian users • Optimized for natural, emotional communication**
