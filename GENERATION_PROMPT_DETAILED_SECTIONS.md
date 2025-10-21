# MathSkills - Additional Detailed Sections

## CELEBRATION ANIMATIONS - DETAILED IMPLEMENTATION

### CelebrationAnimation.tsx Component

```typescript
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationAnimationProps {
  type: 'confetti' | 'fireworks' | 'particles' | 'slowmo';
  autoplay?: boolean;
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  type = 'confetti',
  autoplay = true,
}) => {
  useEffect(() => {
    if (!autoplay) return;

    const triggerAnimation = async () => {
      switch (type) {
        case 'confetti':
          // General correct answers - 100 particles, 2 seconds
          await confetti({
            particleCount: 100,
            spread: 360,
            origin: { y: 0.6 },
            duration: 2000,
          });
          break;

        case 'fireworks':
          // Major milestones - explosive bursts
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }
            confetti({
              particleCount: 50,
              angle: Math.random() * 360,
              spread: Math.random() * 50 + 50,
              origin: { x: Math.random(), y: Math.random() * 0.5 },
            });
          }, 250);
          break;

        case 'particles':
          // Good effort - gentle floating
          await confetti({
            particleCount: 50,
            spread: 120,
            gravity: 0.5,
            scalar: 0.8,
            origin: { y: 0.7 },
            duration: 2000,
          });
          break;

        case 'slowmo':
          // Dramatic moments - slow motion
          await confetti({
            particleCount: 200,
            spread: 360,
            gravity: 0.1,
            scalar: 1.2,
            origin: { y: 0.5 },
            duration: 4000,
          });
          break;
      }
    };

    triggerAnimation();
  }, [type, autoplay]);

  return null; // Animation renders via canvas overlay
};
```

### Remark Celebration Plugin

```typescript
import { visit } from 'unist-util-visit';

/**
 * Converts :::celebrate-* directives to celebration-animation components
 * Syntax:
 *   :::celebrate-confetti
 *   ✅ Correct! Great job!
 *   :::
 */
export function remarkCelebrationPlugin() {
  return (tree: any) => {
    visit(tree, 'containerDirective', (node: any) => {
      const celebrationType = node.name;

      if (!['celebrate-confetti', 'celebrate-fireworks', 'celebrate-particles', 'celebrate-slowmo'].includes(celebrationType)) {
        return;
      }

      // Extract type (e.g., 'confetti' from 'celebrate-confetti')
      const type = celebrationType.replace('celebrate-', '');

      // Transform directive into HTML element
      node.data = {
        hName: 'celebration-animation',
        hProperties: {
          type,
          autoplay: true,
        },
        ...node.data,
      };
    });
  };
}
```

### Animation Types & Usage

| Type | Particles | Duration | Use Case |
|------|-----------|----------|----------|
| **confetti** | 100 | 2s | General correct answers, good progress |
| **fireworks** | 50-200 | 3s | Perfect scores, quiz completion, breakthroughs |
| **particles** | 50 | 2s | Good effort, partial credit, encouragement |
| **slowmo** | 200 | 4s | Dramatic moments, overcoming challenges |

---

## SYSTEM PROMPT BUILDING - DETAILED STRUCTURE

### systemPrompt.ts Architecture

```typescript
import { backgroundKnowledge } from "@/content/backgroundKnowledge";
import { DEFAULT_PEDAGOGICAL_PROMPT } from "@/content/defaultProtocol";

// Technical formatting (non-editable, baked into code)
const TECHNICAL_FORMATTING = `
## Mathematical Notation
CRITICAL: ALWAYS use LaTeX for ALL mathematical expressions:
- Inline: $5$, $x^2$, $\frac{3}{4}$, $\sqrt{2}$
- Display: $$a^2 + b^2 = c^2$$

## Geometry Visualization with GeoGebra Templates
Use pre-built templates with simple code fence syntax:
\`\`\`geogebra-embed
template-id
\`\`\`

Available templates:
- pythagoras - Right triangle for Pythagoras' theorem
- distance_formula - Two points with connecting segment
- rectangle_area - Rectangle for area & perimeter
- circle_area - Circle for area & circumference
- triangle_area - Triangle for area calculation
- isosceles_triangle - Isosceles triangle
- equilateral_triangle - Equilateral triangle
- scalene_triangle - Scalene triangle
- congruent_triangles - Two congruent triangles
- parallel_lines - Two parallel lines with transversal
- angle_on_line - Angles on a straight line
- sector_circle - Sector of a circle
- pentagon - Regular pentagon
- hexagon - Regular hexagon

## Celebration Animations 🎉
When student gets correct answer or achieves milestone:

\`\`\`
:::celebrate-confetti
✅ Correct! Great job!
:::
\`\`\`

Types:
- celebrate-confetti: General correct answers (100 particles, 2s)
- celebrate-fireworks: Major milestones (multiple bursts, 3s)
- celebrate-particles: Good effort (50 particles, gentle, 2s)
- celebrate-slowmo: Dramatic moments (200 particles, 4s)

## GitHub Alerts (PREFERRED for important notes)
> [!IMPORTANT]
> This is critical!

> [!WARNING]
> Watch out!

> [!TIP]
> Helpful hint

> [!NOTE]
> Remember this

> [!CAUTION]
> Common mistake
`;

