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
