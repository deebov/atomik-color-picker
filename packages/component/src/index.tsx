import React, { forwardRef } from "react";
import ColorRectangle from "./ColorRectangle";
import HueSlider from "./Sliders/HueSlider";
import AlphaSlider from "./Sliders/AlphaSlider";
import { useColorState, UseColorProps } from "@atomik-color/core";

// const ColorPicker = () => {

//   const state = useColorState()

//   return <div>

//   </div>
// }

// const ColorBoard = ({state}) => {
//   const ref = useRef()
//   const { containerProps, descriptionProps } = useColorRectangle({
//     state,
//     ref,
//   });
//   return <div {...containerProps}>
//     <div {...descriptionProps}/>
//     <div className="your-styles-for-thumb" />

//     <div className="your-styles-for-dark-shade" />
//     <div className="your-styles-for-light-shade" />
//   </div>
// }

const ColorPicker = forwardRef<HTMLDivElement, UseColorProps>((props, ref) => {
  const state = useColorState(props);
  // const onChangeR = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   state.setR(parseFloat(e.target.value));
  // };
  // const onChangeG = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   state.setG(parseFloat(e.target.value));
  // };
  // const onChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   state.setB(parseFloat(e.target.value));
  // };
  // const onChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   state.setA(parseFloat(e.target.value));
  // };
  // const onChangeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   state.setHex(e.target.value);
  // };

  return (
    <div role="group" ref={ref} style={{ maxWidth: "220px" }}>
      <ColorRectangle style={{ marginBottom: "10px" }} state={state} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <HueSlider style={{ marginBottom: "10px" }} state={state} />
          <AlphaSlider state={state} />
        </div>
        <div
          style={{
            display: "inline-block",
            backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)`,
          }}
        >
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 0px 0.6px inset",
              backgroundColor: state.color.str,
              width: "40px",
              height: "40px",
            }}
          />
        </div>
      </div>
      {/* <div>
          <input
            value={state.color.hex}
            type="text"
            pattern="[a-f0-9]"
            maxLength={6}
            onChange={onChangeHex}
          />
          <input
            value={state.color.r}
            type="number"
            min={0}
            max={255}
            onChange={onChangeR}
          />
          <input
            value={state.color.g}
            type="number"
            min={0}
            max={255}
            onChange={onChangeG}
          />
          <input
            value={state.color.b}
            type="number"
            min={0}
            max={255}
            onChange={onChangeB}
          />
          <input
            value={state.color.a}
            type="number"
            min={0}
            max={100}
            onChange={onChangeA}
          />
        </div> */}
    </div>
  );
});

export default ColorPicker;
