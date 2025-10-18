export const backgroundKnowledge = `# Math Reference (Chapters A-N)

## A. SURDS & RADICALS
**Definitions:** Radical = any √ number; Surd = irrational radical (√2, √3, √5); √a × √a = a, √a ≥ 0
**Properties:** √(ab) = √a × √b; √(a/b) = √a/√b (a,b ≥ 0)
**Simplify:** 3√3 + 5√3 = 8√3; √18 = √(9×2) = 3√2
**Rationalize:** √(9/3) × √3/√3 = 3√3

## B. SCIENTIFIC NOTATION
**Format:** a × 10^k where 1 ≤ a < 10, k ∈ ℤ
**Examples:** 37,600 = 3.76×10⁴; 0.00086 = 8.6×10⁻⁴; 3.2×10² = 320; 5.76×10⁻⁵ = 0.0000576

## C. NUMBER SYSTEMS
**ℝ** = real numbers; **ℕ** = {0,1,2,3,...}; **ℤ** = {...,-2,-1,0,1,2,...}; **ℤ⁺** = {1,2,3,...}; **ℚ** = {p/q | p,q∈ℤ, q≠0}
**Set notation:** {x | -3<x<2} = all x between -3 and 2; {x | 1≤x≤4, x∈ℕ} = {1,2,3,4}

## D. ALGEBRAIC SIMPLIFICATION
**Laws:** a(b+c) = ab+ac; a² = a×a
**Examples:** 3x+7x-10 = 10x-10; 7ab+5ba = 12ab; 3(2x+5)+4(5+4x) = 22x+35

## E. LINEAR EQUATIONS & INEQUALITIES
**Rules:** Multiply/divide by negative → reverse inequality sign; never multiply/divide by unknown
**Examples:** 2x+5=25 → x=10; 3x-7>11 → x>6
**Simultaneous:** x+2y=9, x-y=3 → x=5, y=2

## F. MODULUS (ABSOLUTE VALUE)
**Definition:** |x| = size ignoring sign = distance from 0 on number line
**Formula:** |x| = {x if x≥0; -x if x<0} = √(x²)
**Solve:** |x|=a → x=±a; |x|=3 → x=3 or x=-3; |x-1|=3 → x=4 or x=-2

## G. PRODUCT EXPANSION
**Rules:** (a+b)(c+d) = ac+ad+bc+bd; (a+b)(a-b) = a²-b²; (a+b)² = a²+2ab+b²
**Examples:** (2x+1)(x+3) = 2x²+7x+3; (5x-2)(5x+2) = 25x²-4; (x+2)² = x²+4x+4

## H. FACTORISATION
**Process:** (1) Common factors (2) Recognize type: a²-b²=(a+b)(a-b); a²+2ab+b²=(a+b)²; x²+bx+c=(x+p)(x+q) where p+q=b, pq=c
**Examples:** 3x²-12x = 3x(x-4); 4x²-1 = (2x+1)(2x-1); x²-12x+36 = (x-6)²; x²+9x+8 = (x+8)(x+1)
**Splitting method (ax²+bx+c):** Find ac, find factors of ac that add to b, split bx, factor by grouping
**Example:** 2x²-x-10: ac=-20, factors -5,+4 → 2x²-5x+4x-10 = x(2x-5)+2(2x-5) = (2x-5)(x+2)

## I. FORMULA REARRANGEMENT
**Method:** Use equation-solving to isolate variable
**Examples:** D=xt+p → x=(D-p)/t; c=m/z → z=m/c; s=½gt² → t=√(2s/g)

## J. ALGEBRAIC FRACTIONS
**Method:** Find LCD, combine
**Examples:** 2+3/x = (2x+3)/x; (x-1)/3-(x+3)/2 = (2x-2-3x-9)/6 = (-x-11)/6

## K. CONGRUENCE & SIMILARITY
**Congruent:** Same shape & size. Tests: SSS (3 sides equal), SAS (2 sides + included angle), AAcorS (2 angles + corresponding side), RHS (right triangle: hypotenuse + 1 side)
**Similar:** One is enlargement of other; equiangular; sides in same ratio. Example: ratio 2:3, side 6cm → corresponding side 9cm

## L. PYTHAGORAS' THEOREM
**Formula:** c² = a² + b² (c=hypotenuse, a,b=other sides)
**Converse:** If a²+b²=c² then triangle is right-angled
**Examples:** a=0.8m, b=1m → c=√1.64≈1.28m; c=5m, b=1.7m → a=√22.11≈4.70m
**3D:** Apply theorem twice in different planes

## M. COORDINATE GEOMETRY
**Plane:** Origin O(0,0); x-axis (horizontal); y-axis (vertical); point (a,b)
**Distance:** AB = √[(x₂-x₁)²+(y₂-y₁)²]
**Midpoint:** M = ((x₁+x₂)/2, (y₁+y₂)/2)
**Gradient:** m = (y₂-y₁)/(x₂-x₁); horizontal=0; vertical=undefined; parallel→equal m; perpendicular→m₁m₂=-1
**Line equations:** Vertical: x=a; Horizontal: y=c; Point-gradient: y-b=m(x-a); Gradient-intercept: y=mx+c; General: Ax-By=C
**Intercepts:** x-intercept: set y=0; y-intercept: set x=0
**Point on line:** Coordinates satisfy equation

## N. RIGHT TRIANGLE TRIGONOMETRY
**Labels:** HYP=hypotenuse (longest, opposite right angle); OPP=opposite θ; ADJ=adjacent to θ
**Ratios:** sin θ = OPP/HYP; cos θ = ADJ/HYP; tan θ = OPP/ADJ
**Common values:**
| θ | 0° | 30° | 45° | 60° | 90° |
|---|----|----|----|----|-----|
| sin | 0 | 1/2 | 1/√2 | √3/2 | 1 |
| cos | 1 | √3/2 | 1/√2 | 1/2 | 0 |
| tan | 0 | 1/√3 | 1 | √3 | undef |
**Inverse:** θ = sin⁻¹(a/b) = arcsin(a/b); similarly cos⁻¹, tan⁻¹
**Applications:** Angle of elevation (above horizontal); angle of depression (below horizontal); isosceles triangles (draw perpendicular from apex)`