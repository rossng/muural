import { Bond } from '../Bond';
import { BaseBrick, cutBrick, wholeBrick } from '../Brick';

export const STRETCHER_BOND = (brick: BaseBrick) => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0.5,
      bricks: [wholeBrick(brick)],
    },
  ],
});

export const FLEMISH_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick)],
    },
    {
      offsetFraction: 3 / 4,
      bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick)],
    },
  ],
});
