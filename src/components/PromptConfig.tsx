import { useState } from 'react';
import { DEFAULT_PEDAGOGICAL_PROMPT } from '@/content/systemPrompt';
import { threadSuggestions } from '@/content/suggestions';

const DEFAULT_SUGGESTIONS = threadSuggestions.slice(0, 4).map((s: { title: string; action: string }) => ({
  title: s.title,
  action: s.action
}));

export function PromptConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState(() => {
    return localStorage.getItem('mathskills_pedagogical_prompt') || DEFAULT_PEDAGOGICAL_PROMPT;
  });
  const [suggestions, setSuggestions] = useState(() => {
    const saved = localStorage.getItem('mathskills_suggestions');
    return saved ? JSON.parse(saved) : DEFAULT_SUGGESTIONS;
  });

  const handleSave = () => {
    localStorage.setItem('mathskills_pedagogical_prompt', prompt);
    localStorage.setItem('mathskills_suggestions', JSON.stringify(suggestions));
    setIsOpen(false);
    // Reload page to start fresh conversation with new prompt
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm('Reset to defaults? This cannot be undone.')) {
      setPrompt(DEFAULT_PEDAGOGICAL_PROMPT);
      setSuggestions(DEFAULT_SUGGESTIONS);
      localStorage.removeItem('mathskills_pedagogical_prompt');
      localStorage.removeItem('mathskills_suggestions');
      setIsOpen(false);
      // Reload page to start fresh conversation with default prompt
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          zIndex: 1000,
        }}
      >
        ⚙️ Edit Protocol
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '0.5rem',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
            Edit Tutoring Protocol
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '1.5rem', flex: 1, overflow: 'auto' }}>
          <p style={{ marginTop: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            Edit the pedagogical instructions below. Technical settings (LaTeX, JSXGraph) are managed separately.
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              resize: 'vertical',
              marginBottom: '1.5rem',
            }}
          />
          
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '600' }}>
            Prompt Suggestions
          </h3>
          <p style={{ marginTop: 0, marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
            Edit the 4 suggestion buttons that appear at the start of a conversation.
          </p>
          
          {suggestions.map((suggestion: any, index: number) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>
                Suggestion {index + 1}
              </label>
              <input
                type="text"
                placeholder="Title (e.g., Start the diagnostic quiz)"
                value={suggestion.title}
                onChange={(e) => {
                  const newSuggestions = [...suggestions];
                  newSuggestions[index] = { ...newSuggestions[index], title: e.target.value };
                  setSuggestions(newSuggestions);
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <input
                type="text"
                placeholder="Action text (e.g., I'm ready to start!)"
                value={suggestion.action}
                onChange={(e) => {
                  const newSuggestions = [...suggestions];
                  newSuggestions[index] = { ...newSuggestions[index], action: e.target.value };
                  setSuggestions(newSuggestions);
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '1.5rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={handleReset}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Reset to Default
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: '0.5rem 1rem',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '0.5rem 1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
