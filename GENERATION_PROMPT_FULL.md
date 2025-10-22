# MathSkills - Complete Generation Prompt

## PROJECT OVERVIEW

**MathSkills** is a Gen Z-friendly AI math tutor web application that conducts diagnostic quizzes and teaches mathematics topics. It's a single-page React app with no backend—all AI interactions go directly to the Pollinations API.

**Key Aesthetic**: Gen Z friendly - bold colors (cyan, purple, blue), modern UI, micro-interactions, dark mode optimized, authentic (not corporate).

---

## TECH STACK

- **Framework**: React 19 + TypeScript + Vite
- **UI Components**: @assistant-ui/react, Radix UI, TailwindCSS 4
- **AI API**: Pollinations API (text.pollinations.ai/openai endpoint)
- **Math Rendering**: KaTeX for LaTeX expressions
- **Markdown**: @assistant-ui/react-markdown with custom plugins
- **Geometry**: GeoGebra (embedded via templates)
- **Animations**: canvas-confetti, motion/react
- **State**: Zustand (via @assistant-ui/react)
- **Storage**: localStorage for conversation history
- **Deployment**: Cloudflare Pages (wrangler)

---

## POLLINATIONS API INTEGRATION

### Endpoint
```
POST https://text.pollinations.ai/openai
```

### Request Format
```typescript
{
  model: "claudyclaude",  // Use this model - no character limits
  referrer: "pppp",       // Required for seed tier access
  messages: [
    {
      role: "system",
      content: "Full system prompt here..."
    },
    {
      role: "user",
      content: "User message..."
    },
    {
      role: "assistant",
      content: "Previous assistant response..."
    }
  ]
}
```

### Response Format
```typescript
{
  choices: [
    {
      message: {
        content: "AI response text here..."
      }
    }
  ]
}
```

### Headers
```
Content-Type: application/json
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
```

### Key Points
- **Model**: Use "claudyclaude" (no character limits, strong responses)
- **Referrer**: Must include "pppp" for seed tier access
- **System Prompt**: Sent with every request (can be updated in localStorage)
- **No backend needed**: Direct browser-to-API calls
- **Error handling**: Check response.ok and parse JSON carefully

### Implementation Details (App.tsx)

**ChatModelAdapter Implementation**:
```typescript
const pollinationsAdapter: ChatModelAdapter = {
  async run({ messages }) {
    // 1. Generate unique request ID for logging
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    try {
      // 2. Fetch fresh system prompt from localStorage (allows edits)
      const currentPrompt = buildSystemPrompt();
      
      // 3. Remove any existing system message and add current one
      const userMessages = messages.filter(msg => msg.role !== "system");
      const messagesWithSystem = [
        { role: "system", content: [{ type: "text", text: currentPrompt }] },
        ...userMessages
      ];
      
      // 4. Build request body
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
      
      // 5. Make API call
      const response = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        },
        body: JSON.stringify(requestBody),
      });
      
      // 6. Check response status
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      // 7. Parse and return response
      const data = await response.json();
      const text = data.choices[0].message.content;
      
      return {
        content: [{ type: "text", text }],
      };
    } catch (error) {
      console.error(`[${requestId}] Error:`, error);
      throw error;
    }
  },
};
```

**Error Handling**:
- Network errors: Show "Connection failed. Please check your internet."
- API errors (4xx): Show "Invalid request. Please try again."
- API errors (5xx): Show "API is temporarily unavailable. Please try again later."
- Parse errors: Show "Unexpected response format. Please refresh the page."
- Log all errors with request ID for debugging

**Logging Strategy**:
- Log request ID, timestamp, message count, body size
- Log response status, headers, preview of first message
- Log total time taken
- Use console.log for info, console.error for errors
- Include request ID in all logs for tracing

**Request Optimization**:
- Don't send entire conversation history if too long (keep last 20 messages)
- Compress system prompt if needed (currently ~14,500 chars)
- Add request timeout (30 seconds)
- Implement retry logic (max 2 retries on network error)
- Cache system prompt in memory between requests (but fetch fresh on each call)

---

## SYSTEM PROMPT STRUCTURE

The system prompt is built from multiple sections and should be ~14,500 characters:

### 1. TECHNICAL FORMATTING (Non-editable)
- LaTeX math notation requirements (inline $ and display $$)
- Cases syntax for conditional expressions
- GeoGebra template embedding syntax
- GitHub alerts syntax (> [!IMPORTANT], > [!WARNING], etc.)
- Celebration animation directives (:::celebrate-confetti, etc.)
- Definition lists syntax

### 2. TECHNICAL STYLE (Non-editable)
- Response length: 3-4 sentences max (keep it interactive)
- One concept at a time
- Always ask a question to check understanding
- Diagnostic test progress tracking with progress bars
- Never mention chapter numbers to avoid intimidation

### 3. PEDAGOGICAL PROTOCOL (Editable by teachers)
- Initial greeting: Ask for name and language
- Input format instructions (how to type powers, fractions, units)
- 14 diagnostic quiz questions (one at a time)
- Progress bar format before each question
- Post-quiz teaching flow
- Rounding to significant figures teaching
- Link to Transum practice site (Level 6)

### 4. BACKGROUND KNOWLEDGE (Editable by teachers)
- Teaching tips for each chapter (A-N)
- Common mistakes students make
- Emphasis on units, formulas, visual teaching
- GeoGebra usage recommendations

---

## DIRECTORY STRUCTURE

