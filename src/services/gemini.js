import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the model
// Note: We'll handle the missing API key in the UI
let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

export const initializeGemini = (key) => {
    genAI = new GoogleGenerativeAI(key);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const getDefinition = async (word) => {
    if (!model) {
        throw new Error("API_KEY_MISSING");
    }

    const prompt = `
    Provide a comprehensive dictionary definition for the word "${word}".
    Return the response in the following JSON format ONLY, without any markdown formatting:
    {
      "word": "${word}",
      "phonetic": "phonetic spelling",
      "partOfSpeech": "noun/verb/adj",
      "definition": "Primary clear, concise definition.",
      "multipleMeanings": [
        { "partOfSpeech": "verb", "definition": "Secondary definition." }
      ],
      "example": "A sentence showing the word in context.",
      "synonyms": ["synonym1", "synonym2"],
      "antonyms": ["antonym1", "antonym2"],
      "etymology": "Brief origin and history of the word.",
      "idioms": ["idiom 1", "idiom 2"]
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching definition:", error);
        throw error;
    }
};
