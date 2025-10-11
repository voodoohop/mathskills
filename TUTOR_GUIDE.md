# Math Tutor Guide

## Overview
This math assistant is designed to act as a friendly, patient tutor that follows a structured teaching approach inspired by effective tutoring practices.

## How It Works

### 1. Initial Interaction
When a student first interacts with the tutor:
- The tutor asks what language the student wants to work in
- Once the language is chosen, it conducts a 14-question diagnostic quiz
- Questions are asked **one at a time** (not all at once)
- Chapter numbers and topic names are **never mentioned** to avoid intimidation

### 2. Diagnostic Quiz (14 Questions)
The quiz covers these essential topics:
- **Scientific Notation** (2 questions)
- **Algebraic Simplification** (1 question)
- **Product Expansion** (2 questions)
- **Factorisation** (1 question)
- **Rounding** (1 question)
- **Formula Rearrangement** (2 questions)
- **Pythagoras' Theorem** (2 questions)
- **Coordinate Geometry** (2 questions)
- **Perimeter and Area** (1 question)

### 3. Input Format Guidance
The tutor always provides clear examples of how to write mathematical expressions:
- **Exponents**: `x^2` or "x squared"
- **Multiplication**: `3*x` or `3x`
- **Fractions**: `3/4` or "3 over 4"
- **Square roots**: `sqrt(...)` or "square root of..."

### 4. Units Enforcement
The tutor **insists on proper units** in answers. If a student forgets units, the tutor reminds them that units are fundamental in mathematics and sciences.

### 5. Post-Quiz Teaching
After completing the diagnostic quiz:
1. The tutor acknowledges the student's performance
2. Begins teaching **"Rounding to Three Significant Figures"**
3. Explains significant figures with clear examples
4. Directs students to practice at [Transum Rounding Exercise](https://www.transum.org/software/sw/starter_of_the_day/students/Rounding.asp)
5. **Emphasizes**: Students must select **LEVEL 6**
6. Explains they can press CHECK to verify answers
7. Asks for a screenshot of results
8. Reviews any mistakes with clear explanations

### 6. Teaching Style
- Friendly, patient, and encouraging
- Uses the student's chosen language consistently
- Gives positive feedback with checkmarks (✓) for correct answers
- Explains mistakes clearly without judgment
- Balances guidance with independent work
- Uses external resources for practice
- Varies question types to maintain engagement

## Significant Figures Rules
When teaching rounding to 3 significant figures:
1. Significant figures are digits that carry meaningful information (excluding leading zeros)
2. To round to 3 SF:
   - Count the first 3 significant digits
   - Look at the 4th digit
   - If 4th digit is ≥5: round up
   - If 4th digit is <5: round down

### Examples:
- `4738` → `4740` (4th digit is 8, round up)
- `0.056291` → `0.0563` (4th digit is 9, round up)
- `7231` → `7230` (4th digit is 1, round down)

## Running the Application

```bash
npm install
npm run dev
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

## Customization

The system prompt is defined in `src/App.tsx` as the `SYSTEM_PROMPT` constant. You can modify it to:
- Add more quiz questions
- Change the teaching sequence
- Adjust the teaching style
- Add new topics

## Technical Details

- **Framework**: React + TypeScript + Vite
- **UI Library**: assistant-ui/react
- **AI Model**: Mistral via Pollinations API
- **Styling**: Inline styles with gradient background

The tutor uses the Pollinations API directly (no backend needed) and includes the system prompt with every API call to maintain consistent behavior.
