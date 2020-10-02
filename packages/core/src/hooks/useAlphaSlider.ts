import { HTMLAttributes, RefObject } from "react";
import { ALPHA_MAX } from "../color/constants";
import { ColorState } from "./useColorState";
import useSlider from "./useSlider";

type UseAlphaSliderProps = {
  state: ColorState;
  ref: RefObject<HTMLElement>;
};

type UseAlphaSlider = (
  props: UseAlphaSliderProps
) => {
  sliderProps: HTMLAttributes<HTMLElement>;
};

const useAlphaSlider: UseAlphaSlider = ({ state, ref }) => {
  const { sliderProps } = useSlider({
    ref,
    direction: "horizontal",
    onChange: (x) => state.setA(x),
    onStep: (amount) => state.rotateA(amount),
    maxValue: ALPHA_MAX,
    ariaLabel: "Alpha slider",
    ariaValueNow: state.color.a,
    ariaValueText: String(state.color.a),
  });
  return { sliderProps };
};

export default useAlphaSlider;
