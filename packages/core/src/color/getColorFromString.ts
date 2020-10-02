import { RGBA, TColor } from "../types";
import { rgb2Hex, rgb2Hsv, rgba2Str } from "./converters";
import { cssColor } from "./cssColor";

const getColorFromRGBA = ({ r, g, b, a }: RGBA) => {
  const { h, s, v } = rgb2Hsv({ r, g, b });
  const hex = rgb2Hex({ r, g, b }, false);
  const str = rgba2Str({ r, g, b, a });
  return { r, g, b, a, h, s, v, hex, str };
};

/**
 * SOURCE https://github.com/microsoft/fluentui
 */

/**
 * Converts a CSS color string to a color object.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 *
 * `inputColor` will be used unmodified as the `str` property of the returned object.
 * Alpha defaults to 100 if not specified in `inputColor`.
 * Returns undefined if the color string is invalid/not recognized.
 */
export function getColorFromString(inputColor: string): TColor | undefined {
  const color = cssColor(inputColor);

  if (!color) {
    return;
  }

  return {
    ...getColorFromRGBA(color!),
    str: inputColor,
  };
}
