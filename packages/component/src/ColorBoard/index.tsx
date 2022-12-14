import React, { HTMLAttributes, useRef } from "react";
import { useColorBoard } from "@atomik-color/core";
import styles from "./styles.module.css";
import commonStyles from "../common.module.css";
import { useColorContext } from "../ColorPicker";

const SV_MAX = 100;

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ColorBoard: React.FC<Props> = ({ ...props }) => {
  const state = useColorContext();

  const ref = useRef<HTMLDivElement>(null);
  const { containerProps, descriptionProps } = useColorBoard({
    state,
    ref,
  });

  return (
    <div
      className={[styles.container, props.className || ""].join(" ")}
      {...props}
      {...containerProps}
      style={{ background: state.getSolidColor(), ...props.style }}
      ref={ref}
    >
      <div className={commonStyles.vHidden} {...descriptionProps} />
      <div
        style={{
          left: state.color.s + "%",
          top: SV_MAX - state.color.v + "%",
          backgroundColor: "#" + state.color.hex,
        }}
        className={commonStyles.thumb}
      />
      <div className={[commonStyles.overlay, styles.light].join(" ")} />
      <div className={[commonStyles.overlay, styles.dark].join(" ")} />
    </div>
  );
};

export default ColorBoard;
