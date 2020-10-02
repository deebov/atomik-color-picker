import { HTMLAttributes, RefObject } from "react";
import { ALPHA_MAX } from "../color/constants";
import { ColorState } from "./useColorState";
import useSlider from "./useSlider";

type UseAlphaProps = {
  state: ColorState;
  ref: RefObject<HTMLElement>;
};

type UseAlpha = (
  props: UseAlphaProps
) => {
  sliderProps: HTMLAttributes<HTMLElement>;
};

const useAlpha: UseAlpha = ({ state, ref }) => {
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

export default useAlpha;