```
mathskills/
├── src/
│   ├── components/
│   │   ├── assistant-ui/
│   │   │   ├── thread.tsx                 # Main chat interface
│   │   │   ├── markdown-text.tsx          # Markdown renderer with plugins
│   │   │   ├── thread-suggestions.tsx     # Suggestion buttons
│   │   │   ├── attachment.tsx
│   │   │   ├── tool-fallback.tsx
│   │   │   └── tooltip-icon-button.tsx
│   │   ├── geogebra/
│   │   │   ├── GeoGebraEmbed.tsx          # Embed wrapper
│   │   │   ├── GeoGebraBoard.tsx          # Canvas renderer
│   │   │   └── index.ts
│   │   ├── ui/                            # Radix UI wrappers
│   │   │   ├── button.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── skeleton.tsx
│   │   ├── CelebrationAnimation.tsx       # Confetti animations
│   │   ├── DarkModeToggle.tsx
│   │   ├── NewConversationButton.tsx
│   │   ├── PromptConfig.tsx               # Edit system prompt
│   │   └── PrimaryButton.tsx
│   ├── content/
│   │   ├── systemPrompt.ts                # Build system prompt
│   │   ├── backgroundKnowledge.ts         # Teaching tips
│   │   ├── defaultProtocol.ts             # Pedagogical protocol
│   │   ├── geogebraTemplates.ts           # Pre-built diagrams
│   │   └── suggestions.ts                 # Suggestion buttons
│   ├── lib/
│   │   ├── rehype-*.ts                    # Markdown plugins
│   │   ├── remark-*.ts                    # Markdown plugins
│   │   ├── localStorageHistoryAdapter.ts  # Persist conversations
│   │   └── utils.ts
│   ├── hooks/
│   │   └── useDarkMode.ts
│   ├── App.tsx                            # Main app + Pollinations adapter
│   ├── App.css
│   ├── index.css                          # TailwindCSS + custom styles
│   └── main.tsx
├── public/
│   ├── mathskills_girl.png                # Character avatar
│   ├── mathskills_dog.png                 # Character avatar
│   └── vite.svg
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── wrangler.toml                          # Cloudflare Pages config
└── README.md
```

---

## KEY COMPONENTS

### 1. App.tsx - Pollinations API Adapter
- Implements `ChatModelAdapter` interface from @assistant-ui/react
- Builds system prompt from localStorage (editable)
- Sends messages to Pollinations API
- Handles errors and logging
- Returns AI response to chat UI

**Critical**: System prompt is fetched fresh on each request to pick up edits.

**Component Structure**:
```typescript
function App() {
  const runtime = useLocalRuntime(pollinationsAdapter, {
    adapters: {
      history: localStorageHistoryAdapter,
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen flex flex-col bg-white dark:bg-slate-950">
        {/* Header with controls */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-purple-200 dark:border-purple-800/50">
          <NewConversationButton />
          <div className="flex items-center gap-2">
            <PromptConfig />  {/* Edit system prompt */}
            <DarkModeToggle />
          </div>
        </div>
        {/* Main chat interface */}
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
```

**Key Props & State**:
- `runtime`: Manages conversation state, message history, AI responses
- `localStorageHistoryAdapter`: Persists conversation to localStorage
- `pollinationsAdapter`: Handles API calls

**Styling**:
- Full height (h-screen) flex column layout
- Light mode: white background
- Dark mode: dark slate background (slate-950)
- Header: border-bottom with purple accent
- Responsive: works on mobile and desktop

### 2. Thread.tsx - Chat Interface
- Welcome screen with character avatars (girl + dog)
- Message list (user + assistant)
- Composer (input box)
- Suggestion buttons
- Dark mode support
- Smooth animations with motion/react

**ThreadWelcome Component**:
```typescript
const ThreadWelcome: FC = () => {
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Avatar Section - Two character images in circular backgrounds */}
      <div className="flex gap-8 justify-center items-end">
        {/* Girl Avatar */}
        <m.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 100 }}
          className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-slate-400 dark:to-slate-300 shadow-lg flex items-center justify-center"
        >
          <img src="/mathskills_girl.png" alt="Girl tutor" className="h-28 w-28 object-contain" />
        </m.div>
        {/* Dog Avatar */}
        <m.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-slate-400 dark:to-slate-300 shadow-lg flex items-center justify-center"
        >
          <img src="/mathskills_dog.png" alt="Dog tutor" className="h-28 w-28 object-contain" />
        </m.div>
      </div>
      
      {/* Welcome Message Section */}
      <div className="flex flex-col justify-center px-8 text-center gap-4">
        <m.div className="text-6xl font-black text-blue-600 dark:text-cyan-400">
          Welcome to MathSkills <span className="emoji">🎓</span>
        </m.div>
        <m.div className="text-xl text-purple-600 dark:text-purple-300 font-semibold">
          Your personal math tutor <span className="emoji">🚀</span>
        </m.div>
        <m.div className="text-base text-gray-500 dark:text-gray-400">
          Tell me your name and let's get started <span className="emoji">💬</span>
        </m.div>
      </div>
      
      {/* Suggestion Buttons */}
      <ThreadSuggestions />
    </div>
  );
};
```

**Animation Details**:
- Avatars: Spring animation with stagger (0.05s, 0.1s delay)
- Text: Fade + slide up animation with increasing delays
- Hover effects: Buttons scale on hover
- Smooth transitions: All animations use motion/react

**Message Components**:
- **AssistantMessage**: Shows AI response with markdown rendering
- **UserMessage**: Shows user input (right-aligned, different styling)
- **EditComposer**: Allows editing previous messages
- **Composer**: Input box at bottom with send button

