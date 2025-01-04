import { List } from 'immutable';
import { BaseBrick, calculateCut, cutBrick, CutBrick, totalLogicalWidth } from './Brick';
import { mod } from './Util';
import { WAAL } from './data/Bricks';

export interface Grid {
  courseHeight: number;
  baseBrick: BaseBrick;
  minHeadJointWidth: number;
}

export const GRID: Grid = {
  minHeadJointWidth: 10,
  courseHeight: 62.5,
  baseBrick: WAAL,
};

export interface Bond {
  courses: BondCourse[];
}

export interface BondCourse {
  offsetFraction?: number;
  bricks: CutBrick[];
}

/** Fill a course from scratch with the maximum number of bricks. */
export function makeReferenceCourse(bond: BondCourse, width: number, grid: Grid): List<CutBrick> {
  let bricks: List<CutBrick> = List([]);

  // Insert whole bricks that make up the offset
  let offsetLogicalWidth = 0;
  let offsetBrickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(bond.bricks.length - ++offsetBrickCount, bond.bricks.length)];
    const brickLogicalWidth = calculateCut(brick.definition, brick.width)!;

    if (offsetLogicalWidth + brickLogicalWidth > (bond.offsetFraction ?? 0)) {
      break;
    }

    offsetLogicalWidth += brickLogicalWidth;
    bricks = bricks.push(brick);
  }

  // Insert a partial brick to fill the remaining offset
  if (offsetLogicalWidth < (bond.offsetFraction ?? 0)) {
    const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount, bond.bricks.length)];

    bricks = bricks.push(cutBrick(brick.definition, bond.offsetFraction! - offsetLogicalWidth));
  }

  bricks = bricks.reverse();

  function minimumLength(bricks: List<CutBrick>): number {
    return (
      bricks.map((brick) => brick.width).reduce((a, b) => a + b, 0) +
      (bricks.count() - 1) * grid.minHeadJointWidth
    );
  }

  // Insert the maximum number of bricks that fit in the remaining space
  let brickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(brickCount++, bond.bricks.length)];

    if (minimumLength(bricks) + brick.width + grid.minHeadJointWidth > width) {
      break;
    }

    bricks = bricks.push(brick);
  }

  return bricks;
}

/** Fill a course with bricks until the specified logical width is reached. */
export function makeFixedCourse(bond: BondCourse, logicalWidth: number): List<CutBrick> {
  let bricks: List<CutBrick> = List([]);

  // Insert whole bricks that make up the offset
  let offsetLogicalWidth = 0;
  let offsetBrickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(bond.bricks.length - ++offsetBrickCount, bond.bricks.length)];
    const brickLogicalWidth = calculateCut(brick.definition, brick.width)!;

    if (offsetLogicalWidth + brickLogicalWidth > (bond.offsetFraction ?? 0)) {
      break;
    }

    offsetLogicalWidth += brickLogicalWidth;
    bricks = bricks.push(brick);
  }

  // Insert a partial brick to fill the remaining offset
  if (offsetLogicalWidth < (bond.offsetFraction ?? 0)) {
    const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount, bond.bricks.length)];

    bricks = bricks.push(cutBrick(brick.definition, bond.offsetFraction! - offsetLogicalWidth));
  }

  bricks = bricks.reverse();

  // Insert bricks until they exceed the logical width
  let brickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(brickCount++, bond.bricks.length)];
    const brickLogicalWidth = calculateCut(brick.definition, brick.width)!;

    if (totalLogicalWidth(bricks) + brickLogicalWidth > logicalWidth) {
      break;
    }

    bricks = bricks.push(brick);
  }

  // Fill up the remaining logical space with a partial brick
  const remainingLogicalWidth = logicalWidth - totalLogicalWidth(bricks);
  if (remainingLogicalWidth > 0) {
    const brick = bond.bricks[mod(brickCount++, bond.bricks.length)];

    bricks = bricks.push(cutBrick(brick.definition, remainingLogicalWidth));
  }

  return bricks;
}
