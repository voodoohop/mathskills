# Floating Progress Bar Implementation

## Overview

Implemented a **floating progress bar** that displays during the diagnostic quiz (14 questions). The progress bar shows:
- Current question number (e.g., "Question 3 of 14")
- Visual progress bar with percentage
- Score tracking (✓ correct | ✗ incorrect)
- Block-style mini progress indicator

## How It Works

### 1. **AI Returns Structured Data**
The AI is instructed to include XML progress metadata at the start of each response during the diagnostic test:

```xml
<progress><current>3</current><total>14</total><correct>2</correct><incorrect>0</incorrect></progress>
```

### 2. **Hook Parses Progress**
`useDiagnosticProgress()` hook:
- Monitors all messages in the thread
- Extracts progress XML from the most recent assistant message
- Returns structured progress object or null

### 3. **Component Renders Progress Bar**
`DiagnosticProgressBar` component:
- Displays floating bar at top of screen
- Animates progress bar fill
- Shows current question, percentage, and score
- Automatically hides when no progress data exists

## Files Created

### `/src/components/DiagnosticProgressBar.tsx`
React component that renders the floating progress bar with:
- Smooth animations (motion/react-m)
- Responsive design
- Dark mode support
- Gradient progress bar
- Block-style visual indicator

### `/src/hooks/useDiagnosticProgress.ts`
Custom hook that:
- Uses `useThread()` from assistant-ui
- Parses XML progress tags from AI responses
- Tracks progress state
- Returns `DiagnosticProgress` object or null

### Updated Files

**`/src/components/assistant-ui/thread.tsx`**
- Added `useDiagnosticProgress()` hook
- Rendered `<DiagnosticProgressBar>` at top of thread

**`/src/content/systemPrompt.ts`**
- Updated progress tracking instructions
- Added XML format specification
- Provided examples for AI to follow

## Progress Data Structure

```typescript
interface DiagnosticProgress {
  current: number;    // Current question (1-14)
  total: number;      // Total questions (14)
  correct: number;    // Number of correct answers
  incorrect: number;  // Number of incorrect answers
}
```

## Visual Design

### Position
- **Top of screen** (fixed position)
- Can be changed to bottom by setting `position="bottom"` prop

### Styling
- Frosted glass effect (backdrop-blur)
- Purple/cyan gradient progress bar
- Green for correct count, red for incorrect
- Smooth animations on appearance and progress changes
- Responsive padding and sizing

### Components
1. **Question indicator**: 📊 Question X of 14
2. **Progress bar**: Gradient fill with percentage
3. **Score**: ✓ X correct | ✗ Y incorrect
4. **Block indicator**: 20 mini blocks showing progress

## Usage Example

When the AI asks Question 3 after the student got Q1 correct and Q2 incorrect:

**AI Response:**
```
<progress><current>3</current><total>14</total><correct>1</correct><incorrect>1</incorrect></progress>

*Q3:* Simplify: 5x + 3y - 2x + 7y
Type your answer as you would write it, e.g., 3x + 10y
```

**Result:**
- Progress bar appears at top
- Shows "Question 3 of 14"
- Progress bar at 21% (3/14)
- Score: ✓ 1 correct | ✗ 1 incorrect

## Benefits

✅ **Visual feedback** - Students see their progress in real-time
✅ **Motivation** - Progress bar encourages completion
✅ **Score tracking** - Clear visibility of performance
✅ **Non-intrusive** - Floats above content without blocking
✅ **Automatic** - No manual tracking needed
✅ **Structured data** - AI provides machine-readable progress

## Future Enhancements

Potential improvements:
- Add celebration animation when reaching 100%
- Show time elapsed
- Add "pause quiz" functionality
- Store progress in localStorage for resume capability
- Add progress history/analytics
