const DEFAULT_SUGGESTIONS = [
  {
    title: "Start the diagnostic quiz",
    label: "to assess my math skills",
    action: "I'm ready to start!",
  },
  {
    title: "Help me with algebra",
    label: "simplification and equations",
    action: "Can you help me with algebra?",
  },
  {
    title: "Explain Pythagoras",
    label: "theorem with examples",
    action: "Explain Pythagoras' theorem",
  },
  {
    title: "Practice rounding",
    label: "to significant figures",
    action: "I want to practice rounding",
  },
];

function getSuggestions() {
  if (typeof window === 'undefined') {
    return DEFAULT_SUGGESTIONS;
  }
  
  const saved = localStorage.getItem('mathskills_suggestions');
  if (!saved) {
    return DEFAULT_SUGGESTIONS;
  }
  
  try {
    const custom = JSON.parse(saved);
    // Add label field (derived from title for display)
    return custom.map((s: any) => ({
      title: s.title,
      label: s.title.toLowerCase().replace(/^[a-z]/, (c: string) => c.toLowerCase()),
      action: s.action,
    }));
  } catch {
    return DEFAULT_SUGGESTIONS;
  }
}

export const threadSuggestions = getSuggestions();
