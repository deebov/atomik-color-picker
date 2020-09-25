import { HSV, RGB } from "../types";
import { clamp } from "../utils/clamp";
import { isValidNum } from "../utils/isValidNum";
import { ALPHA_MAX, HUE_MAX, RGB_MAX, SV_MAX } from "./constants";

export const normalizeHsv = ({ h, s, v }: HSV): HSV => ({
  h: clamp(h, HUE_MAX, 0),
  s: clamp(s, SV_MAX, 0),
  v: clamp(v, SV_MAX, 0),
});

export const normalizeRgb = ({ r, g, b }: RGB): RGB => ({
  r: clamp(r, RGB_MAX, 0),
  g: clamp(g, RGB_MAX, 0),
  b: clamp(b, RGB_MAX, 0),
});

export const isValidColorValue = (value: any, max: number, min: number = 0) => {
  return isValidNum(value) && value >= min && value <= max;
};

export const isValidRGBValue = (value: any) =>
  isValidColorValue(value, RGB_MAX);

export const isValidAlpha = (value: any) => isValidColorValue(value, ALPHA_MAX);

export const isValidHex = (hex: any) =>
  /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)/i.test(hex);