**Responsive Design**:
- Mobile: Single column, full width
- Tablet: Centered with max-width constraint
- Desktop: Centered with max-width constraint
- Touch-friendly: Large tap targets (44px minimum)

**Dark Mode**:
- Uses Tailwind dark: prefix
- Automatic based on system preference or manual toggle
- Smooth transition between modes
- All colors have light and dark variants

### 3. Markdown-Text.tsx - Markdown Renderer
**Remark Plugins** (parse markdown → AST):
- `remark-gfm` - GitHub Flavored Markdown
- `remark-math` - LaTeX math delimiters
- `remark-directive` - Custom directives (:::hint, :::warning)
- `remark-celebration` - Celebration animations (:::celebrate-confetti)
- `remark-github-blockquote-alert` - GitHub alerts (> [!IMPORTANT])
- `remark-geogebra-embed` - GeoGebra template embedding

**Rehype Plugins** (transform HTML AST):
- `rehype-raw` - Allow raw HTML
- `rehype-directive-containers` - Style directives
- `rehype-geogebra-embed` - Render GeoGebra embeds
- `rehype-emoji-wrapper` - Color emojis
- `rehype-katex` - Render LaTeX with KaTeX

**Preprocessing**: Normalize LaTeX delimiters (\(...\) → $...$, \[...\ ] → $$...$$)

**Plugin Pipeline Order** (CRITICAL):
```typescript
remarkPlugins={[
  remarkGfm,                      // 1. Parse GitHub markdown
  remarkMath,                     // 2. Parse LaTeX delimiters
  remarkDirective,                // 3. Parse ::: directives
  remarkCelebrationPlugin,        // 4. Convert :::celebrate-* to components
  remarkGithubBlockquoteAlert,    // 5. Parse > [!TYPE] alerts
  remarkGeoGebraEmbedPlugin,      // 6. Parse ```geogebra-embed blocks
]}

rehypePlugins={[
  rehypeRaw,                      // 1. Allow raw HTML
  rehypeDirectiveContainers,      // 2. Wrap directives in styled containers
  rehypeGeoGebraEmbedPlugin,      // 3. Render GeoGebra embeds
  rehypeEmojiWrapper,             // 4. Wrap emojis for coloring
  rehypeKatex,                    // 5. Render LaTeX with KaTeX
]}
```

**Why Order Matters**:
- Remark plugins must parse in order: GFM → Math → Directives → Celebrations → Alerts → GeoGebra
- Rehype plugins must render in order: Raw HTML → Directive styling → GeoGebra → Emojis → Math
- If order is wrong, plugins may not detect their syntax correctly

**Preprocessing Function**:
```typescript
function normalizeCustomMathTags(input: string): string {
  return input
    // Convert \( ... \) to $...$ (inline math)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, content) => `$${content.trim()}$`)
    // Convert \[ ... \] to $$...$$ (block math)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => `$$${content.trim()}$$`);
}
```

**Component Registration**:
```typescript
const defaultComponents = {
  // Markdown elements
  h1: ({ children }) => <h1 className="text-3xl font-bold text-blue-600 dark:text-cyan-400">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold text-blue-600 dark:text-cyan-400">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold text-purple-600 dark:text-purple-300">{children}</h3>,
  
  // Custom components
  'celebration-animation': CelebrationAnimation,
  'geogebra-embed': GeoGebraEmbed,
  
  // Code blocks with copy button
  code: CodeBlock,
  
  // Links with styling
  a: ({ href, children }) => (
    <a href={href} className="text-blue-600 dark:text-cyan-400 underline hover:no-underline">
      {children}
    </a>
  ),
};
```

**KaTeX Configuration**:
- Inline math: `$...$` renders with inline styling
- Display math: `$$...$$` renders centered on own line
- Macros: Can define custom LaTeX macros if needed
- Error handling: Shows error message if LaTeX is invalid

**CSS Imports**:
```typescript
import "@assistant-ui/react-markdown/styles/dot.css";  // Markdown base styles
import "katex/dist/katex.min.css";                     // KaTeX math rendering
import "remark-github-blockquote-alert/alert.css";    // GitHub alert styling
```

### 4. GeoGebra Integration
- **GeoGebraEmbed.tsx**: YouTube-like embed wrapper (collapsible header)
- **GeoGebraBoard.tsx**: Canvas renderer using GeoGebra JavaScript API
- **geogebraTemplates.ts**: Pre-built template library (pythagoras, distance_formula, etc.)
- **Syntax**: ` ```geogebra-embed\ntemplate-id\n``` `

**GeoGebraBoard.tsx Implementation**:
```typescript
interface GeoGebraBoardProps {
  code: string;        // GeoGebra script code
  width?: number;      // Canvas width (default 500)
  height?: number;     // Canvas height (default 400)
}

