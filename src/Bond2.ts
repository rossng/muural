import { List } from 'immutable';
import { BondCourse, Brick, BrickDefinition, BrickVariant, measureSplit, splitBrick } from './Bond';

export interface Grid {
  courseHeight: number;
  baseBrickDefinition: BrickDefinition;
  minHeadJointWidth: number;
  /** Sometimes circumstances result in very large head joints.
   * If custom-length bricks are allowed, we can choose one that delivers the minimum head joint width.
   */
  allowCustomBrick?: 'left' | 'right';
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function offsetCourse(
  bond: BondCourse,
  width: number,
  grid: Grid,
  bricks: List<BrickVariant>,
): List<BrickVariant> {
  if (bricks.count() === 0) {
    return bricks;
  }

  // First, move to the start any entire bricks (plus head joint) that fit inside the offset width
  let result = bricks;
  let logicalMovedWidth = 0;
  let movedCount = 0;
  while (true) {
    const insertBrick = bond.bricks[mod(bond.bricks.length - movedCount - 1, bond.bricks.length)];
    const brickLogicalWidth = measureSplit(insertBrick.definition, insertBrick.width)!;
    if (logicalMovedWidth + brickLogicalWidth > (bond.offsetFraction ?? 0)) {
      break;
    }

    logicalMovedWidth += brickLogicalWidth;
    result = result.unshift(insertBrick);
    result = result.pop();
    movedCount++;
  }

  const remainingLogicalOffset = (bond.offsetFraction ?? 0) - logicalMovedWidth;

  // Remaining offset is zero? We're done.
  if (remainingLogicalOffset <= 0) {
    return result;
  }

  // Next, we split the last brick into two pieces and fill up the remaining gap at the start
  // of the course. This creates an extra head joint in the course, which could push us below
  // the minimum head joint width. In this case, we call `offsetCourse` again with one less brick.
  if (splitBrick(grid.baseBrickDefinition, remainingLogicalOffset) < grid.minHeadJointWidth) {
    console.log('pop');
    return offsetCourse(bond, width, grid, bricks.pop());
  }

  // Otherwise, continue with splitting the last brick

  // If the remaining offset is a unit fraction of the brick width, we can snap to the nearest standard brick size
  const lastBrick = result.last()!;
  const logicalBrickLeft = splitBrick(lastBrick.definition, remainingLogicalOffset);
  const logicalBrickRight = splitBrick(lastBrick.definition, 1 - remainingLogicalOffset);

  return result.set(result.count() - 1, { ...lastBrick, width: logicalBrickRight }).unshift({
    ...lastBrick,
    width: logicalBrickLeft,
  });
}

export function makeCourse(bond: BondCourse, width: number, grid: Grid): List<BrickVariant> {
  let bricks: List<BrickVariant> = List([]);
  let length = 0;

  while (true) {
    const brick = bond.bricks[bricks.count() % bond.bricks.length];
    const addition = bricks.count() === 0 ? brick.width : brick.width + grid.minHeadJointWidth;

    if (length + addition > width) {
      break;
    }

    length += addition;
    bricks = bricks.push(brick);
  }

  if (bricks.count() === 0) {
    return List([]);
  }

  return offsetCourse(bond, width, grid, bricks);
}

export function courseToBricks(
  width: number,
  heightOffset: number,
  brickTypes: List<BrickVariant>,
): List<Brick> {
  const totalBrickWidth = brickTypes.reduce((acc, brick) => acc + brick.width, 0);
  const totalHeadJointWidth = width - totalBrickWidth;
  const headJointWidth = totalHeadJointWidth / (brickTypes.count() - 1);

  let bricks = List<Brick>([]);
  let offset = 0;
  for (let i = 0; i < brickTypes.count(); i++) {
    const brick = brickTypes.get(i)!;
    bricks = bricks.push({
      width: brick.width,
      height: brick.definition.height,
      x: offset,
      y: heightOffset,
    });
    offset += brick.width + headJointWidth;
  }
  return bricks;
}
