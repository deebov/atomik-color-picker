import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  color: string;
}

const Preview: React.FC<Props> = ({ color, ...props }) => {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        display: "inline-block",
        backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)`,
      }}
    >
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px inset",
          backgroundColor: color,
          width: "40px",
          height: "40px",
        }}
      />
    </div>
  );
};

export default Preview;