export const GeoGebraBoard: React.FC<GeoGebraBoardProps> = ({
  code,
  width = 500,
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appletRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize GeoGebra applet
    const parameters = {
      id: `geogebra_${Date.now()}`,
      appName: "graphing",
      width,
      height,
      showToolBar: false,
      showAlgebraInput: false,
      showMenuBar: false,
      enableLabelDrags: true,
      enableShiftDragZoom: true,
      useBrowserForJS: true,
      appletOnLoad: (api: any) => {
        appletRef.current = api;
        // Hide algebra panel, show only graphics
        api.evalCommand('SetPerspective("G")');
        // Execute user code
        const commands = code.split('\n').filter(line => line.trim());
        commands.forEach(cmd => {
          try {
            api.evalCommand(cmd);
          } catch (e) {
            console.warn('GeoGebra command failed:', cmd, e);
          }
        });
      },
    };

    // Load GeoGebra API and create applet
    if (window.GGBApplet) {
      const applet = new window.GGBApplet(parameters, true);
      applet.inject(containerRef.current.id || 'geogebra_container');
    }

    return () => {
      // Cleanup on unmount
      if (appletRef.current) {
        appletRef.current.remove();
      }
    };
  }, [code, width, height]);

  return (
    <div
      ref={containerRef}
      id="geogebra_container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    />
  );
};
```

**GeoGebraEmbed.tsx - YouTube-like Wrapper**:
```typescript
export const GeoGebraEmbed: React.FC<{ templateId: string }> = ({ templateId }) => {
  const template = getGeoGebraTemplate(templateId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!template) {
    return (
      <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        ⚠️ GeoGebra template not found: <code>{templateId}</code>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Collapsible Header */}
      <div
        className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 hover:from-slate-100 hover:to-slate-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
            <span className="text-lg">📐</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{template.name}</h3>
            <p className="text-xs text-slate-600">{template.description}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex justify-center">
            <GeoGebraBoard
              code={template.code}
              width={template.width || 500}
              height={template.height || 400}
            />
          </div>
          <div className="mt-3 text-xs text-slate-600">
            <span className="inline-block rounded bg-blue-50 px-2 py-1 text-blue-700">
              {template.topic}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
```

**GeoGebra Template Structure**:
```typescript
export interface GeoGebraTemplate {
  id: string;           // Unique identifier (e.g., 'pythagoras')
  name: string;         // Display name
  description: string;  // Short description
  topic: string;        // Category (e.g., 'Pythagoras')
  code: string;         // GeoGebra script code
  width?: number;       // Canvas width (default 500)
  height?: number;      // Canvas height (default 400)
}
```

**GeoGebra Script Syntax**:
```geogebra
// Points
A = (-2, -2)
B = (2, -2)
C = (-2, 2)

// Shapes
tri = Polygon(A, B, C)

// Styling
SetColor(tri, "lightblue")
SetLineThickness(tri, 2)
SetPointSize(A, 6)

// Hide/Show
ShowLabel(A, true)
SetFixed(A, false)  // Allow dragging
```

**Key GeoGebra Commands**:
- `Point(x, y)` - Create point
- `Segment(A, B)` - Create line segment
- `Line(A, B)` - Create infinite line
- `Polygon(A, B, C, ...)` - Create polygon
- `Circle(center, radius)` - Create circle
- `SetColor(obj, color)` - Set object color
- `SetLineThickness(obj, thickness)` - Set line width
- `SetPointSize(obj, size)` - Set point size
- `SetPerspective("G")` - Show only graphics (hide algebra)
- `SetFixed(obj, boolean)` - Lock/unlock object

**Remark Plugin for GeoGebra Embedding** (`remark-geogebra-embed.ts`):
```typescript
import { visit } from 'unist-util-visit';

export function remarkGeoGebraEmbedPlugin() {
  return (tree: any) => {
    visit(tree, 'code', (node: any) => {
      // Detect ```geogebra-embed code fences
      if (node.lang === 'geogebra-embed') {
        const templateId = node.value.trim();
        
        // Convert to custom element
        node.type = 'html';
        node.value = `<GeoGebraEmbedWrapper templateId="${templateId}" />`;
      }
    });
  };
}
```

**Rehype Plugin for Rendering** (`rehype-geogebra-embed.ts`):
```typescript
import { visit } from 'unist-util-visit';

export function rehypeGeoGebraEmbedPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      // Find custom GeoGebraEmbedWrapper elements
      if (node.tagName === 'geogebraembedwrapper') {
        const templateId = node.properties?.templateId;
        
        // Replace with proper React component reference
        node.type = 'mdxJsxFlowExpression';
        node.value = `<GeoGebraEmbed templateId="${templateId}" />`;
      }
    });
  };
}
```

### 5. Celebration Animations
- **CelebrationAnimation.tsx**: Renders confetti via canvas-confetti library
- **remark-celebration.ts**: Parses :::celebrate-* directives
- **Types**: confetti, fireworks, particles, slowmo
- **Usage**: Wrap congratulatory messages in directives (not code blocks)

### 6. System Prompt Management
- **systemPrompt.ts**: Builds complete prompt from sections
- **PromptConfig.tsx**: UI to edit pedagogical protocol + background knowledge
- **localStorage**: Saves edits so they persist across sessions
- **App.tsx**: Fetches fresh prompt on each API call

---

## STYLING & AESTHETICS

### Color Palette (Gen Z Friendly)

**Light Mode:**
- Primary: Bold Blue (#0066cc)
- Secondary: Purple (#9333ea)
- Accent: Bright Blue (#0088ff)
- Background: White (#ffffff)
- Text: Dark Purple (#0a0515)
- Borders: Light Purple (#d4d0e0)

**Dark Mode:**
- Primary: Bright Cyan (#00d4ff)
- Secondary: Purple (#a855f7)
- Accent: Cyan (#00f5ff)
- Background: Deep Black (#0a0515)
- Text: Light Purple (#f0ebff)
- Borders: Dark Purple (#2d2447)

### Design Principles
- Bold, high-contrast colors (no pale grays)
- Solid colors, no gradients
- Micro-interactions (hover scale, smooth transitions)
- Dark mode optimized (70% Gen Z preference)
- Clean, minimal aesthetic
- Authentic, not corporate

### Components
- **Buttons**: Blue/cyan borders, hover scale animation
- **Headings**: H1 bold blue (light) / cyan (dark), H2 purple
- **Links**: Bold blue (light) / cyan (dark) with underline on hover
- **Alerts**: GitHub-style (> [!IMPORTANT], > [!WARNING])
- **Avatars**: Circular backgrounds with character images
- **Chat**: Clean message bubbles, smooth animations

---

## MARKDOWN FEATURES

### 1. LaTeX Math
```markdown
Inline: $5^2 + 12^2 = 169$
Display: $$a^2 + b^2 = c^2$$
```

### 2. GitHub Alerts
```markdown
> [!IMPORTANT]
> This is critical!

