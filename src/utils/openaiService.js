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

// ✅ Add back for ApiConfigurationSection.jsx
export async function testOpenAIConnection() {
  try {
    const response = await client.models.list();
    return response.data.length > 0;
  } catch (error) {
    console.error("API connection test failed:", error);
    return false;
  }
}

// ✅ Add for index.jsx
export async function generatePresentationStructure(topic) {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert presentation creator. Generate a slide structure.",
        },
        {
          role: "user",
          content: `Generate a structured presentation outline for the topic: ${topic}.
                    Return JSON with 'title' and 'slides' (each slide should have 'heading' and 'points').`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating presentation structure:", error);
    throw error;
  }
}
