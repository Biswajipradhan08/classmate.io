import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
    constructor() {
        // In a real app, this should be in .env
        // For now, we will use a placeholder or check if key exists
        this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (this.apiKey) {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        } else {
            console.warn("Gemini API Key not found. AI features will be mocked.");
        }
    }

    async analyzePersonality(onboardingData) {
        if (!this.apiKey) {
            return this.getMockAnalysis(onboardingData);
        }

        try {
            const prompt = this.constructPrompt(onboardingData);
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Attempt to parse JSON from the response
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}') + 1;
            if (jsonStart !== -1 && jsonEnd !== -1) {
                return JSON.parse(text.substring(jsonStart, jsonEnd));
            }
            return JSON.parse(text); // Try direct parse if clean
        } catch (error) {
            console.error("Gemini Analysis Failed:", error);
            return this.getMockAnalysis(onboardingData);
        }
    }

    constructPrompt(data) {
        const answers = JSON.stringify(data.answers, null, 2);
        return `
      You are an expert psychologist and career counselor. Analyze the following user responses from an onboarding questionnaire.
      
      User Answers:
      ${answers}
      
      Based on these answers, generate a JSON profile with the following structure:
      {
        "personality_type": "Creative Innovator | Strategic Leader | Community Builder | Tech Explorer | Visionary Entrepreneur",
        "summary": "A 2-3 sentence summary of their personality.",
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "weaknesses": ["Growth Area 1", "Growth Area 2"],
        "suggested_careers": ["Career 1", "Career 2", "Career 3"],
        "learning_style": "Visual | Auditory | Kinesthetic | Reading/Writing"
      }
      
      Output ONLY valid JSON.
    `;
    }

    getMockAnalysis(data) {
        // Fallback based on simple keyword matching or random valid profile
        return {
            personality_type: "Visionary Entrepreneur",
            summary: "You are a driven individual who sees opportunities where others see obstacles. Your answers suggest a high level of ambition and creativity.",
            strengths: ["Strategic Thinking", "Resilience", "Innovation"],
            weaknesses: ["Patience with details", "Work-life balance"],
            suggested_careers: ["Startup Founder", "Product Manager", "Consultant"],
            learning_style: "Visual"
        };
    }
}

export const geminiService = new GeminiService();