> [!WARNING]
> Watch out for this!

> [!TIP]
> Helpful hint here

> [!NOTE]
> Remember this

> [!CAUTION]
> Common mistake
```

### 3. Celebration Animations
```markdown
:::celebrate-confetti
✅ Correct! Great job!
:::

:::celebrate-fireworks
🎉 Perfect score!
:::

:::celebrate-particles
💪 Good effort!
:::

:::celebrate-slowmo
🎬 Amazing breakthrough!
:::
```

### 4. Custom Directives
```markdown
:::hint
💡 Tip: Use your calculator!
:::

:::warning
⚠️ Don't forget units!
:::

:::example
Try this: $5^2 + 12^2 = ?$
:::

:::solution
Step 1: Calculate...
:::

:::steps
1. First step
2. Second step
:::
```

### 5. GeoGebra Templates
```markdown
```geogebra-embed
pythagoras
```

```geogebra-embed
distance_formula
```
```

### 6. Definition Lists
```markdown
Hypotenuse
: The longest side of a right triangle

Scientific Notation
: Format $a \times 10^b$ where $1 \leq a < 10$
```

---

## GEOGEBRA TEMPLATES

Pre-built templates available:

**Pythagoras & Shapes:**
- `pythagoras` - Right triangle
- `pythagoras_squares` - Right triangle with squares on sides
- `right_angle` - Right angle indicator

**Coordinate Geometry:**
- `distance_formula` - Two points with segment
- `coordinate_grid` - Blank coordinate system

**Area & Perimeter:**
- `rectangle_area` - Rectangle
- `circle_area` - Circle
- `triangle_area` - Triangle

**Triangles:**
- `isosceles_triangle` - Isosceles
- `equilateral_triangle` - Equilateral
- `scalene_triangle` - Scalene
- `congruent_triangles` - Two congruent triangles

**Lines & Angles:**
- `parallel_lines` - Parallel lines with transversal
- `angle_on_line` - Angles on a line

**Circles:**
- `sector_circle` - Sector of circle

**Polygons:**
- `pentagon` - Regular pentagon
- `hexagon` - Regular hexagon

---

## DIAGNOSTIC QUIZ STRUCTURE

### 14 Questions Total (One at a time)

**Progress Bar Format** (before each question):
```
📊 Question X of 14
Progress: XX% [████████░░░░░░░░░░░░]
✓ X correct | ✗ X incorrect
```

### Question Breakdown

**Chapter B - Scientific Notation (Q1-2)**
- Q1: Express decimal in scientific notation (a = ?, b = ?)
- Q2: Multiply two scientific notation numbers

**Chapter D - Algebraic Simplification (Q3-4)**
- Q3: Simplify like terms (5x + 3y - 2x + 7y)
- Q4: Simplify fractions with powers

**Chapter G - Expanding Brackets (Q5-6)**
- Q5: Expand and simplify (2x+5)(3x-4)
- Q6: Expand perfect square (x-7)²

**Chapter H - Factorisation (Q7)**
- Q7: Factor expression

**Chapter I - Formula Rearrangement (Q8-9)**
- Q8: Rearrange formula for target variable
- Q9: Another rearrangement

**Chapter L - Pythagoras' Theorem (Q10-11)**
- Q10: Find hypotenuse (3-4-5 triangle)
- Q11: Find leg length

**Chapter M - Coordinate Geometry (Q12-13)**
- Q12: Find distance between points
- Q13: Find gradient of line

**Chapter N - Perimeter & Area (Q14)**
- Q14: Calculate area or perimeter (STRICT about units!)

### Post-Quiz Flow
1. Celebrate completion with fireworks animation
2. Teach "Rounding to Three Significant Figures"
3. Direct to Transum practice site (Level 6)
4. Review mistakes with clear explanations

---

## CONVERSATION PERSISTENCE

### localStorage Adapter
- Key: `mathskills_conversation_history`
- Stores: Full conversation thread (user + assistant messages)
- Loads: On app startup
- Persists: Across browser sessions
- Clear: Via "New Conversation" button

---

## DEPENDENCIES

### Core
- `react@^19.1.1` - UI framework
- `react-dom@^19.1.1` - React DOM
- `typescript@~5.9.3` - Type checking
- `vite@^7.1.7` - Build tool

### UI & Components
- `@assistant-ui/react@^0.11.28` - Chat UI framework
- `@assistant-ui/react-markdown@^0.11.1` - Markdown renderer
- `@radix-ui/react-*` - Accessible UI components
- `lucide-react@^0.545.0` - Icons
- `tailwindcss@^4.1.14` - Styling
- `motion@^12.23.24` - Animations

### Markdown & Math
- `remark-gfm@^4.0.1` - GitHub Flavored Markdown
- `remark-math@^6.0.0` - LaTeX math
- `rehype-katex@^7.0.1` - KaTeX rendering
- `remark-directive@^4.0.0` - Custom directives
- `remark-github-blockquote-alert@^2.0.0` - GitHub alerts
- `rehype-raw@^7.0.0` - Raw HTML

### Geometry & Visualization
- `jsxgraph@^1.8.0` - Geometry library (if used)

### Animations
- `canvas-confetti@^1.9.3` - Confetti animations

### State & Storage
- `zustand@^5.0.8` - State management (via @assistant-ui)
- `clsx@^2.1.1` - Class name utilities
- `class-variance-authority@^0.7.1` - Component variants
- `tailwind-merge@^3.3.1` - Merge Tailwind classes

---

## DEPLOYMENT

### Cloudflare Pages
```bash
npm run build
wrangler pages deploy dist
```

### Build Command
```bash
tsc -b && vite build
```

### Environment
- No environment variables needed (direct API calls)
- Referrer "pppp" is hardcoded (safe for client-side)

---

## CRITICAL IMPLEMENTATION NOTES

### 1. System Prompt Freshness
- Fetch from localStorage on EVERY API call
- Allows teachers to edit prompt and see changes immediately
- Don't cache in memory

### 2. LaTeX Everywhere
- ALL math expressions must use LaTeX ($...$)
- Never use plain text like "10^b" or "a × 10^b"
- Instruct AI tutor to ALWAYS use LaTeX

### 3. Units are Sacred
- Perimeter: cm (linear)
- Area: cm² (squared)
- Reject answers without units
- Be STRICT about this

### 4. One Question at a Time
- Diagnostic quiz: Ask ONE question, wait for answer
- Keep responses short (3-4 sentences max)
- Always ask a question to check understanding
- Guide, don't lecture

### 5. Progress Tracking
- Display progress bar BEFORE each question
- Format: Question X of 14 | Progress bar | Correct/Incorrect count
- Use block characters for visual bar

### 6. Celebration Animations
- Use :::celebrate-* directives directly in responses
- Don't show them as code blocks
- Types: confetti (general), fireworks (major), particles (effort), slowmo (breakthrough)

### 7. GeoGebra Templates
- Use pre-built templates via ` ```geogebra-embed\ntemplate-id\n``` `
- Don't try to write GeoGebra code manually
- Templates are 2D only (no 3D coordinates)

### 8. Dark Mode
- Support both light and dark modes
- Use CSS custom properties for colors
- Test both modes thoroughly

### 9. Error Handling
- Catch Pollinations API errors gracefully
- Show user-friendly error messages
- Log detailed errors to console for debugging

### 10. Responsive Design
- Mobile-first approach
- Works on phones, tablets, desktops
- Touch-friendly buttons and inputs

---

## EXAMPLE CONVERSATION FLOW

**User**: "I'm ready to start!"

**AI**: 
```
Great! Let's begin. First, what language would you like to work in?
```

**User**: "English"

**AI**:
```
Perfect! I'll ask you 14 questions, one at a time, to assess your current knowledge. This will help me understand where you're strong and where we need to focus.

