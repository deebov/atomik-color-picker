import React, { HTMLAttributes, RefObject, useRef } from "react";
import { ColorState } from "./useColorState";
import Key from "../utils/keys";
import { SV_MAX } from "../color/constants";
import useSlider from "./useSlider";

type UseColorRectangleProps = {
  state: ColorState;
  ref: RefObject<HTMLElement>;
  ariaLabel?: string;
  ariaValueFormat?: string;
  ariaDescription?: string;
};

type UseColorRectangle = (
  props: UseColorRectangleProps
) => {
  containerProps: HTMLAttributes<HTMLElement>;
  descriptionProps: HTMLAttributes<HTMLElement>;
};

const ariaStrings = {
  ariaLabel: "Saturation and brightness",
  ariaValueFormat: "Saturation {0} brightness {1}",
  ariaDescription:
    "Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.",
};

const descriptionId = "color-picker-desc";

const useColorRectangle: UseColorRectangle = ({
  state,
  ref,
  ariaDescription = ariaStrings.ariaDescription,
  ariaLabel = ariaStrings.ariaLabel,
  ariaValueFormat = ariaStrings.ariaValueFormat,
}) => {
  const isAdjustingSaturation = useRef(false);
  const color = state.color;

  const valueText = ariaValueFormat
    .replace("{0}", String(color.s))
    .replace("{1}", String(color.v));

  const { sliderProps } = useSlider({
    ref,
    maxValue: SV_MAX,
    direction: "both",
    ariaLabel,
    ariaValueText: valueText,
    ariaValueNow: isAdjustingSaturation.current ? color.s : color.v,
    onChange({ x: s, y: v }) {
      v = SV_MAX - v;
      state.setSV(s, v);
    },
  });

  const onKeyDown = (event: React.KeyboardEvent) => {
    // Allow users to tab out. Don't prevent default if Tab is pressed
    if (event.key !== Key.Tab) {
      event.preventDefault();
    }

    const increment = event.shiftKey ? 10 : 1;

    switch (event.key) {
      case Key.ArrowUp:
        isAdjustingSaturation.current = false;
        state.rotateV(increment);
        break;
      case Key.ArrowDown:
        isAdjustingSaturation.current = false;
        state.rotateV(-increment);
        break;
      case Key.ArrowLeft:
        isAdjustingSaturation.current = true;
        state.rotateS(-increment);
        break;
      case Key.ArrowRight:
        isAdjustingSaturation.current = true;
        state.rotateS(increment);
        break;
      case Key.Home:
        isAdjustingSaturation.current = true;
        state.setS(0);
        break;
      case Key.End:
        isAdjustingSaturation.current = true;
        state.setS(SV_MAX);
        break;
      case Key.PageUp:
        isAdjustingSaturation.current = false;
        state.setV(SV_MAX);
        break;
      case Key.PageDown:
        isAdjustingSaturation.current = false;
        state.setV(0);
        break;
    }
  };

  return {
    containerProps: {
      ...sliderProps,
      onKeyDown,
      "aria-describedby": descriptionId,
      id: "color-rectangle1",
    },
    descriptionProps: {
      id: descriptionId,
      children: ariaDescription,
    },
  };
};

export default useColorRectangle;
