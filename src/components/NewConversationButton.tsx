import { PrimaryButton } from '@/components/PrimaryButton';

const STORAGE_KEY = 'mathskills_conversation';

export function NewConversationButton() {
  const handleNewConversation = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    
    // Reload the page to start fresh
    window.location.reload();
  };

  return (
    <PrimaryButton
      onClick={handleNewConversation}
      ariaLabel="Start new conversation"
    >
      <span style={{ fontSize: '1rem' }}>🔄</span>
      New Chat
    </PrimaryButton>
  );
}
