import { supabase } from "../supabaseClient";

const updatedData = [
  [
    {
      id: 20,
      name: "Square",
      description:
        "🔹 A square is a planar quadrilateral that has all four sides of equal length and all its interior angles measure $90^\\circ$. Each side is perpendicular to its adjacent one, ensuring the right-angle nature of the shape. A square is a special case of both a rectangle (all angles are right) and a rhombus (all sides are equal). This gives the square a very regular shape and it is often used as a basic geometric figure in calculations and constructions.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nArea:\r\n$A = a^2$,\r\nwhere $a$ is the length of the square's side.\r\n\r\nPerimeter:\r\n$P = 4 \\cdot a$.",
    },
    {
      id: 102,
      name: "Regular Hexagon",
      description:
        "🔹 A regular hexagon: A polygon with six equal sides and angles. It consists of six equilateral triangles.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nThe area of a regular hexagon (A) is calculated as\r\n$A = \\frac{3\\sqrt{3}}{2} \\cdot a^2$,\r\nwhere $a$ is the length of one side.\r\n\r\nThe perimeter is simply\r\n$P = 6 \\cdot a$",
    },
    {
      id: 103,
      name: "Rhombus",
      description:
        "🔹 A rhombus: A quadrilateral with four equal-length sides and skewed angles. Its diagonals intersect at a right angle.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nThe area of a rhombus (A) is calculated as\r\n$A = \\frac{d_1 \\cdot d_2}{2}$,\r\nwhere $d_1$ and $d_2$ are the lengths of the diagonals.\r\n\r\nThe perimeter of a rhombus (P) is calculated as\r\n$P = 4 \\cdot a$,\r\nwhere $a$ is the length of one side.",
    },
    {
      id: 23,
      name: "Isosceles Trapezoid",
      description:
        "🔹 An isosceles trapezoid is a quadrilateral with two opposite parallel sides (bases) and two legs of equal length. The angles at the base are equal, and the trapezoid has an axis of symmetry perpendicular to the bases.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nArea:\r\n$A = \\frac{(a + c)}{2} \\cdot v$,\r\nwhere $a, c$ are the lengths of the parallel sides and $v$ is the height.\r\n\r\nPerimeter:\r\n$P = a + b + c + d$,\r\nwhere $a, c$ are the bases and $b, d$ are the legs (with $b = d$).",
    },
    {
      id: 107,
      name: "Cylinder",
      description:
        "🔹 Cylinder: A solid with two parallel circular bases connected by a curved surface. Commonly used in construction (e.g., cans).",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nThe volume of a cylinder (V) is calculated as\r\n$V = \\pi \\cdot r^2 \\cdot v$,\r\nwhere $r$ is the radius of the base and $v$ is the height of the cylinder.\r\n\r\nThe surface area of the cylinder (S) is calculated as\r\n$S = 2 \\cdot \\pi \\cdot r \\cdot (r + v)$,\r\nwhere $r$ is the radius of the base and $v$ is the height of the cylinder.",
    },
    {
      id: 2,
      name: "Cube",
      description:
        "🔹 A cube is a three-dimensional solid with six identical square faces, twelve equal edges, and eight vertices. It is a special case of a cuboid, where all edges are the same length.\r\n All cube faces are either parallel or perpendicular to each other, forming a perfectly regular shape with a high degree of symmetry. The cube is often used as a model example in geometry and physics.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nVolume:\r\n$V = a^3$,\r\nwhere $a$ is the length of the cube’s edge.\r\n\r\nSurface area:\r\n$S = 6 \\cdot a^2$.",
    },
    {
      id: 21,
      name: "Rectangle",
      description:
        "🔹 A rectangle is a planar quadrilateral with opposite sides of equal length and all interior angles being right (90°). It is a type of parallelogram because both pairs of opposite sides are parallel.\r\n The diagonals of a rectangle bisect each other and are of equal length. They divide the rectangle into two congruent right triangles, which is useful in calculations and constructions.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nArea:\r\n$A = a \\cdot b$,\r\nwhere $a$ and $b$ are the lengths of the rectangle’s sides.\r\n\r\nPerimeter:\r\n$P = 2 \\cdot (a + b)$.",
    },
    {
      id: 26,
      name: "Pyramid",
      description:
        "🔹 A pyramid is a three-dimensional solid with a polygonal base and all its lateral faces are triangles that meet at a common vertex. The height of the pyramid is the perpendicular from this vertex to the base plane.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nVolume:\r\n$V = \\frac{1}{3} \\cdot S \\cdot h$\r\nwhere $S$ is the base area and $h$ is the height of the pyramid.\r\n\r\nSurface area (regular square pyramid):\r\n$S = a^2 + 2 \\cdot a \\cdot \\sqrt{\\left( \\frac{a}{2} \\right)^2 + v^2}$\r\nwhere $a$ is the side length of the base and $v$ is the height of the lateral face.",
    },
    {
      id: 22,
      name: "Equilateral Triangle",
      description:
        "🔹 An equilateral triangle is a triangle with all three sides of equal length. All its interior angles are equal and each measures 60°. This triangle also has equal altitudes, medians, and angle bisectors, all intersecting at one point – the centroid.",
      description1:
        "Area:\r\n$A = \\frac{a^2 \\cdot \\sqrt{3}}{4}$\r\n\r\nPerimeter:\r\n$P = 3 \\cdot a$",
    },
    {
      id: 24,
      name: "Ellipse",
      description:
        "🔹 An ellipse is a planar shape formed by a set of points for which the sum of distances from two fixed points (foci) is constant. It has two axes – major (longer) and minor (shorter), which intersect at the center and define its shape.",
      description1:
        "🔹 Formulas for area (A) and approximate perimeter (P):\r\nArea:\r\n$A = \\pi \\cdot a \\cdot b$\r\n\r\nPerimeter (approx. using Ramanujan’s formula):\r\n$P \\approx \\pi \\cdot \\left[ 3(a + b) - \\sqrt{(3a + b)(a + 3b)} \\right]$",
    },
    {
      id: 128,
      name: "Regular n-gon",
      description:
        "🔹 Regular n-gon: A planar geometric figure with n sides and n interior angles. All its sides are equal in length and all its interior angles are equal. Examples include the regular triangle (equilateral), square, pentagon, octagon, etc.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P): The area of a regular n-gon can be calculated using the formula $A = \\frac{n \\cdot a \\cdot r}{2}$, where n is the number of sides, a is the side length, and r is the radius of the inscribed circle (distance from center to the midpoint of a side). The perimeter P is the total length of all sides: $P = n \\cdot a$.",
    },
    {
      id: 124,
      name: "Frustum of a Cone",
      description:
        "🔹 Frustum of a cone: A solid formed when the tip of a cone is cut off by a plane parallel to its base. It always has two circular bases, one larger and one smaller.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S): The volume of a frustum is calculated as $V = \\frac{1}{3}\\pi v(R^2 + R \\cdot r + r^2)$, where v is the height, R the radius of the larger base, and r the radius of the smaller base. The total surface area S is the sum of the areas of both bases and the lateral surface: $S = \\pi R^2 + \\pi r^2 + \\pi s(R + r)$, where s is the slant height of the frustum.",
    },
    {
      id: 25,
      name: "Sphere",
      description:
        "🔹 A sphere: A three-dimensional body consisting of all points in space that are at the same distance from a given center, called the radius. It has a smooth surface and no edges or vertices.\r\nThe surface of the sphere is spherical and composed of circles at various heights. The diameter of the sphere is twice the radius and connects the two farthest points on its surface.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nThe volume of a sphere (V) is calculated as\r\n$V = \\frac{4}{3} \\cdot \\pi \\cdot r^3$,\r\nwhere $r$ is the radius of the sphere.\r\n\r\nThe surface area of a sphere (S) is calculated as\r\n$S = 4 \\cdot \\pi \\cdot r^2$",
    },
    {
      id: 122,
      name: "Annulus (Ring)",
      description:
        "🔹 Annulus (ring): A planar geometric shape representing the area between two concentric circles – that is, two circles sharing the same center but with different radii. Commonly encountered in calculations related to circular holes, such as in washers or piston rings. It also has a 3D variant known as a torus (hollow ring).",
      description1:
        "🔹 Formulas for area (A) and perimeter (P): The area of an annulus (A) is calculated as the difference between the areas of the larger and smaller circles: $A = \\pi \\cdot (R^2 - r^2)$, where R is the radius of the larger circle and r the radius of the smaller circle. The perimeter (P) of the annulus is the sum of the circumferences of both circles: $P = 2 \\cdot \\pi \\cdot (R + r)$.",
    },
    {
      id: 110,
      name: "General Trapezoid",
      description:
        "🔹 General trapezoid: A quadrilateral with one pair of parallel sides. Unlike the isosceles trapezoid, it does not need to have equal legs.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nThe area of a general trapezoid (A) is calculated as\r\n$A = \\frac{a + c}{2} \\cdot v$,\r\nwhere $a$ and $c$ are the lengths of the bases (parallel sides) and $v$ is the height.\r\n\r\nThe perimeter of the trapezoid (P) is the sum of the lengths of all four sides:\r\n$P = a + b + c + d$",
    },
    {
      id: 106,
      name: "Cone",
      description:
        "🔹 Cone: A solid with a circular base and a vertex above its center. It is formed by rotating a right triangle around one of its legs.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nThe volume of a cone (V) is calculated as\r\n$V = \\frac{1}{3} \\cdot \\pi \\cdot r^2 \\cdot v$,\r\nwhere $r$ is the radius of the base and $v$ is the height of the cone.\r\n\r\nThe surface area of the cone (S) is given by the formula\r\n$S = \\pi \\cdot r \\cdot (r + s)$,\r\nwhere $r$ is the radius of the base and $s$ is the slant height of the cone.",
    },
    {
      id: 101,
      name: "Scalene Triangle",
      description:
        "🔹 Scalene triangle: A triangle that has no equal sides or angles. It can be acute, right, or obtuse.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nThe area of a scalene triangle (A) can be calculated using two sides and the included angle:\r\n$A = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin(\\gamma)$,\r\nwhere $a$ and $b$ are the lengths of two sides and $\\gamma$ is the included angle.\r\n\r\nThe perimeter of the triangle (P) is calculated as\r\n$P = a + b + c$,\r\nwhere $a$, $b$, and $c$ are the lengths of all three sides.",
    },
    {
      id: 121,
      name: "Kite",
      description:
        '🔹 Kite: A convex quadrilateral with two pairs of adjacent sides of equal length. These equal sides always originate from a common vertex. Its shape is typically similar to a kite, hence the English name "kite".',
      description1:
        "🔹 Formulas for area (A): The area of a kite (A) is calculated as half the product of the lengths of its diagonals:\r\n$A = \\frac{d_1 \\cdot d_2}{2}$.\r\nHere $d_1$ and $d_2$ represent the lengths of the diagonals.\r\n\r\nThe perimeter of a kite (P) is calculated by summing the lengths of all its sides, which simplifies due to the kite’s properties to\r\n$P = 2 \\cdot (a + b)$,\r\nwhere $a$ and $b$ are the lengths of two different adjacent sides.",
    },
    {
      id: 19,
      name: "Circle",
      description:
        "🔹 A circle is a planar figure made up of all points in a plane that are at the same distance from a given center, called the radius. The longest chord passing through the center is called the diameter and is twice the radius. The circumference of the circle forms its boundary – the circular line. The circle includes the boundary and all points inside it. It has no vertices or edges because it is smooth and curved.",
      description1:
        "🔹 Formulas for area (A) and perimeter (P):\r\nArea:\r\n$A = \\pi \\cdot r^2$,\r\nwhere $r$ is the radius of the circle.\r\n\r\nPerimeter:\r\n$P = 2 \\cdot \\pi \\cdot r$.",
    },
    {
      id: 35,
      name: "Cuboid",
      description:
        "🔹 A cuboid is a three-dimensional solid composed of six rectangular faces. Opposite faces are parallel and identical, which means the cuboid has two different lengths, two widths, and two heights. It has 12 edges and 8 vertices. All interior angles between faces are right angles.\r\n Cuboids are commonly used to describe everyday objects like boxes, books, or rooms because their shape allows for easy stacking and measurement.",
      description1:
        "🔹 Formulas for volume (V) and surface area (S):\r\nVolume:\r\n$V = \\frac{1}{3} \\cdot S \\cdot h$,\r\nwhere $S$ is the base area and $h$ the height of the pyramid.\r\n\r\nSurface area:\r\n$S = S_{\\text{base}} + S_{\\text{lateral}} = S + \\frac{1}{2} \\cdot o \\cdot l$,\r\nwhere $o$ is the perimeter of the base and $l$ is the length of the lateral edge or height of the side face (in the case of equilateral triangles).",
    },
  ],
];

async function updateGeometricBodies() {
  for (const item of updatedData) {
    const { id, name, description, description1 } = item;

    const { error } = await supabase
      .from("geometric_bodies")
      .update({
        name,
        description,
        description1,
      })
      .eq("id", id);

    if (error) {
      console.error(`Error updating ID ${id}:`, error.message);
    } else {
      console.log(`Updated ID ${id} successfully`);
    }
  }
}

updateGeometricBodies();

function data() {
  return (
    <div>
      <h1>Data Update</h1>
      <p>Check console for update results.</p>
      <button onClick={updateGeometricBodies}>Update Geometric Bodies</button>
    </div>
  );
}

export default data;
