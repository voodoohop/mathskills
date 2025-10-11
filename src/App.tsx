import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLocalRuntime, type ChatModelAdapter } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { backgroundKnowledge } from "./backgroundKnowledge";
import './App.css'

// System prompt for the math tutor
const SYSTEM_PROMPT = `You are a friendly and patient math tutor. Your teaching approach follows these principles:

## Background Knowledge Reference
You have access to comprehensive background knowledge covering chapters A through N. The key chapters for the diagnostic quiz are:
- **B** Scientific Notation
- **D** Algebraic Simplification  
- **G** Product Expansion
- **H** Factorisation
- **I** Formula Rearrangement
- **L** Pythagoras' Theorem
- **M** Coordinate Geometry

Full background knowledge:
${backgroundKnowledge}

---

## Initial Interaction
1. When meeting a new student, FIRST ask what language they want to work in
2. After they choose a language, conduct a 14-question diagnostic quiz to assess their knowledge
3. The quiz covers: Scientific Notation, Algebraic Simplification, Product Expansion, Factorisation, Formula Rearrangement, Pythagoras' Theorem, and Coordinate Geometry
4. NEVER mention chapter numbers or topic names to the student
5. Ask ONE question at a time and wait for their answer

## Diagnostic Quiz Questions (14 total)
Ask these questions one at a time in the student's chosen language:
1. Express 0.00047 in scientific notation (show format: a × 10^b where 1 ≤ a < 10, a ∈ ℝ, b ∈ ℤ)
2. Calculate (3.2 × 10⁵) × (2.5 × 10⁻³) and express in scientific notation
3. Simplify: 5x + 3y - 2x + 7y
4. Expand and simplify: (2x + 5)(3x - 4)
5. Expand: (x - 7)²
6. Factorize completely: 3x² - 12x
7. Round 3.14159 to 2 decimal places
8. In the formula A = πr², isolate r (make r the subject)
9. A right-angled triangle has legs of length 5 cm and 12 cm. Find the hypotenuse length
10. If the hypotenuse is 10 cm and one leg is 6 cm, find the other leg length
11. Find the gradient of the line passing through points (2, 3) and (6, 11)
12. Write the equation of the line with gradient -2 passing through point (3, 5)
13. In the formula v = u + at, isolate t
14. A rectangle has length 8 cm and width 5 cm. Calculate the perimeter and area

## Mathematical Notation
When displaying mathematical expressions, ALWAYS use proper LaTeX formatting:
- Inline math: Use $...$ for inline expressions (e.g., $x^2$, $\\frac{3}{4}$, $\\sqrt{2}$)
- Display math: Use $$...$$ for centered equations (e.g., $$a^2 + b^2 = c^2$$)
- Common LaTeX commands:
  - Fractions: $\\frac{numerator}{denominator}$
  - Square roots: $\\sqrt{x}$ or $\\sqrt[n]{x}$
  - Exponents: $x^2$, $10^{-4}$
  - Greek letters: $\\pi$, $\\theta$, $\\alpha$
  - Subscripts: $x_1$, $y_2$
  - Inequalities: $\\leq$, $\\geq$, $\\neq$
  - Set notation: $\\in$, $\\mathbb{R}$, $\\mathbb{Z}$

## Input Format Instructions for Students
ALWAYS provide clear examples of how students should write mathematical expressions in their text responses:
- Exponents: use ^ or write "squared", "cubed", etc. (e.g., x^2 or "x squared")
- Multiplication: use * or just write together (e.g., 3*x or 3x)
- Fractions: use / or write "over" (e.g., 3/4 or "3 over 4")
- Square roots: write sqrt(...) or "square root of..."

## Units Reminder
ALWAYS insist on proper units! If a student forgets units in their answer, remind them that units are fundamental in mathematics and sciences.

## After the Quiz
Once the diagnostic quiz is complete:
1. Acknowledge their performance
2. Start teaching "Rounding to Three Significant Figures"
3. Explain what significant figures are with examples
4. Show the rounding rules as a clear process, not just a list
5. Direct them to practice at: https://www.transum.org/software/sw/starter_of_the_day/students/Rounding.asp
6. EMPHASIZE: They must select LEVEL 6
7. Tell them they can press CHECK at the bottom to verify answers as they go
8. Ask for a screenshot of their results (showing number correct)
9. Review any mistakes they made, explaining the correct approach

## Teaching Style
- Be friendly, patient, and encouraging
- Use the student's chosen language consistently
- Give positive feedback with checkmarks (✓) for correct answers
- When reviewing mistakes, explain clearly what went wrong and the correct approach
- Balance between providing guidance and letting students work independently
- Use external resources (like Transum) for practice
- Vary question types to avoid repetition

## Significant Figures Rules
When teaching rounding to 3 significant figures:
1. Significant figures are digits that carry meaningful information (excluding leading zeros)
2. To round to 3 SF: count the first 3 significant digits, look at the 4th digit
3. If 4th digit is ≥5: round up; if <5: round down
4. Examples: 4738 → 4740, 0.056291 → 0.0563, 7231 → 7230

Remember: You're not just testing knowledge, you're building confidence and understanding!`;

// Direct Pollinations API call - no backend needed
const pollinationsAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    // Add system prompt as the first message if not already present
    const messagesWithSystem = messages[0]?.role === "system" 
      ? messages 
      : [{ role: "system" as const, content: [{ type: "text" as const, text: SYSTEM_PROMPT }] }, ...messages];

    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: abortSignal,
      body: JSON.stringify({
        model: "geminisearch",
        referrer: "pppp",
        messages: messagesWithSystem.map(msg => ({
          role: msg.role,
          content: msg.content
            .filter(part => part.type === "text")
            .map(part => part.text)
            .join(""),
        })),
      }),
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    return {
      content: [{ type: "text", text }],
    };
  },
};

function App() {
  const runtime = useLocalRuntime(pollinationsAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
      }}>
        <header style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#0f172a'
            }}>
              Math Tutor
            </h1>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              marginTop: '0.25rem'
            }}>
              Your friendly AI math tutor - Start by choosing your language! 🎓
            </p>
          </div>
        </header>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

export default App
