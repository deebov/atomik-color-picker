import { HTMLAttributes, RefObject } from "react";
import { HUE_MAX } from "../color/constants";
import { ColorState } from "./useColorState";
import useSlider from "./useSlider";

type UseHueProps = {
  state: ColorState;
  ref: RefObject<HTMLElement>;
};

type UseHue = (
  props: UseHueProps
) => {
  sliderProps: HTMLAttributes<HTMLElement>;
};

const useHue: UseHue = ({ state, ref }) => {
  const { sliderProps } = useSlider({
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
