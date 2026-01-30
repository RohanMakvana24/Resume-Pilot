import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/config";

// Initialize OpenAI Client
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Dev only
});

// Generate AI Text
export const AIChatSession = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Corrected model name
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 2048,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error; // Rethrowing allows your component to catch and show a UI error
  }
};