Before we start, here's how to type your answers:
- **Powers/Exponents**: Use ^, e.g., x^2, 10^-4
- **Multiplication**: 3x or 3*x
- **Fractions**: Use /, e.g., 3/4
- **Scientific Notation**: Specify a and b separately (a = 4.7, b = -3)
- **Units**: ALWAYS include units! "26 cm" not "26"

You should have available:
- A calculator
- Pen and paper
- Do NOT try these in your head!

Ready?
```

**User**: "Yes!"

**AI**:
```
📊 Question 1 of 14
Progress: 7% [█░░░░░░░░░░░░░░░░░░]
✓ 0 correct | ✗ 0 incorrect

**Q1: Express 0.00047 in scientific notation.**

Give your answer as: a = [value], b = [value]
```

**User**: "a = 4.7, b = -4"

**AI**:
```
:::celebrate-confetti
✅ Correct! $0.00047 = 4.7 \times 10^{-4}$

You've got it! The key is counting decimal places from the first non-zero digit.
:::

📊 Question 2 of 14
Progress: 14% [██░░░░░░░░░░░░░░░░]
✓ 1 correct | ✗ 0 incorrect

**Q2: Calculate $(3.2 \times 10^5) \times (2.5 \times 10^{-3})$ and express in scientific notation.**

