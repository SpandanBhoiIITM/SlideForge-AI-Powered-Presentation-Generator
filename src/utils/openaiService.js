import OpenAI from "openai";

// Use OpenRouter API instead of direct OpenAI
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Stream chat response
export async function generateChatCompletion(userMessage) {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", // you can change model here
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: userMessage },
      ],
      stream: true,
    });

    const decoder = new TextDecoder();
    let fullResponse = "";

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    throw error;
  }
}
