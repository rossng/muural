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

export const ENGLISH_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0.25,
      bricks: [cutBrick(brick, 1 / 2)],
    },
  ],
});

export const BOND_TYPES = {
  ['Flemish']: FLEMISH_BOND,
  ['Stretcher']: STRETCHER_BOND,
  ['English']: ENGLISH_BOND,
};

export type BondType = keyof typeof BOND_TYPES;
