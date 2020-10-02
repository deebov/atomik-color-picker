import React, { forwardRef } from "react";
import ColorRectangle from "./ColorRectangle";
import HueSlider from "./Sliders/HueSlider";
import AlphaSlider from "./Sliders/AlphaSlider";
import { useColorState, UseColorProps } from "@atomik-color/core";
import Preview from "./Preview";
import styles from "./index.module.css";
import Params from "./Params";

interface Props extends UseColorProps {
  showPreview?: boolean;
}

const ColorPicker = forwardRef<HTMLDivElement, Props>(
  ({ showPreview = true, ...props }, ref) => {
    const state = useColorState(props);

    return (
      <div
        className={styles.container}
        role="group"
        ref={ref}
        style={{ maxWidth: "220px" }}
      >
        <ColorRectangle style={{ marginBottom: "10px" }} state={state} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <HueSlider style={{ marginBottom: "10px" }} state={state} />
            <AlphaSlider state={state} />
          </div>
          {showPreview && <div style={{ width: "10px" }} />}
          {showPreview && <Preview color={state.color.str} />}
        </div>
      </div>
    );
  }
);

export default ColorPicker;
