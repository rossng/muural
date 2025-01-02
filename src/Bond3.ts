import { BondCourse, BrickVariant, measureSplit, splitBrick } from './Bond';

import { List } from 'immutable';
import { Grid, mod } from './Bond2';

export function bricksLogicalWidth(bricks: List<BrickVariant>): number {
  return bricks
    .map((brick) => measureSplit(brick.definition, brick.width)!)
    .reduce((a, b) => a + b, 0);
}

export function makeFixedCourse(bond: BondCourse, logicalWidth: number): List<BrickVariant> {
  let bricks: List<BrickVariant> = List([]);

  // Insert whole bricks that make up the offset
  let offsetLogicalWidth = 0;
  let offsetBrickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(bond.bricks.length - ++offsetBrickCount, bond.bricks.length)];
    const brickLogicalWidth = measureSplit(brick.definition, brick.width)!;

    if (offsetLogicalWidth + brickLogicalWidth > (bond.offsetFraction ?? 0)) {
      break;
    }

    offsetLogicalWidth += brickLogicalWidth;
    bricks = bricks.push(brick);
  }

  // Insert a partial brick to fill the remaining offset
  if (offsetLogicalWidth < (bond.offsetFraction ?? 0)) {
    const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount, bond.bricks.length)];

    bricks = bricks.push({
      ...brick,
      width: splitBrick(brick.definition, bond.offsetFraction! - offsetLogicalWidth),
    });
  }

  bricks = bricks.reverse();

  // Insert bricks until they exceed the logical width
  let brickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(brickCount++, bond.bricks.length)];
    const brickLogicalWidth = measureSplit(brick.definition, brick.width)!;

    if (bricksLogicalWidth(bricks) + brickLogicalWidth > logicalWidth) {
      break;
    }

    bricks = bricks.push(brick);
  }

  // Fill up the remaining logical space with a partial brick
  const remainingLogicalWidth = logicalWidth - bricksLogicalWidth(bricks);
  if (remainingLogicalWidth > 0) {
    const brick = bond.bricks[mod(brickCount++, bond.bricks.length)];

    bricks = bricks.push({
      ...brick,
      width: splitBrick(brick.definition, remainingLogicalWidth),
    });
  }

  return bricks;
}

export function makeReferenceCourse(
  bond: BondCourse,
  width: number,
  grid: Grid,
): List<BrickVariant> {
  let bricks: List<BrickVariant> = List([]);

  // Insert whole bricks that make up the offset
  let offsetLogicalWidth = 0;
  let offsetBrickCount = 0;
  while (true) {
    const brick = bond.bricks[mod(bond.bricks.length - ++offsetBrickCount, bond.bricks.length)];
    const brickLogicalWidth = measureSplit(brick.definition, brick.width)!;

    if (offsetLogicalWidth + brickLogicalWidth > (bond.offsetFraction ?? 0)) {
      break;
    }

    offsetLogicalWidth += brickLogicalWidth;
    bricks = bricks.push(brick);
  }

  // Insert a partial brick to fill the remaining offset
  if (offsetLogicalWidth < (bond.offsetFraction ?? 0)) {
    const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount, bond.bricks.length)];

    bricks = bricks.push({
      ...brick,
      width: splitBrick(brick.definition, bond.offsetFraction! - offsetLogicalWidth),
    });
  }

  bricks = bricks.reverse();

  function minimumLength(bricks: List<BrickVariant>): number {
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

// export function makeCourse(bond: BondCourse, width: number, grid: Grid): List<BrickVariant> {
//   let bricks: List<BrickVariant> = List([]);
//   let length = 0;

//   while (true) {
//     const brick = bond.bricks[bricks.count() % bond.bricks.length];
//     const addition = bricks.count() === 0 ? brick.width : brick.width + grid.minHeadJointWidth;

//     if (length + addition > width) {
//       break;
//     }

//     length += addition;
//     bricks = bricks.push(brick);
//   }

//   if (bricks.count() === 0) {
//     return List([]);
//   }

//   // Iterate backwards through the brick types in the course to fill up the offset
//   let offsetBrickCount = 0;
//   let remainingLogicalOffset = bond.offsetFraction ?? 0;
//   while (true) {
//     const brick = bond.bricks[mod(bond.bricks.length - offsetBrickCount++, bond.bricks.length)];
//     const brickLogicalWidth = measureSplit(brick.definition, brick.width)!;

//     if (remainingLogicalOffset <= 0) {
//       break;
//     } else if (remainingLogicalOffset >= brickLogicalWidth) {
//       bricks.unshift(brick);
//       remainingLogicalOffset -= brickLogicalWidth;
//     } else if (remainingLogicalOffset < brickLogicalWidth) {
//       const brickWidth = measureSplit(brick.definition, remainingLogicalOffset)!;
//       bricks.unshift({
//         ...brick,
//         width: brickWidth,
//       });
//       remainingLogicalOffset -= brickWidth;
//     }

//     const total;
//   }

//   return bricks;
// }
