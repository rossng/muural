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
