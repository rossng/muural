import { courseToBricks, Grid } from './Bond2';
import { bricksLogicalWidth, makeFixedCourse, makeReferenceCourse } from './Bond3';

export interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const WAAL: BrickDefinition = {
  colour: 'red',
  width: 210,
  height: 50,
  expectedHeadJointWidth: 10,
};

export const GRID: Grid = {
  minHeadJointWidth: 10,
  courseHeight: 62.5,
  baseBrickDefinition: WAAL,
};

export interface Bond {
  courses: BondCourse[];
}

export interface BondCourse {
  offsetFraction?: number;
  bricks: BrickVariant[];
}

export interface BrickVariant {
  width: number;
  definition: BrickDefinition;
}

export interface BrickDefinition {
  colour: string;
  width: number;
  height: number;
  expectedHeadJointWidth: number;
}

export function asSimpleFraction(n: number): [number, number] | undefined {
  for (let numerator = 1; numerator < 10; numerator++) {
    for (let denominator = 1; denominator < 10; denominator++) {
      if (Math.abs(numerator / denominator - n) < 1e-6) {
        return [numerator, denominator];
      }
    }
  }
}

/** Coeff must be a simple fraction */
export function splitBrick(brick: BrickDefinition, coeff: number): number {
  const fraction = asSimpleFraction(coeff);

  if (!fraction) {
    throw new Error('Multiplier must be a simple fraction');
  }

  const [numerator, denominator] = fraction;

  const headJointsWidth = (denominator - 1) * brick.expectedHeadJointWidth;
  const eachPieceWidth = (brick.width - headJointsWidth) / denominator;

  return eachPieceWidth * numerator + brick.expectedHeadJointWidth * (numerator - 1);
}

export function measureSplit(brick: BrickDefinition, width: number): number | undefined {
  for (let numerator = 1; numerator < 10; numerator++) {
    for (let denominator = 1; denominator < 10; denominator++) {
      const splitWidth = splitBrick(brick, numerator / denominator);
      if (Math.abs(splitWidth - width) < 1e-6) {
        return numerator / denominator;
      }
    }
  }
}

export const STRETCHER_BOND = (brick: BrickDefinition) => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [{ width: brick.width, definition: brick }],
    },
    {
      offsetFraction: 0.5,
      bricks: [{ width: brick.width, definition: brick }],
    },
  ],
});

export const FLEMISH_BOND = (brick: BrickDefinition): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [
        { width: splitBrick(brick, 1 / 2), definition: brick },
        { width: brick.width, definition: brick },
      ],
    },
    {
      offsetFraction: 3 / 4,
      bricks: [
        { width: splitBrick(brick, 1 / 2), definition: brick },
        { width: brick.width, definition: brick },
      ],
    },
  ],
});

export const calculateBricksForContainer = (bond: Bond, width: number, height: number): Brick[] => {
  const coursesCount = Math.ceil(height / GRID.courseHeight);

  const allBricks: Brick[] = [];

  const referenceCourse = makeReferenceCourse(bond.courses[0], width, GRID);
  const referenceCourseWidth = bricksLogicalWidth(referenceCourse);
  const referenceCourseBricks = courseToBricks(width, 0, referenceCourse);
  allBricks.push(...referenceCourseBricks);

  for (let courseIndex = 1; courseIndex < coursesCount; courseIndex++) {
    const courseBond = bond.courses[courseIndex % bond.courses.length];
    const courseBricks = makeFixedCourse(courseBond, referenceCourseWidth);
    const bricks = courseToBricks(width, courseIndex * GRID.courseHeight, courseBricks);
    allBricks.push(...bricks);
  }

  return allBricks;
};
