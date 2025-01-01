import { describe, expect, test } from 'vitest';
import { measureSplit, splitBrick, WAAL } from './Bond';

describe('splitBrick', () => {
  test.each([
    [2, 210 * 2 + 10],
    [1.5, 210 + 10 + 100],
    [1.75, 210 + 10 + ((210 - 30) / 4) * 3 + 20],
    [1, 210],
    [0.75, ((210 - 30) / 4) * 3 + 20],
    [0.5, 100],
    [1 / 3, (210 - 20) / 3],
  ])('a %f brick has length %f', (coeff, expected) => {
    expect(splitBrick(WAAL, coeff)).toBe(expected);
  });
});

describe('measureSplit', () => {
  test.each([[210, 1]])('a %f brick is split %f', (width, result) => {
    expect(measureSplit(WAAL, width)).toBe(result);
  });
});
