// Standalone test script for Pollinations API
import { SYSTEM_PROMPT } from "./src/systemPrompt";

const testMessages = [
  { role: "system" as const, content: SYSTEM_PROMPT },
  { role: "user" as const, content: "Hello, what is your name and what should we do first? (force cache miss)" }
];

async function testAPI() {
  console.log("🚀 Testing Pollinations API...\n");
  console.log("System prompt length:", SYSTEM_PROMPT.length);
  console.log("System prompt first 300 chars:", SYSTEM_PROMPT.substring(0, 300));
  console.log("System prompt last 300 chars:", SYSTEM_PROMPT.substring(SYSTEM_PROMPT.length - 300));
  
  const requestBody = {
    model: "gemini",
    referrer: "pppp",
    messages: testMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
  };

  const bodyString = JSON.stringify(requestBody);
  console.log("📤 Request body size:", bodyString.length, "bytes");
  console.log("📤 Full request body:", bodyString.substring(0, 1000) + "...\n");

  try {
    console.log("📤 Sending to: https://text-origin.pollinations.ai/openai\n");
    const response = await fetch("https://text-origin.pollinations.ai/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      },
      body: bodyString,
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
