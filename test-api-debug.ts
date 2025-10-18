import { SYSTEM_PROMPT } from "./src/systemPrompt";

async function testAPI() {
  const requestBody = {
    model: "geminisearch",
    referrer: "pppp",
    messages: [
      {
        role: "system" as const,
        content: SYSTEM_PROMPT,
      },
      {
        role: "user" as const,
        content: "Hello, what is your name?",
      },
    ],
  };

  console.log("System prompt length:", SYSTEM_PROMPT.length);
  console.log("System prompt first 200 chars:", SYSTEM_PROMPT.substring(0, 200));
  console.log("Full request body:", JSON.stringify(requestBody, null, 2).substring(0, 500));

  try {
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("\n✅ API Response:");
    console.log("Status:", response.status);
    console.log("Response content:", data.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testAPI();