// Technical style (non-editable, baked into code)
const TECHNICAL_STYLE = `
## Response Length and Interaction Style
- Maximum 3-4 sentences per response (keep it interactive)
- ONE concept at a time
- Ask a question at end to check understanding
- NO long explanations
- Guide, don't lecture

## Diagnostic Test Progress Tracking
ALWAYS display progress bar BEFORE each question:
- Format: 📊 Question X of 14
- Progress: XX% [████████░░░░░░░░░░░░]
- ✓ X correct | ✗ X incorrect

## Input Format Instructions
Explain at start:
- Powers/Exponents: Use ^, e.g., x^2, 10^-4
- Multiplication: 3x or 3*x
- Fractions: Use /, e.g., 3/4
- Scientific Notation: Specify a and b separately
- Units: ALWAYS include units! "26 cm" not "26"
`;

// Build complete system prompt
export function buildSystemPrompt(): string {
  // Fetch editable sections from localStorage
  const savedPedagogical = localStorage.getItem('mathskills_pedagogical_prompt');
  const savedBackground = localStorage.getItem('mathskills_background_knowledge');

  const pedagogicalPrompt = savedPedagogical || DEFAULT_PEDAGOGICAL_PROMPT;
  const backgroundKnowledgeText = savedBackground || backgroundKnowledge;

  // Combine all sections
  return `
${TECHNICAL_FORMATTING}

${TECHNICAL_STYLE}

${pedagogicalPrompt}

${backgroundKnowledgeText}
`.trim();
}

