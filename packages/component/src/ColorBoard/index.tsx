import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import { ColorState, useColorBoard } from "@atomik-color/core";
import styles from "./styles.module.css";
import commonStyles from "../common.module.css";

const SV_MAX = 100;

const getPercentage = (num: number, percentage: number) => {
  return (num / 100) * percentage;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  state: ColorState;
}

const ColorBoard: React.FC<Props> = ({ state, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [boardWidth, setBoardWidth] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);

  useEffect(() => {
    const resizeListener = (event: UIEvent) => {
      if ((event.target as HTMLDivElement).offsetWidth !== boardWidth) {
        setBoardWidth((event.target as HTMLDivElement).offsetWidth);
      }
      if ((event.target as HTMLDivElement).offsetHeight !== boardHeight) {
        setBoardHeight((event.target as HTMLDivElement).offsetHeight);
      }
    };

    if (ref.current) {
      setBoardWidth(ref.current.offsetWidth);
      setBoardHeight(ref.current.offsetHeight);
      ref.current.addEventListener("resize", resizeListener);
    }

    return () => {
      ref.current?.removeEventListener("resize", resizeListener);
    };
  }, [ref.current]);

  const { containerProps, descriptionProps } = useColorBoard({
    state,
    ref,
  });

  const translateX = getPercentage(boardWidth, state.color.s);
  const translateY = getPercentage(boardHeight, SV_MAX - state.color.v);

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
          left: 0,
          top: 0,

          transform: `translate(calc(${translateX}px - 50%), calc(${translateY}px - 50%))`,

          backgroundColor: "#" + state.color.hex,
          ...props.style,
        }}
        className={commonStyles.thumb}
      />
      <div className={[commonStyles.overlay, styles.light].join(" ")} />
      <div className={[commonStyles.overlay, styles.dark].join(" ")} />
    </div>
  );
};

export default ColorBoard;
