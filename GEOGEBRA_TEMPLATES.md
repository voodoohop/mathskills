# GeoGebra Template Embedding Guide

## Overview

The MathSkills tutor now supports **elegant GeoGebra template embedding** - a clean, minimal way to include interactive geometry diagrams in responses, similar to how YouTube videos are embedded.

## Two Methods

### ✨ METHOD 1: Template Embedding (RECOMMENDED)

**Syntax:** `@geogebra[template-id]`

**Why use this:**
- ✅ Clean, minimal syntax
- ✅ Consistent, professional appearance
- ✅ No need to write GeoGebra code
- ✅ Collapsible for better readability
- ✅ YouTube-like embed experience

**Example:**
```
Let me show you Pythagoras' theorem:

@geogebra[pythagoras]

Notice how the right angle is at point A, and the two legs are perpendicular...
```

**Result:** A beautiful, collapsible embed with the diagram inside.

---

## Available Templates

### Pythagoras' Theorem

- **`@geogebra[pythagoras]`** - Classic right triangle
  - Simple right triangle with legs and hypotenuse
  - Perfect for introducing Pythagoras' theorem
  - Dimensions: 500×400

- **`@geogebra[pythagoras_squares]`** - Right triangle with squares
  - Shows squares on each side
  - Visualizes a² + b² = c²
  - Dimensions: 600×500

### Coordinate Geometry

- **`@geogebra[distance_formula]`** - Distance between two points
  - Two points with connecting segment
  - For teaching distance formula
  - Dimensions: 500×400

- **`@geogebra[coordinate_grid]`** - Blank coordinate system
  - Empty grid for plotting
  - For interactive exploration
  - Dimensions: 500×500

### Area & Perimeter

- **`@geogebra[rectangle_area]`** - Rectangle
  - 4×2 rectangle for area and perimeter calculations
  - Dimensions: 500×400

- **`@geogebra[circle_area]`** - Circle
  - Circle with center and radius
  - For area and circumference calculations
  - Dimensions: 500×500

- **`@geogebra[triangle_area]`** - Triangle
  - Triangle with base and height
  - For area calculation
  - Dimensions: 500×450

### Angles & Triangles

- **`@geogebra[right_angle]`** - Right angle indicator
  - Right triangle with right angle marked
  - Dimensions: 500×400

- **`@geogebra[isosceles_triangle]`** - Isosceles triangle
  - Triangle with two equal sides
  - Dimensions: 500×450

- **`@geogebra[equilateral_triangle]`** - Equilateral triangle
  - Triangle with all sides equal
  - Dimensions: 500×450

---

## Usage Examples

### Example 1: Pythagoras' Theorem Explanation

```
Let's explore Pythagoras' theorem! 📐

@geogebra[pythagoras]

In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. 

In this diagram:
- The right angle is at point A
- The two legs are AB and AC
- The hypotenuse is BC

Can you calculate the hypotenuse if AB = 3 and AC = 4?
```

### Example 2: Distance Formula

```
The distance between two points can be found using the distance formula:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

@geogebra[distance_formula]

Here, point P is at (-2, -1) and point Q is at (2, 1).

What's the distance between them?
```

### Example 3: Rectangle Area

```
Let's calculate the area of a rectangle:

@geogebra[rectangle_area]

Area = length × width

In this rectangle:
- Length = 4 units
- Width = 2 units
- Area = 4 × 2 = 8 square units

Try calculating the perimeter!
```

---

## How It Works

1. **Agent writes:** `@geogebra[template-id]` in markdown response
2. **Remark plugin detects:** The pattern and extracts the template ID
3. **Template is loaded:** From `src/content/geogebraTemplates.ts`
4. **React component renders:** `GeoGebraEmbed` component displays the diagram
5. **User sees:** A beautiful, collapsible embed with:
   - Header with template name and description
   - Collapsible content (click to expand/collapse)
   - GeoGebra applet inside
   - Topic badge at the bottom

---

## Embed Component Features

### Visual Design

- **Header:** Shows template name, description, and collapse button
- **Icon:** 📐 geometry icon for quick recognition
- **Styling:** Gradient background, hover effects, smooth transitions
- **Topic Badge:** Color-coded by topic (blue background)
- **Responsive:** Works on all screen sizes

### Interactivity

