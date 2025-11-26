import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ScenarioContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const wordSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    english: { type: Type.STRING, description: "The English vocabulary word." },
    chinese: { type: Type.STRING, description: "The concise Chinese meaning." },
    pronunciation: { type: Type.STRING, description: "IPA pronunciation guide." }
  },
  required: ["english", "chinese"],
};

const scenarioResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "The name of the scenario." },
    words: {
      type: Type.ARRAY,
      items: wordSchema,
      description: "A list of 10-15 essential vocabulary words for this scenario."
    },
    connectedText: {
      type: Type.STRING,
      description: "A natural, coherent paragraph or dialogue (approx 100-150 words) that uses ALL the listed words in context. Highlight the vocabulary words if possible (plain text is fine)."
    },
    translation: {
      type: Type.STRING,
      description: "The Chinese translation of the connected text."
    }
  },
  required: ["topic", "words", "connectedText", "translation"],
};

export const generateScenarioData = async (scenarioName: string): Promise<ScenarioContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate an English learning lesson for the scenario: "${scenarioName}".
      1. List 10-12 useful/common words specific to this setting.
      2. Write a short, engaging story or practical dialogue that naturally uses these words so the learner understands the context.
      3. Ensure the tone is practical for daily life or travel.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: scenarioResponseSchema,
        systemInstruction: "You are an expert ESL teacher designed to help Chinese speakers learn practical scenario-based English.",
        temperature: 0.5, // Balance creativity with accuracy
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as ScenarioContent;
  } catch (error) {
    console.error("Error generating scenario:", error);
    throw error;
  }
};
