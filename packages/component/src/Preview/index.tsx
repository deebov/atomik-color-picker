import React, { HTMLAttributes } from "react";
import { useColorContext } from "../ColorPicker";
import commonStyles from "../common.module.css";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Preview: React.FC<Props> = ({  ...props }) => {
  const state = useColorContext();

  return (
    <div
      {...props}
      className={[commonStyles.transBackground, styles.preview, props.className || ''].join(' ')}
      style={{
        backgroundColor: state.color.str,
        ...props.style,
      }}
  />
  );
};

export default Preview;
