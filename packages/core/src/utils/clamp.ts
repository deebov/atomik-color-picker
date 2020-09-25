export function clamp(value: number = 0, max: number, min = 0): number {
  return value < min ? min : value > max ? max : value;
}