- **Collapsible:** Click header to expand/collapse
- **Smooth animations:** Chevron rotates on toggle
- **Hover effects:** Header highlights on hover
- **Shadow effects:** Professional depth and elevation

---

## Advanced: Custom GeoGebra Code

For diagrams not in the template library, use **METHOD 2**:

**Syntax:** Code fence with `geogebra` language

```geogebra
A = (-2, -2)
B = (2, -2)
C = (-2, 2)
tri = Polygon(A, B, C)
SetColor(tri, "lightblue")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)
SetFixed(A, true)
SetFixed(B, true)
SetFixed(C, true)
```

**When to use:**
- Creating custom diagrams
- Combining multiple shapes
- Advanced geometry constructions

**Limitations:**
- More verbose than templates
- Requires GeoGebra command knowledge
- No collapsible UI

---

## Adding New Templates

To add a new template:

1. **Edit:** `src/content/geogebraTemplates.ts`
2. **Add entry** to `geogebraTemplates` object:

```typescript
my_custom_template: {
  id: "my_custom_template",
  name: "My Custom Template",
  description: "Description of what this shows",
  topic: "Topic Name",
  width: 500,
  height: 400,
  code: `
    // GeoGebra commands here
    A = (0, 0)
    B = (1, 0)
    // ...
  `,
},
```

3. **Use:** `@geogebra[my_custom_template]`

---

## Technical Details

### Files

- **`src/content/geogebraTemplates.ts`** - Template definitions
- **`src/lib/remark-geogebra-embed.ts`** - Remark plugin for parsing `@geogebra[...]` syntax
- **`src/components/geogebra/GeoGebraEmbed.tsx`** - React component for rendering embeds
- **`src/components/assistant-ui/markdown-text.tsx`** - Integration point

### Plugin Architecture

1. **Remark plugin** detects `@geogebra[template-id]` in markdown text
2. Converts to MDX JSX expression: `<GeoGebraEmbed templateId="template-id" />`
3. **React component** renders the embed with:
   - Header with metadata
   - Collapsible content
   - GeoGebraBoard component inside

### Performance

- ✅ Lazy loading: Templates only loaded when used
- ✅ Minimal bundle size: Templates are just strings
- ✅ No external dependencies: Uses existing GeoGebra integration
- ✅ Efficient rendering: Collapsible prevents rendering all at once

---

## Troubleshooting

### Template not found

**Error:** "GeoGebra template not found: my_template"

**Solution:** Check the template ID spelling in `geogebraTemplates.ts`

### Diagram not rendering

**Check:**
1. Is GeoGebra script loaded in `index.html`?
2. Are all GeoGebra commands valid?
3. Check browser console for errors

### Styling issues

**Check:**
1. Is Tailwind CSS configured?
2. Are Lucide icons installed?
3. Check component CSS classes

---

## Best Practices

### ✅ DO

- Use templates for common diagrams
- Keep responses concise around embeds
- Use collapsible feature for better readability
- Combine with LaTeX for mathematical notation

### ❌ DON'T

- Don't embed multiple diagrams in one response
- Don't use custom code when a template exists
- Don't forget to explain what the diagram shows
- Don't use 3D coordinates (GeoGebra 2D only)

---

## Examples in Action

### Pythagoras' Theorem

```
Let's explore Pythagoras' theorem! 📐

@geogebra[pythagoras]

In a right triangle with legs of length 3 and 4:
- $a = 3$
- $b = 4$
- $c = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$

So the hypotenuse is 5 units!
```

### Distance Formula

```
The distance between two points $P(x_1, y_1)$ and $Q(x_2, y_2)$ is:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

@geogebra[distance_formula]

In this example, the distance is $\sqrt{20} \approx 4.47$ units.
```

### Area & Perimeter

```
Let's calculate the area and perimeter of this rectangle:

@geogebra[rectangle_area]

**Area** = length × width = 4 × 2 = 8 square units

**Perimeter** = 2(length + width) = 2(4 + 2) = 12 units
```

---

## Summary

| Feature | Template Embed | Custom Code |
|---------|---|---|
| Syntax | `@geogebra[id]` | ````geogebra ... ```` |
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Appearance | Professional | Basic |
| Collapsible | ✅ | ❌ |
| Customization | Limited | Unlimited |
| Best for | Common diagrams | Custom diagrams |

**Recommendation:** Use template embeds for 95% of cases. Use custom code only when a template doesn't exist.
