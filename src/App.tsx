import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLocalRuntime, type ChatModelAdapter } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { buildSystemPrompt } from "@/content/systemPrompt";
import { PromptConfig } from "@/components/PromptConfig";
import { NewConversationButton } from "@/components/NewConversationButton";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { localStorageHistoryAdapter } from "@/lib/localStorageHistoryAdapter";
import './App.css'

// Direct Pollinations API call - no backend needed
const pollinationsAdapter: ChatModelAdapter = {
  async run({ messages }) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    try {
      // Always use the current system prompt from localStorage (to pick up any edits)
      const currentPrompt = buildSystemPrompt();
      
      console.log(`[${requestId}] 📋 System prompt preview:`, currentPrompt.substring(0, 200) + "...");
      
      // Remove any existing system message and add the current one
      const userMessages = messages.filter(msg => msg.role !== "system");
      const messagesWithSystem = [
        { role: "system" as const, content: [{ type: "text" as const, text: currentPrompt }] },
        ...userMessages
      ];
      
      console.log(`[${requestId}] 📨 Message count: ${messagesWithSystem.length} (${userMessages.length} user messages)`);

      const requestBody = {
        model: "claudyclaude",
        referrer: "pppp",
        messages: messagesWithSystem.map(msg => ({
          role: msg.role,
          content: msg.content
            .filter(part => part.type === "text")
            .map(part => part.text)
            .join(""),
        })),
      };

      const bodyString = JSON.stringify(requestBody);
      const firstContent = messagesWithSystem[0]?.content[0];
      const firstPreview = firstContent && 'text' in firstContent 
        ? firstContent.text.substring(0, 100) + "..." 
        : "N/A";
      
      console.log(`[${requestId}] 🚀 Starting request`, {
        timestamp: new Date().toISOString(),
        messageCount: messagesWithSystem.length,
        bodySize: bodyString.length,
        firstMessagePreview: firstPreview,
      });

      const response = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        },
        body: bodyString,
      });

      const fetchTime = Date.now() - startTime;
      console.log(`[${requestId}] 📡 Response received (${fetchTime}ms)`, {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: {
          contentType: response.headers.get("content-type"),
          contentLength: response.headers.get("content-length"),
          cors: response.headers.get("access-control-allow-origin"),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[${requestId}] ❌ Response not OK`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      console.log(`[${requestId}] 📝 Parsing JSON...`);
      const data = await response.json();
      const parseTime = Date.now() - startTime;
      
      console.log(`[${requestId}] ✅ Success (${parseTime}ms total)`, {
        hasChoices: !!data.choices,
        choicesLength: data.choices?.length,
        hasError: !!data.error,
        responsePreview: data.choices?.[0]?.message?.content?.substring(0, 100) + "...",
      });

      const text = data.choices[0].message.content;

      return {
        content: [{ type: "text", text }],
      };
    } catch (error) {
      const errorTime = Date.now() - startTime;
      console.error(`[${requestId}] ❌ Error (${errorTime}ms)`, error);
      throw error;
    }
  },
};

function App() {
  const runtime = useLocalRuntime(pollinationsAdapter, {
    adapters: {
      history: localStorageHistoryAdapter,
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen flex flex-col bg-white dark:bg-slate-950">
        <div className="flex justify-between items-center px-4 py-3 border-b border-purple-200 dark:border-purple-800/50 bg-white dark:bg-slate-900 backdrop-blur-md shadow-sm">
          <NewConversationButton />
          <div className="flex items-center gap-2">
            <PromptConfig />
            <DarkModeToggle />
          </div>
        </div>
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}

export default App
