import { HTMLAttributes, RefObject } from "react";
import { HUE_MAX } from "../color/constants";
import { ColorPickerState } from "./useColorPickerState";
import useSlide from "./useSlide";

type UseHueProps = {
  state: ColorPickerState;
  ref: RefObject<HTMLElement>;
};

type UseHue = (
  props: UseHueProps
) => {
  sliderProps: HTMLAttributes<HTMLElement>;
};

const useHue: UseHue = ({ state, ref }) => {
  const { sliderProps } = useSlide({
    ref,
    direction: "horizontal",
    onChange: (x) => state.setH(x),
    onStep: (amount) => state.rotateH(amount),
    maxValue: HUE_MAX,
    ariaLabel: "Hue slider",
    ariaValueNow: state.color.h,
    ariaValueText: String(state.color.h),
  });
  return { sliderProps };
};

export default useHue;
