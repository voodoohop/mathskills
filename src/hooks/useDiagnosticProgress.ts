import { useState, useEffect } from "react";
import { useThread } from "@assistant-ui/react";
import type { DiagnosticProgress } from "@/components/DiagnosticProgressBar";

/**
 * Hook to extract and track diagnostic quiz progress from AI responses
 * Looks for <progress> XML tags in assistant messages
 */
export function useDiagnosticProgress() {
  const thread = useThread();
  const messages = thread.messages;
  const [progress, setProgress] = useState<DiagnosticProgress | null>(null);

  useEffect(() => {
    // Find the most recent assistant message
    const assistantMessages = messages.filter((msg: any) => msg.role === "assistant");
    const lastMessage = assistantMessages[assistantMessages.length - 1];

    if (!lastMessage) {
      setProgress(null);
      return;
    }

    // Extract text content from message
    const textContent = lastMessage.content
      .filter((part: any) => part.type === "text")
      .map((part: any) => part.text)
      .join("");

    // Parse progress XML tag
    const progressMatch = textContent.match(
      /<progress>\s*<current>(\d+)<\/current>\s*<total>(\d+)<\/total>\s*<correct>(\d+)<\/correct>\s*<incorrect>(\d+)<\/incorrect>\s*<\/progress>/
    );

    if (progressMatch) {
      const newProgress = {
        current: parseInt(progressMatch[1], 10),
        total: parseInt(progressMatch[2], 10),
        correct: parseInt(progressMatch[3], 10),
        incorrect: parseInt(progressMatch[4], 10),
      };
      
      // Only update if values actually changed
      setProgress((prev) => {
        if (!prev || 
            prev.current !== newProgress.current ||
            prev.correct !== newProgress.correct ||
            prev.incorrect !== newProgress.incorrect) {
          return newProgress;
        }
        return prev;
      });
    } else {
      // No progress tag found - clear progress
      setProgress(null);
    }
  }, [messages]);

  return progress;
}
