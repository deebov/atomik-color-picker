import { HSL, HSV, RGB, RGBA } from "../types";
import { clamp } from "../utils/clamp";
import { ALPHA_MAX } from "./constants";
import { isValidHex, normalizeHsv, normalizeRgb } from "./utils";

export const hsv2Rgb = (hsv: HSV) => {
  const { h, s, v } = normalizeHsv(hsv);
  let sat = s / 100;
  let value = v / 100;
  let C = sat * value;
  let H = h / 60;
  let X = C * (1 - Math.abs((H % 2) - 1));
  let m = value - C;
  let precision = 255;

  C = ((C + m) * precision) | 0;
  X = ((X + m) * precision) | 0;
  m = (m * precision) | 0;

  if (H >= 0 && H < 1) {
    return { r: C, g: X, b: m };
  }
  if (H >= 1 && H < 2) {
    return { r: X, g: C, b: m };
  }
  if (H >= 2 && H < 3) {
    return { r: m, g: C, b: X };
  }
  if (H >= 3 && H < 4) {
    return { r: m, g: X, b: C };
  }
  if (H >= 4 && H < 5) {
    return { r: X, g: m, b: C };
  }
  if (H >= 5 && H < 6) {
    return { r: C, g: m, b: X };
  }
  return { r: 0, g: 0, b: 0 };
};

export const hsv2Hex = ({ h, s, v }: HSV) => {
  let { r, g, b } = hsv2Rgb({ h, s, v });
  return rgb2Hex({ r, g, b });
};

export const rgb2Hsv = (rgb: RGB) => {
  const { r, g, b } = normalizeRgb(rgb);
  let red = r / 255;
  let green = g / 255;
  let blue = b / 255;

  let cmax = Math.max(red, green, blue);
  let cmin = Math.min(red, green, blue);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let v = 0;

  if (delta) {
    if (cmax === red) {
      h = (green - blue) / delta;
    }
    if (cmax === green) {
      h = 2 + (blue - red) / delta;
    }
    if (cmax === blue) {
      h = 4 + (red - green) / delta;
    }
    if (cmax) s = delta / cmax;
  }

  h = (60 * h) | 0;
  if (h < 0) h += 360;
  s = (s * 100) | 0;
  v = (cmax * 100) | 0;
  return { h, s, v };
};

export const rgb2Hsl = ({ r, g, b }: RGB) => {
  let red = r / 255;
  let green = g / 255;
  let blue = b / 255;

  let cmax = Math.max(red, green, blue);
  let cmin = Math.min(red, green, blue);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = (cmax + cmin) / 2;
  let X = 1 - Math.abs(2 * l - 1);

  if (delta) {
    if (cmax === red) {
      h = (green - blue) / delta;
    }
    if (cmax === green) {
      h = 2 + (blue - red) / delta;
    }
    if (cmax === blue) {
      h = 4 + (red - green) / delta;
    }
    if (cmax) s = delta / X;
  }

  h = (60 * h) | 0;
  if (h < 0) h += 360;
  s = (s * 100) | 0;
  l = (l * 100) | 0;
  return { h, s, l };
};

export const rgb2Hex = ({ r, g, b }: RGB, withHash: boolean = true) => {
  return (
    (withHash ? "#" : "") +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

export const rgba2RgbStr = ({ r, g, b, a }: RGBA) => {
  return typeof a === "number" && isNaN(a) === false
    ? `rgba(${r}, ${g}, ${b}, ${clamp(a, ALPHA_MAX, 0) / 100})`
    : `rgb(${r}, ${g}, ${b})`;
};

export const rgba2Str = (value: RGBA): string => {
  return value.a < ALPHA_MAX ? rgba2RgbStr(value) : rgb2Hex(value);
};

export const hsl2Rgb = ({ h, s, l }: HSL) => {
  let sat = s / 100;
  let light = l / 100;
  let C = sat * (1 - Math.abs(2 * light - 1));
  let H = h / 60;
  let X = C * (1 - Math.abs((H % 2) - 1));
  let m = light - C / 2;
  let precision = 255;

  C = ((C + m) * precision) | 0;
  X = ((X + m) * precision) | 0;
  m = (m * precision) | 0;
  if (H >= 0 && H < 1) {
    return { r: C, g: X, b: m };
  }
  if (H >= 1 && H < 2) {
    return { r: X, g: C, b: m };
  }
  if (H >= 2 && H < 3) {
    return { r: m, g: C, b: X };
  }
  if (H >= 3 && H < 4) {
    return { r: m, g: X, b: C };
  }
  if (H >= 4 && H < 5) {
    return { r: X, g: m, b: C };
  }
  if (H >= 5 && H < 6) {
    return { r: C, g: m, b: X };
  }
  return { r: 0, g: 0, b: 0 };
};

export const hex2Rgb = (hex: string, fallback: any = null) => {
  if (isValidHex(hex) !== true) return fallback;

  if (hex[0] === "#") hex = hex.slice(1, hex.length);

  if (hex.length === 3)
    hex = hex.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i, "$1$1$2$2$3$3");

  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  return {
    r,
    g,
    b,
  };
};

export const hex2Hsv = (hex: string) => {
  const rgb = hex2Rgb(hex) || { r: 0, g: 0, b: 0 };
  return rgb2Hsv(rgb);
};
