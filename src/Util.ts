import { Color } from '@chakra-ui/react';

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function asSimpleFraction(n: number): [number, number] | undefined {
  for (let numerator = 1; numerator < 10; numerator++) {
    for (let denominator = 1; denominator < 10; denominator++) {
      if (Math.abs(numerator / denominator - n) < 1e-6) {
        return [numerator, denominator];
      }
    }
  }
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

const seedgen = () => (Math.random() * 2 ** 32) >>> 0;
const seed = seedgen();
export const makeRandomSequence = () => sfc32(seed, seed + 1, seed + 2, seed + 3);

export function offsetColorRandomly(color: Color, rand: () => number): Color {
  const r = rand();

  const hsla = color.toFormat('hsla');

  return hsla.withChannelValue('lightness', hsla.getChannelValue('lightness') + (r - 0.5) * 5);
}

export const darkenByBrickSize = (color: Color, width: number, baseBrickWidth: number): Color => {
  const fraction = width / baseBrickWidth;
  const hsla = color.toFormat('hsla');
  return hsla.withChannelValue(
    'lightness',
    hsla.getChannelValue('lightness') - (1 - fraction) * 20,
  );
};