// Get current prompt size
export function getPromptSize(): number {
  return buildSystemPrompt().length;
}
```

### Editable Sections (Stored in localStorage)

**DEFAULT_PEDAGOGICAL_PROMPT** (~2,000 chars):
- Initial greeting
- Input format instructions
- 14 diagnostic quiz questions
- Progress tracking format
- Post-quiz flow

**backgroundKnowledge** (~8,000 chars):
- Teaching tips for each chapter (A-N)
- Common mistakes
- Emphasis on units, formulas, visual teaching

**Total System Prompt**: ~14,500 characters

---

## PROMPT CONFIG COMPONENT - DETAILED

### PromptConfig.tsx

```typescript
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const PromptConfig: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pedagogical, setPedagogical] = useState(() => {
    return localStorage.getItem('mathskills_pedagogical_prompt') || '';
  });
  const [background, setBackground] = useState(() => {
    return localStorage.getItem('mathskills_background_knowledge') || '';
  });

  const handleSave = () => {
    localStorage.setItem('mathskills_pedagogical_prompt', pedagogical);
    localStorage.setItem('mathskills_background_knowledge', background);
    setIsOpen(false);
    // Trigger re-render by updating runtime (handled by App.tsx)
  };

  const handleReset = () => {
    localStorage.removeItem('mathskills_pedagogical_prompt');
    localStorage.removeItem('mathskills_background_knowledge');
    setPedagogical('');
    setBackground('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit System Prompt</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Pedagogical Protocol */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Pedagogical Protocol (Editable)
            </label>
            <textarea
              value={pedagogical}
              onChange={(e) => setPedagogical(e.target.value)}
              className="w-full h-40 p-2 border rounded font-mono text-sm"
              placeholder="Edit pedagogical protocol here..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Includes: greeting, input format, quiz questions, progress tracking
            </p>
          </div>

          {/* Background Knowledge */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Background Knowledge (Editable)
            </label>
            <textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full h-40 p-2 border rounded font-mono text-sm"
              placeholder="Edit background knowledge here..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Includes: teaching tips, common mistakes, chapter references
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

## DIAGNOSTIC QUIZ - DETAILED FLOW

### Question Structure

Each question follows this pattern:

```
📊 Question X of 14
Progress: XX% [████████░░░░░░░░░░░░]
✓ X correct | ✗ X incorrect

**Q[X]: [Question text with LaTeX]**

[Additional instructions if needed]
```

### 14 Questions Breakdown

**Chapter B - Scientific Notation (Q1-2)**
- Q1: Express decimal (0.00047) in scientific notation
  - Answer format: a = 4.7, b = -4
- Q2: Multiply two scientific notation numbers
  - Answer format: a = X.X, b = X

**Chapter D - Algebraic Simplification (Q3-4)**
- Q3: Simplify like terms (5x + 3y - 2x + 7y)
  - Answer format: 3x + 10y
- Q4: Simplify fractions with powers
  - Answer format: Use ^ for powers

**Chapter G - Expanding Brackets (Q5-6)**
- Q5: Expand and simplify (2x+5)(3x-4)
  - Answer format: 6x^2 + 7x - 20
- Q6: Expand perfect square (x-7)²
  - Answer format: x^2 - 14x + 49

**Chapter H - Factorisation (Q7)**
- Q7: Factor expression
  - Answer format: (x + a)(x + b)

**Chapter I - Formula Rearrangement (Q8-9)**
- Q8: Rearrange formula for target variable
  - Answer format: Variable = expression
- Q9: Another rearrangement
  - Answer format: Variable = expression

**Chapter L - Pythagoras' Theorem (Q10-11)**
- Q10: Find hypotenuse (3-4-5 triangle)
  - Answer format: 5 cm (WITH UNITS)
- Q11: Find leg length
  - Answer format: X cm (WITH UNITS)

**Chapter M - Coordinate Geometry (Q12-13)**
- Q12: Find distance between points
  - Answer format: X units or X cm
- Q13: Find gradient of line
  - Answer format: X (as fraction or decimal)

**Chapter N - Perimeter & Area (Q14)**
- Q14: Calculate area or perimeter
  - Answer format: X cm (perimeter) or X cm² (area)
  - **CRITICAL**: Enforce units strictly!

### Post-Quiz Flow

1. **Celebrate Completion**
   ```
   :::celebrate-fireworks
   🎉 Fantastic! You completed the diagnostic quiz!
   :::
   ```

2. **Show Results**
   - Total correct/incorrect
   - Identify weak areas
   - Celebrate strengths

3. **Teach Rounding**
   - Focus on "Rounding to Three Significant Figures"
   - Use examples and GeoGebra if helpful

4. **Direct to Practice**
   - Link to Transum practice site (Level 6)
   - Encourage practice on weak topics

5. **Review Mistakes**
   - Go through incorrect answers
   - Explain correct approach
   - Use GeoGebra templates for geometry

---

## LOCAL STORAGE ADAPTER - DETAILED

### localStorageHistoryAdapter.ts

```typescript
import { HistoryAdapter } from '@assistant-ui/react';

const STORAGE_KEY = 'mathskills_conversation_history';

export const localStorageHistoryAdapter: HistoryAdapter = {
  // Load conversation history from localStorage
  async getMessages() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.messages || [];
    } catch (error) {
      console.error('Failed to load conversation history:', error);
      return [];
    }
  },

  // Save conversation history to localStorage
  async saveMessages(messages) {
    try {
      const data = {
        messages,
        timestamp: new Date().toISOString(),
        version: 1,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save conversation history:', error);
    }
  },

  // Clear conversation history
  async deleteMessages() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear conversation history:', error);
    }
  },
};
```

### NewConversationButton.tsx

```typescript
import React from 'react';
import { useThread } from '@assistant-ui/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const NewConversationButton: React.FC = () => {
  const { runtime } = useThread();

  const handleNewConversation = () => {
    if (confirm('Start a new conversation? Current history will be saved.')) {
      // Clear runtime messages
      runtime.reset();
      // Clear localStorage
      localStorage.removeItem('mathskills_conversation_history');
      // Reload page to reset UI
      window.location.reload();
    }
  };

  return (
    <Button
      onClick={handleNewConversation}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      New Conversation
    </Button>
  );
};
```

---

## DARK MODE IMPLEMENTATION

### useDarkMode.ts Hook

```typescript
import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('mathskills_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update DOM
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('mathskills_dark_mode', isDark.toString());
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle };
};
```

### DarkModeToggle.tsx

```typescript
import React from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button
      onClick={toggle}
      variant="outline"
      size="icon"
      className="rounded-full"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
```

---

## RESPONSIVE DESIGN BREAKPOINTS

### TailwindCSS Breakpoints Used

```
sm: 640px   - Mobile phones
md: 768px   - Tablets
lg: 1024px  - Desktops
xl: 1280px  - Large desktops
```

### Component Responsive Patterns

**Chat Container**:
```typescript
className="@container flex h-full flex-col"
// Uses container queries for responsive behavior
// Max-width constraint: 44rem (704px)
```

**Welcome Screen**:
```typescript
// Mobile: Single column, full width
// Desktop: Centered with max-width
className="mx-auto max-w-[var(--thread-max-width)]"
```

**Buttons**:
```typescript
// Touch-friendly: 44px minimum tap target
// Hover effects on desktop
// Scale animation on interaction
```

---

## ERROR HANDLING STRATEGY

### User-Facing Errors

```typescript
// Network error
"Connection failed. Please check your internet and try again."

// API error (4xx)
"Invalid request. Please try again."

// API error (5xx)
"API is temporarily unavailable. Please try again later."

// Parse error
"Unexpected response format. Please refresh the page."

// Timeout
"Request took too long. Please try again."
```

### Developer Logging

```typescript
// Always include request ID for tracing
[req_1729507200000_abc123def] 📋 System prompt preview: ...
[req_1729507200000_abc123def] 📨 Message count: 5 (4 user messages)
[req_1729507200000_abc123def] 🚀 Starting request
[req_1729507200000_abc123def] 📡 Response received (1234ms)
[req_1729507200000_abc123def] ✅ Success (1456ms total)
```

---

## PERFORMANCE OPTIMIZATIONS

### Memoization

```typescript
// Memoize markdown renderer
export const MarkdownText = memo(MarkdownTextImpl);

// Memoize components
const ThreadWelcome = memo(ThreadWelcomeImpl);
const ThreadMessage = memo(ThreadMessageImpl);
```

### Lazy Loading

```typescript
// Lazy load heavy components
const GeoGebraEmbed = lazy(() => import('./GeoGebraEmbed'));
const CelebrationAnimation = lazy(() => import('./CelebrationAnimation'));
```

### Caching

```typescript
// Cache system prompt in memory (but fetch fresh on each request)
let cachedPrompt: string | null = null;

export function buildSystemPrompt(): string {
  // Always fetch fresh from localStorage
  const prompt = buildPromptFromSections();
  cachedPrompt = prompt;
  return prompt;
}
```

### Bundle Size

- **Total dependencies**: ~2.5 MB (uncompressed)
- **Gzipped**: ~800 KB
- **Main bundle**: ~400 KB
- **Vendor bundle**: ~300 KB
- **CSS**: ~50 KB

---

## TESTING CHECKLIST - EXPANDED

### Functional Testing
- [ ] Pollinations API calls work with referrer "pppp"
- [ ] System prompt updates reflect in responses immediately
- [ ] LaTeX math renders correctly (inline and display)
- [ ] GeoGebra templates embed and display properly
- [ ] Celebration animations play on correct answers
- [ ] Progress bar displays before each question
- [ ] Conversation history persists across sessions
- [ ] New Conversation button clears history
- [ ] Prompt Config saves edits to localStorage

### UI/UX Testing
- [ ] Dark mode works and looks good
- [ ] Light mode has good contrast
- [ ] Responsive design works on mobile (375px)
- [ ] Responsive design works on tablet (768px)
- [ ] Responsive design works on desktop (1024px)
- [ ] Touch targets are 44px minimum
- [ ] Animations are smooth (60fps)
- [ ] No layout shift on content load

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Form labels associated with inputs

### Performance Testing
- [ ] First paint < 2s
- [ ] Interactive < 3s
- [ ] API response < 5s
- [ ] No memory leaks
- [ ] Smooth scrolling (60fps)

### Error Handling Testing
- [ ] Network error shows user-friendly message
- [ ] API error shows user-friendly message
- [ ] Invalid LaTeX shows error message
- [ ] Missing GeoGebra template shows error
- [ ] Errors logged with request ID

---

## DEPLOYMENT CHECKLIST

- [ ] All dependencies installed and locked
- [ ] TypeScript compiles with no errors
- [ ] ESLint passes all checks
- [ ] Build succeeds: `npm run build`
- [ ] No console errors or warnings
- [ ] Environment variables set (none needed for this app)
- [ ] GeoGebra API loaded from CDN
- [ ] Character images in public folder
- [ ] localStorage working correctly
- [ ] Dark mode toggle working
- [ ] All markdown plugins loaded
- [ ] KaTeX CSS imported
- [ ] GitHub alert CSS imported
- [ ] Pollinations API endpoint accessible
- [ ] Referrer "pppp" working
- [ ] System prompt size < 20,000 chars
- [ ] No hardcoded API keys
- [ ] Ready for Cloudflare Pages deployment
