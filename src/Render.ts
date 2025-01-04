import { List } from 'immutable';
import { CutBrick } from './Brick';

export interface DrawableBrick {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function courseToDrawable(
  width: number,
  heightOffset: number,
  brickTypes: List<CutBrick>,
): List<DrawableBrick> {
  const totalBrickWidth = brickTypes.reduce((acc, brick) => acc + brick.width, 0);
  const totalHeadJointWidth = width - totalBrickWidth;
  const headJointWidth = totalHeadJointWidth / (brickTypes.count() - 1);

  let bricks = List<DrawableBrick>([]);
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
