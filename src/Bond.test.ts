import { describe, expect, test } from 'vitest';
import { calculateCut, cutBrick } from './Brick';
import { WAAL } from './data/Bricks';

describe('cutBrick', () => {
  test.each([
    [2, 210 * 2 + 10],
    [1.5, 210 + 10 + 100],
    [1.75, 210 + 10 + ((210 - 30) / 4) * 3 + 20],
    [1, 210],
    [0.75, ((210 - 30) / 4) * 3 + 20],
    [0.5, 100],
    [1 / 3, (210 - 20) / 3],
  ])('a %f brick has length %f', (coeff, expected) => {
    expect(cutBrick(WAAL, coeff).width).toBe(expected);
  });
});

describe('calculateCut', () => {
  test.each([[210, 1]])('a %f brick is split %f', (width, result) => {
    expect(calculateCut(WAAL, width)).toBe(result);
  });
});
