/**
 * GeoGebra Template Library
 * Pre-built, elegant geometry diagrams for common math topics
 * Used with embed syntax: @geogebra[pythagoras]
 */

export interface GeoGebraTemplate {
  id: string;
  name: string;
  description: string;
  topic: string;
  code: string;
  width?: number;
  height?: number;
}

export const geogebraTemplates: Record<string, GeoGebraTemplate> = {
  // ============================================
  // PYTHAGORAS' THEOREM
  // ============================================
  pythagoras: {
    id: "pythagoras",
    name: "Right Triangle - Pythagoras' Theorem",
    description: "Classic right triangle with legs and hypotenuse labeled - drag vertices to explore!",
    topic: "Pythagoras",
    width: 500,
    height: 400,
    code: `A = (-2, -2)
B = (2, -2)
C = (-2, 2)
tri = Polygon(A, B, C)
SetColor(tri, "lightblue")
SetLineThickness(tri, 2)
SetPointSize(A, 6)
SetPointSize(B, 6)
SetPointSize(C, 6)`,
  },

  pythagoras_squares: {
    id: "pythagoras_squares",
    name: "Pythagoras with Squares",
    description: "Right triangle with squares on each side showing a² + b² = c² - drag to explore!",
    topic: "Pythagoras",
    width: 600,
    height: 500,
    code: `A = (-1, -1)
B = (2, -1)
C = (-1, 2)
tri = Polygon(A, B, C)
SetColor(tri, "lightblue")
SetLineThickness(tri, 2)
sq1 = Polygon((-1, -1), (-1, -4), (2, -4), (2, -1))
sq2 = Polygon((-1, 2), (-4, 2), (-4, 5), (-1, 5))
sq3 = Polygon((2, -1), (5, -1), (5, 2), (2, 2))
SetColor(sq1, "lightyellow")
SetColor(sq2, "lightgreen")
SetColor(sq3, "lightcoral")
SetLineThickness(sq1, 1)
SetLineThickness(sq2, 1)
SetLineThickness(sq3, 1)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)`,
  },

  // ============================================
  // COORDINATE GEOMETRY
  // ============================================
  distance_formula: {
    id: "distance_formula",
    name: "Distance Between Two Points",
    description: "Two points with connecting segment for distance formula - drag to explore!",
    topic: "Coordinate Geometry",
    width: 500,
    height: 400,
    code: `P = (-2, -1)
Q = (2, 1)
seg = Segment(P, Q)
SetColor(P, "red")
SetColor(Q, "red")
SetPointSize(P, 6)
SetPointSize(Q, 6)
SetLineThickness(seg, 2)`,
  },

  coordinate_grid: {
    id: "coordinate_grid",
    name: "Coordinate Grid with Points",
    description: "Blank coordinate system for plotting points",
    topic: "Coordinate Geometry",
    width: 500,
    height: 500,
    code: `A = (-2, -2)
B = (2, -2)
C = (2, 2)
D = (-2, 2)
grid = Polygon(A, B, C, D)
SetColor(grid, "white")
SetLineThickness(grid, 1)
SetLineStyle(grid, 0)
SetPointSize(A, 3)
SetPointSize(B, 3)
SetPointSize(C, 3)
SetPointSize(D, 3)`,
  },

  // ============================================
  // AREA & PERIMETER
  // ============================================
  rectangle_area: {
    id: "rectangle_area",
    name: "Rectangle - Area & Perimeter",
    description: "Rectangle with dimensions for calculating area and perimeter - drag to explore!",
    topic: "Area & Perimeter",
    width: 500,
    height: 400,
    code: `A = (-2, -1)
B = (2, -1)
C = (2, 1)
D = (-2, 1)
rect = Polygon(A, B, C, D)
SetColor(rect, "lightblue")
SetLineThickness(rect, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)
SetPointSize(D, 5)`,
  },

  circle_area: {
    id: "circle_area",
    name: "Circle - Area & Circumference",
    description: "Circle with center and radius for calculating area and circumference - drag to explore!",
    topic: "Area & Perimeter",
    width: 500,
    height: 500,
    code: `O = (0, 0)
circ = Circle(O, 2)
SetColor(circ, "lightyellow")
SetLineThickness(circ, 2)
SetPointSize(O, 5)`,
  },

  triangle_area: {
    id: "triangle_area",
    name: "Triangle - Area Calculation",
    description: "Triangle with base and height for area calculation - drag to explore!",
    topic: "Area & Perimeter",
    width: 500,
    height: 450,
    code: `A = (-2, -1)
B = (2, -1)
C = (0, 2)
tri = Polygon(A, B, C)
SetColor(tri, "lightgreen")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)`,
  },

  // ============================================
  // ANGLES & TRIANGLES
  // ============================================
  right_angle: {
    id: "right_angle",
    name: "Right Angle Indicator",
    description: "Right triangle with right angle marked at corner - drag to explore!",
    topic: "Angles",
    width: 500,
    height: 400,
    code: `A = (-2, -2)
B = (2, -2)
C = (-2, 2)
tri = Polygon(A, B, C)
SetColor(tri, "lightblue")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)`,
  },

  isosceles_triangle: {
    id: "isosceles_triangle",
    name: "Isosceles Triangle",
    description: "Isosceles triangle with two equal sides - drag to explore!",
    topic: "Triangles",
    width: 500,
    height: 450,
    code: `A = (-2, -1)
B = (2, -1)
C = (0, 2.5)
tri = Polygon(A, B, C)
SetColor(tri, "lightcyan")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)`,
  },

  equilateral_triangle: {
    id: "equilateral_triangle",
    name: "Equilateral Triangle",
    description: "Equilateral triangle with all sides equal - drag to explore!",
    topic: "Triangles",
    width: 500,
    height: 450,
    code: `A = (-2, -1)
B = (2, -1)
C = (0, 2.46)
tri = Polygon(A, B, C)
SetColor(tri, "lightpink")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)`,
  },

  // ============================================
  // ADDITIONAL USEFUL SHAPES
  // ============================================
  scalene_triangle: {
    id: "scalene_triangle",
    name: "Scalene Triangle",
    description: "Scalene triangle with all sides different lengths",
    topic: "Triangles",
    width: 500,
    height: 450,
    code: `A = (-2, -1)
B = (2.5, -1)
C = (0, 2.5)
tri = Polygon(A, B, C)
SetColor(tri, "lightyellow")
SetLineThickness(tri, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)
SetFixed(A, true)
SetFixed(B, true)
SetFixed(C, true)`,
  },

  parallel_lines: {
    id: "parallel_lines",
    name: "Parallel Lines",
    description: "Two parallel lines with transversal",
    topic: "Lines & Angles",
    width: 500,
    height: 450,
    code: `line1 = Line((-2, -1), (2, -1))
line2 = Line((-2, 1), (2, 1))
transversal = Line((-1, -2), (1, 2))
SetColor(line1, "blue")
SetColor(line2, "blue")
SetColor(transversal, "red")
SetLineThickness(line1, 2)
SetLineThickness(line2, 2)
SetLineThickness(transversal, 2)`,
  },

  angle_on_line: {
    id: "angle_on_line",
    name: "Angles on a Line",
    description: "Angles on a straight line sum to 180°",
    topic: "Angles",
    width: 500,
    height: 400,
    code: `A = (-2, 0)
B = (0, 0)
C = (2, 0)
D = (0, 1.5)
angle1 = Angle(A, B, D)
angle2 = Angle(D, B, C)
SetColor(A, "red")
SetColor(C, "red")
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)
SetPointSize(D, 5)
SetLineThickness(Segment(A, C), 2)
SetLineThickness(Segment(B, D), 2)`,
  },

  sector_circle: {
    id: "sector_circle",
    name: "Circle Sector",
    description: "Sector of a circle showing angle at center",
    topic: "Circles",
    width: 500,
    height: 500,
    code: `O = (0, 0)
A = (2, 0)
B = (1.414, 1.414)
sector = Sector(O, A, B)
SetColor(sector, "lightyellow")
SetLineThickness(Sector(O, A, B), 2)
SetPointSize(O, 5)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetColor(O, "red")
SetColor(A, "blue")
SetColor(B, "blue")`,
  },

  congruent_triangles: {
    id: "congruent_triangles",
    name: "Congruent Triangles",
    description: "Two congruent triangles with same size and shape",
    topic: "Triangles",
    width: 500,
    height: 450,
    code: `A1 = (-2, -1)
B1 = (0, -1)
C1 = (-1, 1)
tri1 = Polygon(A1, B1, C1)
A2 = (1, -1)
B2 = (3, -1)
C2 = (2, 1)
tri2 = Polygon(A2, B2, C2)
SetColor(tri1, "lightblue")
SetColor(tri2, "lightblue")
SetLineThickness(tri1, 2)
SetLineThickness(tri2, 2)`,
  },

  pentagon: {
    id: "pentagon",
    name: "Pentagon",
    description: "Regular pentagon with 5 equal sides",
    topic: "Polygons",
    width: 500,
    height: 500,
    code: `A = (0, 2)
B = (1.9, 0.618)
C = (1.176, -1.618)
D = (-1.176, -1.618)
E = (-1.9, 0.618)
pent = Polygon(A, B, C, D, E)
SetColor(pent, "lightcyan")
SetLineThickness(pent, 2)
SetPointSize(A, 5)
SetPointSize(B, 5)
SetPointSize(C, 5)
SetPointSize(D, 5)
SetPointSize(E, 5)`,
  },

  hexagon: {
    id: "hexagon",
    name: "Hexagon",
    description: "Regular hexagon with 6 equal sides",
    topic: "Polygons",
    width: 500,
    height: 500,
    code: `A = (2, 0)
B = (1, 1.732)
C = (-1, 1.732)
D = (-2, 0)
E = (-1, -1.732)
F = (1, -1.732)
hex = Polygon(A, B, C, D, E, F)
SetColor(hex, "lightgreen")
SetLineThickness(hex, 2)
SetPointSize(A, 4)
SetPointSize(B, 4)
SetPointSize(C, 4)
SetPointSize(D, 4)
SetPointSize(E, 4)
SetPointSize(F, 4)`,
  },
};

/**
 * Get a template by ID
 * @param templateId - The template identifier (e.g., "pythagoras", "distance_formula")
 * @returns The template object or undefined if not found
 */
export function getGeoGebraTemplate(templateId: string): GeoGebraTemplate | undefined {
  return geogebraTemplates[templateId];
}

/**
 * Get all templates for a specific topic
 * @param topic - The topic name (e.g., "Pythagoras", "Coordinate Geometry")
 * @returns Array of templates for that topic
 */
export function getTemplatesByTopic(topic: string): GeoGebraTemplate[] {
  return Object.values(geogebraTemplates).filter(t => t.topic === topic);
}

/**
 * List all available template IDs
 * @returns Array of all template IDs
 */
export function listTemplateIds(): string[] {
  return Object.keys(geogebraTemplates);
}
