// Standalone test script for Pollinations API
import { SYSTEM_PROMPT } from "./src/systemPrompt";

const testMessages = [
  { role: "system" as const, content: SYSTEM_PROMPT },
  { role: "user" as const, content: "Explain Pythagoras theorem briefly" }
];

async function testAPI() {
  console.log("🚀 Testing Pollinations API...\n");
  
  const requestBody = {
    model: "openai-large",
    referrer: "pppp",
    messages: testMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
  };

  console.log("📤 Request body:", JSON.stringify(requestBody, null, 2).substring(0, 500) + "...\n");

  try {
    const response = await fetch("https://text-origin.pollinations.ai/openai", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    console.log("📡 Response status:", response.status, response.statusText);
    console.log("📋 Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error response:", errorText);
      process.exit(1);
    }

    const data = await response.json();
    console.log("\n✅ Success!");
    console.log("📝 Response:", JSON.stringify(data, null, 2));
    
    const message = data.choices?.[0]?.message?.content;
    if (message) {
      console.log("\n💬 Assistant message:");
      console.log(message);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testAPI();
