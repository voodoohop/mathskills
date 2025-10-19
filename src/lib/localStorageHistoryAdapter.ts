// Simple localStorage adapter for conversation persistence
const STORAGE_KEY = 'mathskills_conversation';

export const localStorageHistoryAdapter = {
  async load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { messages: [] };
      const { messages } = JSON.parse(stored);
      return { messages };
    } catch (error) {
      console.warn('Failed to load conversation:', error);
      return { messages: [] };
    }
  },

  async append(message: unknown) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : { messages: [] };
      data.messages.push(message);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save message:', error);
    }
  },
};
