export type RGB = { r: number; g: number; b: number };
export type HSV = { h: number; s: number; v: number };
export type HSL = { h: number; s: number; l: number };

export type RGBA = RGB & { a: number };
export type HSVA = HSV & { a: number };

export type TColor = HSVA &
  RGBA & { hex: string; str: string; [others: string]: number | string };
