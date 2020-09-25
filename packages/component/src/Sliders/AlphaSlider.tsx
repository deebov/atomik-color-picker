import React, { HTMLAttributes, memo, useRef } from "react";
import { useAlpha, ColorPickerState } from "@atomik-color/core";
import styles from "./styles.module.css";
import commonStyles from "../common.module.css";

const ALPHA_MAX = 100;

const alphaStyle = {
  backgroundImage:
    "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)",
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  state: ColorPickerState;
}

const AlphaSlider: React.FC<Props> = memo(
  ({ state, ...props }) => {
    // console.log("alpha");

    const ref = useRef<HTMLDivElement>(null);
    const { sliderProps } = useAlpha({ ref, state });
    return (
      <div
        className={[styles.container, props.className || ""].join(" ")}
        {...props}
        {...sliderProps}
        style={{ ...alphaStyle, ...props.style }}
        ref={ref}
      >
        <div
          className={[commonStyles.overlay, styles.sliderOverlay].join(" ")}
          style={{
            backgroundImage: `linear-gradient(to right, transparent, #${state.color.hex})`,
          }}
        />
        <div
          className={[commonStyles.thumb, styles.thumb].join(" ")}
          style={{
            left: (100 * state.color.a) / ALPHA_MAX + "%",
            background: state.color.str,
          }}
        />
      </div>
    );
  }
  // (prev, next) => prev.state.color.a === next.state.color.a
);

export default AlphaSlider;
