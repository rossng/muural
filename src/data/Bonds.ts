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

export const STACK_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
  ],
});

export const ENGLISH_GARDEN_WALL_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [cutBrick(brick, 1 / 2)],
    },
    {
      offsetFraction: 1 / 4,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 3 / 4,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 1 / 4,
      bricks: [wholeBrick(brick)],
    },
  ],
});

export const SUSSEX_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick), wholeBrick(brick), wholeBrick(brick), cutBrick(brick, 1 / 2)],
    },
    {
      offsetFraction: 7 / 4,
      bricks: [wholeBrick(brick), wholeBrick(brick), wholeBrick(brick), cutBrick(brick, 1 / 2)],
    },
  ],
});

export const HEADER_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [cutBrick(brick, 1 / 2)],
    },
    {
      offsetFraction: 1 / 4,
      bricks: [cutBrick(brick, 1 / 2)],
    },
  ],
});

export const MONK_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick), wholeBrick(brick)],
    },
    {
      offsetFraction: 5 / 4,
      bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick), wholeBrick(brick)],
    },
  ],
});

export const ENGLISH_CROSS_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0.25,
      bricks: [cutBrick(brick, 1 / 2)],
    },
    {
      offsetFraction: 0.5,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0.25,
      bricks: [cutBrick(brick, 1 / 2)],
    },
  ],
});

export const FLEMISH_STRETCHER_BOND = (brick: BaseBrick): Bond => ({
  courses: [
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0.5,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 0,
      bricks: [wholeBrick(brick)],
    },
    {
      offsetFraction: 3 / 4,
      bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick)],
    },
  ],
});

export const FLEMISH_DIAGONAL_BOND = (brick: BaseBrick): Bond => {
  const flemish = (brick: BaseBrick) => [
    {
      offsetFraction: 1 / 4,
      bricks: [
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        wholeBrick(brick),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        wholeBrick(brick),
      ],
    },
    {
      offsetFraction: 2,
      bricks: [
        wholeBrick(brick),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
      ],
    },
    {
      offsetFraction: 3 / 4,
      bricks: [
        wholeBrick(brick),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
      ],
    },
    {
      offsetFraction: 1 / 2,
      bricks: [
        wholeBrick(brick),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        wholeBrick(brick),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
        cutBrick(brick, 1 / 2),
      ],
    },
  ];
  return {
    courses: [
      {
        offsetFraction: 1,
        bricks: [cutBrick(brick, 1 / 2), wholeBrick(brick), wholeBrick(brick)],
      },
      ...flemish(brick),
      {
        offsetFraction: 1 / 4,
        bricks: [wholeBrick(brick), wholeBrick(brick), cutBrick(brick, 1 / 2)],
      },
      ...flemish(brick).reverse(),
    ],
  };
};

export const BOND_TYPES = {
  ['Flemish']: FLEMISH_BOND,
  ['Stretcher']: STRETCHER_BOND,
  ['English']: ENGLISH_BOND,
  ['Stack']: STACK_BOND,
  ['English Garden Wall']: ENGLISH_GARDEN_WALL_BOND,
  ['Sussex/Flemish Garden Wall']: SUSSEX_BOND,
  ['Header']: HEADER_BOND,
  ['Monk']: MONK_BOND,
  ['English Cross/Dutch']: ENGLISH_CROSS_BOND,
  ['Flemish Stretcher']: FLEMISH_STRETCHER_BOND,
  ['Flemish Diagonal']: FLEMISH_DIAGONAL_BOND,
};

export type BondType = keyof typeof BOND_TYPES;
