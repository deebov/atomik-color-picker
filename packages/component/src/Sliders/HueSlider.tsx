import React, { HTMLAttributes, memo, useRef } from "react";
import { useHue, ColorState } from "@atomik-color/core";
import styles from "./styles.module.css";
import commonStyles from "../common.module.css";

const HUE_MAX = 359;

const hueStyle = {
  background: `linear-gradient(${[
    "to left",
    "red 0",
    "#f09 10%",
    "#cd00ff 20%",
    "#3200ff 30%",
    "#06f 40%",
    "#00fffd 50%",
    "#0f6 60%",
    "#35ff00 70%",
    "#cdff00 80%",
    "#f90 90%",
    "red 100%",
  ].join(",")})`,
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  state: ColorState;
}

const HueSlider: React.FC<Props> = memo(
  ({ state, ...props }) => {
    // console.log("hue");

    const ref = useRef<HTMLDivElement>(null);
    const { sliderProps } = useHue({ ref, state });
    return (
      <div
        className={[styles.container, props.className || ""].join(" ")}
        {...props}
        {...sliderProps}
        style={{ ...hueStyle, ...props.style }}
        ref={ref}
      >
        <div
          className={[commonStyles.thumb, styles.thumb].join(" ")}
          style={{
            left: (100 * state.color.h) / HUE_MAX + "%",
            background: state.getSolidColor(),
          }}
        />
      </div>
    );
  }
  // (prev, next) => prev.state.color.h === next.state.color.h
);

export default HueSlider;
