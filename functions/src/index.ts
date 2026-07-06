import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Define the Groq API Key as a configuration parameter
// It will be loaded from the .env file in the functions directory
// or from Secret Manager in production if configured.
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

export const chatWithAITutor = onCall(
  {
    cors: true,
    secrets: [] // You can configure secrets here if using Google Secret Manager
  },
  async (request) => {
    // 1. Validate the user is authenticated (Optional but highly recommended)
    // if (!request.auth) {
    //   throw new HttpsError(
    //     "unauthenticated",
    //     "You must be logged in to chat with the AI Tutor."
    //   );
    // }

    const messages = request.data.messages;

    if (!messages || !Array.isArray(messages)) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with a 'messages' array."
      );
    }

    if (!GROQ_API_KEY) {
      logger.error("GROQ_API_KEY is not set in the environment.");
      throw new HttpsError(
        "internal",
        "The AI Tutor is currently unavailable (Missing API Key)."
      );
    }

    try {
      logger.info("Sending request to Groq API", { messageCount: messages.length });

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192", // Or whatever model you prefer
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        logger.error("Groq API Error", errorData);
        throw new HttpsError("internal", "Failed to get a response from Groq API.");
      }

      const data = await response.json();
      return {
        reply: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
      };
      
    } catch (error) {
      logger.error("Error communicating with Groq", error);
      throw new HttpsError("internal", "An error occurred while communicating with the AI.");
    }
  }
);
