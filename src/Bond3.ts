import { BondCourse, BrickVariant, measureSplit } from './Bond';

import { List } from 'immutable';
import { Grid, mod } from './Bond2';

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

  // Iterate backwards through the brick types in the course to fill up the offset
  let offsetBrickCount = 0;
  let remainingLogicalOffset = bond.offsetFraction ?? 0;
  while (true) {
    const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount++, bond.bricks.length)];
    const brickLogicalWidth = measureSplit(brick.definition, brick.width)!;

    if (remainingLogicalOffset <= 0) {
      break;
    } else if (remainingLogicalOffset >= brickLogicalWidth) {
      bricks.unshift(brick);
      remainingLogicalOffset -= brickLogicalWidth;
    } else if (remainingLogicalOffset < brickLogicalWidth) {
      const brickWidth = measureSplit(brick.definition, remainingLogicalOffset)!;
      bricks.unshift({
        ...brick,
        width: brickWidth,
      });
      remainingLogicalOffset -= brickWidth;
    }

    const total;
  }

  return bricks;
}
