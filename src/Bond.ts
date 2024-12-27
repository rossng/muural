export interface Brick {
  x: number;
  y: number;
  id: string;
}

export const BRICK_WIDTH = 210;
export const BRICK_HEIGHT = 50;
export const MORTAR_JOINT = 10;

export interface Bond {
  courses: BondCourse[];
}

export interface BondCourse {
  offsetFraction?: number;
  bricks: BrickType[];
}

export interface BrickType {
  colour: string;
  width: number;
  height: number;
}

export const STRETCHER_BOND = {
  courses: [
    {
      offsetFraction: 0,
      bricks: [{ colour: 'red', width: 210, height: 50 }],
    },
    {
      offsetFraction: 0.5,
      bricks: [{ colour: 'red', width: 210, height: 50 }],
    },
  ],
};

export function getCourse(bond: Bond, courseIndex: number): BondCourse {
  return bond.courses[courseIndex % bond.courses.length];
}

export const generateCourse = (bond: Bond, courseIndex: number, columnsCount: number): Brick[] => {
  const course = getCourse(bond, courseIndex);
  const offset = course.offsetFraction ? -course.offsetFraction * (BRICK_WIDTH + MORTAR_JOINT) : 0;

  return Array.from({ length: columnsCount + 1 }, (_, columnIndex) => ({
    x: offset + columnIndex * (BRICK_WIDTH + MORTAR_JOINT),
    y: courseIndex * (BRICK_HEIGHT + MORTAR_JOINT),
    id: `brick-${courseIndex}-${columnIndex}`,
  }));
};

export const calculateBricksForContainer = (bond: Bond, width: number, height: number): Brick[] => {
  const columnsCount = Math.ceil(width / (BRICK_WIDTH + MORTAR_JOINT));
  const coursesCount = Math.ceil(height / (BRICK_HEIGHT + MORTAR_JOINT));

  const allBricks: Brick[] = [];

  for (let courseIndex = 0; courseIndex < coursesCount; courseIndex++) {
    const courseBricks = generateCourse(bond, courseIndex, columnsCount);
    allBricks.push(...courseBricks);
  }

  return allBricks;
};