Give your answer as: a = [value], b = [value]
```

---

## TESTING CHECKLIST

- [ ] Pollinations API calls work with referrer "pppp"
- [ ] System prompt updates reflect in responses
- [ ] LaTeX math renders correctly
- [ ] GeoGebra templates embed and display
- [ ] Celebration animations play on correct answers
- [ ] Progress bar displays before each question
- [ ] Dark mode works and looks good
- [ ] Conversation history persists
- [ ] Responsive design works on mobile
- [ ] Error messages are user-friendly
- [ ] Units are enforced (area = cm², perimeter = cm)
- [ ] GitHub alerts render with proper styling
- [ ] Emojis are colored (Gen Z aesthetic)
- [ ] Character avatars display on welcome screen
- [ ] Suggestion buttons work
- [ ] New Conversation button clears history

---

## NOTES FOR GENERATION

- This is a complete, production-ready math tutor app
- All dependencies are specified and compatible
- The Pollinations API integration is the only external service
- No backend required—everything runs in the browser
- Teachers can edit the system prompt via the UI
- The app is designed for Gen Z students (bold colors, dark mode, micro-interactions)
- All math expressions must use LaTeX
- The diagnostic quiz is the core feature—implement it carefully
- GeoGebra templates are pre-built—don't try to generate them
- Celebration animations should be used liberally to encourage students
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
# MathSkills Generation Prompt - Complete Documentation

## Overview

This is a **comprehensive generation prompt** for rebuilding the MathSkills AI math tutor application from scratch. The prompt includes complete architectural details, code examples, styling guidelines, and implementation notes.

## Files Included

### 1. **GENERATION_PROMPT_COMPLETE.md** (Main Document)
The primary generation prompt containing:
- Project overview and tech stack
- Pollinations API integration (endpoint, request/response format, error handling)
- System prompt structure and building
- Complete directory structure with file descriptions
- Key components explained (App.tsx, Thread.tsx, Markdown-Text.tsx, GeoGebra, Celebrations)
- Styling & aesthetics (Gen Z color palette, design principles)
- Markdown features (LaTeX, alerts, animations, directives, GeoGebra templates)
- GeoGebra templates library (20+ pre-built diagrams)
- Diagnostic quiz structure (14 questions across 7 chapters)
- Dependencies list (organized by category)
- Deployment instructions
- Critical implementation notes
- Example conversation flow
- Testing checklist

**Size**: ~1,200 lines | **Scope**: Architecture + API integration + styling

### 2. **GENERATION_PROMPT_DETAILED_SECTIONS.md** (Supplementary Details)
Additional detailed sections including:
- **Celebration Animations**: Full implementation of CelebrationAnimation.tsx, remark plugin, animation types
- **System Prompt Building**: Detailed systemPrompt.ts architecture, editable sections, prompt building logic
- **Prompt Config Component**: PromptConfig.tsx implementation for editing pedagogical protocol
- **Diagnostic Quiz Flow**: Detailed breakdown of all 14 questions with answer formats
- **Local Storage Adapter**: Conversation history persistence implementation
- **Dark Mode Implementation**: useDarkMode hook and DarkModeToggle component
- **Responsive Design**: Breakpoints and responsive patterns
- **Error Handling**: User-facing error messages and developer logging
- **Performance Optimizations**: Memoization, lazy loading, caching, bundle size
- **Testing Checklist**: Expanded with functional, UI/UX, accessibility, performance tests
- **Deployment Checklist**: Pre-deployment verification steps

**Size**: ~800 lines | **Scope**: Implementation details + components + testing

### 3. **GENERATION_PROMPT_README.md** (This File)
Navigation guide and summary of all documentation.

## How to Use These Prompts

### For AI Code Generators

1. **Start with GENERATION_PROMPT_COMPLETE.md**
   - Use as the primary generation prompt
   - Contains all essential architecture and design decisions
   - Includes code examples and implementation patterns

2. **Reference GENERATION_PROMPT_DETAILED_SECTIONS.md**
   - For detailed component implementations
   - For system prompt building logic
   - For testing and deployment procedures

3. **Ask for Clarifications**
   - If generator needs more detail on specific components
   - If generator needs more code examples
   - If generator needs more styling details

### For Manual Implementation

1. **Read GENERATION_PROMPT_COMPLETE.md first**
   - Understand overall architecture
   - Review tech stack and dependencies
   - Study key components

2. **Use GENERATION_PROMPT_DETAILED_SECTIONS.md for implementation**
   - Copy code examples for each component
   - Follow implementation patterns
   - Use testing checklist to verify

3. **Reference existing source code**
   - Compare with actual implementation in `/src/`
   - Verify all patterns match
   - Ensure all plugins are integrated

## Key Sections by Topic

### API Integration
- **File**: GENERATION_PROMPT_COMPLETE.md
- **Sections**: "POLLINATIONS API INTEGRATION", "Implementation Details (App.tsx)"
- **Key Points**: Endpoint, model selection, referrer requirement, error handling

### UI/UX & Styling
- **File**: GENERATION_PROMPT_COMPLETE.md
- **Sections**: "STYLING & AESTHETICS", "MARKDOWN FEATURES"
- **Key Points**: Gen Z color palette, dark mode, responsive design, micro-interactions

### Markdown & Rendering
- **File**: GENERATION_PROMPT_COMPLETE.md + GENERATION_PROMPT_DETAILED_SECTIONS.md
- **Sections**: "Markdown-Text.tsx", "Plugin Pipeline Order", "Celebration Animations"
- **Key Points**: Plugin order matters, LaTeX rendering, custom directives

### Geometry Visualization
- **File**: GENERATION_PROMPT_COMPLETE.md
- **Sections**: "GeoGebra Integration"
- **Key Points**: 20+ pre-built templates, GeoGebra script syntax, collapsible embed wrapper

### System Prompt & Teaching
- **File**: GENERATION_PROMPT_COMPLETE.md + GENERATION_PROMPT_DETAILED_SECTIONS.md
- **Sections**: "SYSTEM PROMPT STRUCTURE", "System Prompt Building"
- **Key Points**: 14-question diagnostic quiz, editable sections, teaching tips

### Testing & Deployment
- **File**: GENERATION_PROMPT_DETAILED_SECTIONS.md
- **Sections**: "Testing Checklist", "Deployment Checklist"
- **Key Points**: Functional, UI/UX, accessibility, performance tests

## Critical Implementation Notes

### 1. **System Prompt Freshness**
- Fetch from localStorage on EVERY API call
- Allows teachers to edit prompt and see changes immediately
- Don't cache in memory between requests

### 2. **LaTeX Everywhere**
- ALL math expressions must use LaTeX ($...$)
- Never use plain text like "10^b" or "a × 10^b"
- Instruct AI tutor to ALWAYS use LaTeX

### 3. **Units are Sacred**
- Perimeter: cm (linear)
- Area: cm² (squared)
- Reject answers without units
- Be STRICT about this

### 4. **Plugin Order Matters**
- Remark: GFM → Math → Directives → Celebrations → Alerts → GeoGebra
- Rehype: Raw HTML → Directive styling → GeoGebra → Emojis → Math
- Wrong order = plugins don't detect their syntax

### 5. **One Question at a Time**
- Diagnostic quiz: Ask ONE question, wait for answer
- Keep responses short (3-4 sentences max)
- Always ask a question to check understanding

### 6. **Progress Tracking**
- Display progress bar BEFORE each question
- Format: Question X of 14 | Progress bar | Correct/Incorrect count
- Use block characters for visual bar

### 7. **Celebration Animations**
- Use :::celebrate-* directives directly in responses
- Don't show them as code blocks
- Types: confetti (general), fireworks (major), particles (effort), slowmo (breakthrough)

### 8. **GeoGebra Templates**
- Use pre-built templates via ` ```geogebra-embed\ntemplate-id\n``` `
- Don't try to write GeoGebra code manually
- Templates are 2D only (no 3D coordinates)

### 9. **Dark Mode**
- Support both light and dark modes
- Use CSS custom properties for colors
- Test both modes thoroughly

### 10. **Error Handling**
- Catch Pollinations API errors gracefully
- Show user-friendly error messages
- Log detailed errors to console for debugging

## Pollinations API Quick Reference

```
Endpoint: POST https://text.pollinations.ai/openai
Model: claudyclaude (no character limits)
Referrer: pppp (required for seed tier)
System Prompt: ~14,500 characters (includes all sections)
Response Time: Typically 1-5 seconds
```

## Color Palette Quick Reference

**Light Mode**:
- Primary: #0066cc (bold blue)
- Secondary: #9333ea (purple)
- Accent: #0088ff (bright blue)
- Background: #ffffff (white)
- Text: #0a0515 (dark purple)

**Dark Mode**:
- Primary: #00d4ff (bright cyan)
- Secondary: #a855f7 (purple)
- Accent: #00f5ff (cyan)
- Background: #0a0515 (deep black)
- Text: #f0ebff (light purple)

## Diagnostic Quiz Quick Reference

**14 Questions Total**:
- Q1-2: Scientific Notation (Chapter B)
- Q3-4: Algebraic Simplification (Chapter D)
- Q5-6: Expanding Brackets (Chapter G)
- Q7: Factorisation (Chapter H)
- Q8-9: Formula Rearrangement (Chapter I)
- Q10-11: Pythagoras' Theorem (Chapter L)
- Q12-13: Coordinate Geometry (Chapter M)
- Q14: Perimeter & Area (Chapter N)

## GeoGebra Templates Quick Reference

**Available Categories**:
- Pythagoras: pythagoras, pythagoras_squares, right_angle
- Coordinate: distance_formula, coordinate_grid
- Area/Perimeter: rectangle_area, circle_area, triangle_area
- Triangles: isosceles_triangle, equilateral_triangle, scalene_triangle, congruent_triangles
- Lines/Angles: parallel_lines, angle_on_line
- Circles: sector_circle
- Polygons: pentagon, hexagon

## Dependencies Quick Reference

**Core**: React 19, TypeScript, Vite
**UI**: @assistant-ui/react, Radix UI, TailwindCSS 4
**Markdown**: remark-gfm, remark-math, remark-directive, rehype-katex
**Math**: KaTeX
**Geometry**: GeoGebra (via CDN)
**Animations**: canvas-confetti, motion/react
**State**: Zustand (via @assistant-ui)
**Storage**: localStorage (built-in)

## File Structure Quick Reference

```
src/
├── components/
│   ├── assistant-ui/          # Chat UI components
│   ├── geogebra/              # GeoGebra integration
│   └── ui/                    # Radix UI wrappers
├── content/                   # System prompt, templates, suggestions
├── lib/                       # Plugins, adapters, utilities
├── hooks/                     # Custom hooks (dark mode)
├── App.tsx                    # Main app + Pollinations adapter
└── index.css                  # TailwindCSS + custom styles
```

## Next Steps

1. **For AI Code Generators**:
   - Use GENERATION_PROMPT_COMPLETE.md as primary prompt
   - Reference GENERATION_PROMPT_DETAILED_SECTIONS.md for details
   - Ask for clarifications on specific components

2. **For Manual Implementation**:
   - Read both documents thoroughly
   - Start with App.tsx (Pollinations adapter)
   - Build components in order: Thread → Markdown → GeoGebra → Celebrations
   - Use testing checklist to verify

3. **For Deployment**:
   - Follow deployment checklist in GENERATION_PROMPT_DETAILED_SECTIONS.md
   - Verify all tests pass
   - Deploy to Cloudflare Pages

## Questions?

Refer to the specific section in the generation prompt documents:
- **API Issues**: "POLLINATIONS API INTEGRATION"
- **Component Issues**: "KEY COMPONENTS"
- **Styling Issues**: "STYLING & AESTHETICS"
- **Markdown Issues**: "Markdown-Text.tsx"
- **GeoGebra Issues**: "GeoGebra Integration"
- **Testing Issues**: "Testing Checklist"
- **Deployment Issues**: "Deployment Checklist"

---

**Total Documentation**: ~2,000 lines of detailed specifications, code examples, and implementation guidance.

**Ready to generate or implement**: Yes ✅
