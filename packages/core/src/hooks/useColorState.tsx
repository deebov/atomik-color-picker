import { useEffect, useState } from "react";
import { clamp } from "../utils/clamp";
import {
  hex2Rgb,
  hsv2Hex,
  hsv2Rgb,
  rgb2Hex,
  rgb2Hsv,
  rgba2Str,
} from "../color/converters";
import { ALPHA_MAX, HUE_MAX, SV_MAX } from "../color/constants";
import { RGB, RGBA, TColor } from "../types";
import {
  isValidAlpha,
  isValidColorValue,
  isValidHex,
  isValidRGBValue,
} from "../color/utils";

export type UseColorProps = {
  defaultValue?: TColor;
  value?: TColor;
  onChange?: (value: TColor) => void;
};

export type UseColorState = (props: UseColorProps) => ColorState;

export type ColorState = {
  color: TColor;
  setS: (s: number) => void;
  setV: (v: number) => void;
  setA: (a: number) => void;
  setH: (h: number) => void;
  setR: (r: number) => void;
  setG: (g: number) => void;
  setB: (b: number) => void;
  setSV: (s: number, v: number) => void;
  setHex: (hex: string) => void;
  toString: () => string;
  getSolidColor: () => string;
  rotateH: (amount: number) => void;
  rotateS: (amount: number) => void;
  rotateV: (amount: number) => void;
  rotateA: (amount: number) => void;
};

const initalColor = {
  h: 0,
  s: 50,
  v: 50,
  a: 100,
  r: 128,
  g: 64,
  b: 64,
  hex: "804040",
  str: "#804040",
};

const setRGBValue = (
  setValue: React.Dispatch<React.SetStateAction<TColor>>,
  channel: "r" | "g" | "b",
  value: number
) => {
  if (!isValidRGBValue(value)) return;
  setValue((prev) => {
    const { r, g, b, a }: TColor = { ...prev, [channel]: value };
    const { h, s, v } = rgb2Hsv({ r, g, b });
    const hex = rgb2Hex({ r, g, b }, false);
    const str = rgba2Str({ r, g, b, a });
    return { r, g, b, a, h, s, v, hex, str };
  });
};

const setHSVValue = (
  setValue: React.Dispatch<React.SetStateAction<TColor>>,
  channel: "h" | "s" | "v",
  value: number,
  max: number = SV_MAX
) => {
  if (!isValidColorValue(value, max)) {
    return;
  }
  setValue((prev) => {
    const { h, s, v, a }: TColor = { ...prev, [channel]: value };
    const { r, g, b } = hsv2Rgb({ h, s, v });
    const hex = rgb2Hex({ r, g, b }, false);
    const str = rgba2Str({ r, g, b, a });
    return { h, s, v, r, g, b, a, hex, str };
  });
};

const rotateHSVValue = (
  setValue: React.Dispatch<React.SetStateAction<TColor>>,
  channel: "h" | "s" | "v",
  amount: number,
  max: number = SV_MAX
) => {
  setValue((prev) => {
    const { h, s, v, a }: TColor = {
      ...prev,
      [channel]: clamp(prev[channel] + amount, max, 0),
    };
    const { r, g, b } = hsv2Rgb({ h, s, v });
    const hex = rgb2Hex({ r, g, b }, false);
    const str = rgba2Str({ r, g, b, a });
    return { h, s, v, r, g, b, a, hex, str };
  });
};

const useColorState: UseColorState = (props) => {
  const [color, setColorState] = useState<TColor>(
    props.defaultValue || initalColor
  );

  useEffect(() => {
    if (props.value) {
      setColorState(props.value);
    }
  }, [JSON.stringify(props.value)]);

  const setValue: typeof setColorState = (value) => {
    if (typeof props.onChange === "function") {
      if (typeof props.value !== "undefined") {
        props.onChange(typeof value === "function" ? value(color) : value);
        // if value is provided then it's controlled
        // so stop excuting and don't update the internal state
        return;
      }
      props.onChange(typeof value === "function" ? value(color) : value);
    }

    setColorState(value);
  };

  const setH = (h: number) => setHSVValue(setValue, "h", h, HUE_MAX);

  const setS = (s: number) => setHSVValue(setValue, "s", s);

  const setV = (v: number) => setHSVValue(setValue, "v", v);

  const setSV = (s: number, v: number) => {
    if (!isValidColorValue(s, SV_MAX) && !isValidColorValue(v, SV_MAX)) {
      return;
    }
    setValue((prev) => {
      const { h, a } = prev;
      const { r, g, b } = hsv2Rgb({ h, s, v });
      const hex = rgb2Hex({ r, g, b }, false);
      const str = rgba2Str({ r, g, b, a });
      return { h, s, v, r, g, b, a, hex, str };
    });
  };

  const setR = (r: number) => setRGBValue(setValue, "r", r);

  const setG = (g: number) => setRGBValue(setValue, "g", g);

  const setB = (b: number) => setRGBValue(setValue, "b", b);

  const setA = (a: number) => {
    if (!isValidAlpha(a)) return;
    setValue((prev) => {
      const updated = { ...prev, a };
      updated.str = rgba2Str(updated);
      return updated;
    });
  };

  const setHex = (
    hex: string,
    fallback: RGB = { r: color.r, g: color.g, b: color.b }
  ) => {
    // if (!isValidHex(hex)) return;
    setValue(({ a }) => {
      const { r, g, b } = hex2Rgb(hex, fallback);
      const { h, s, v } = rgb2Hsv({ r, g, b });
      const str = rgba2Str({ r, g, b, a });
      return { r, g, b, h, s, v, hex, a, str };
    });
  };

  const rotateH = (amount: number) =>
    rotateHSVValue(setValue, "h", amount, HUE_MAX);

  const rotateS = (amount: number) => rotateHSVValue(setValue, "s", amount);

  const rotateV = (amount: number) => rotateHSVValue(setValue, "v", amount);

  const rotateA = (amount: number) => {
    setValue((prev) => ({
      ...prev,
      a: clamp(prev.a + amount, ALPHA_MAX, 0),
    }));
  };

  return {
    setH,
    setS,
    setV,
    setR,
    setG,
    setB,
    setA,
    setSV,
    setHex,

    rotateH,
    rotateS,
    rotateV,
    rotateA,

    color,

    getSolidColor: () => hsv2Hex({ h: color.h, s: SV_MAX, v: SV_MAX }),
  };
};

export default useColorState;
