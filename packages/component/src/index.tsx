import React, { forwardRef } from "react";
import ColorRectangle from "./ColorRectangle";
import HueSlider from "./Sliders/HueSlider";
import AlphaSlider from "./Sliders/AlphaSlider";
import { useColorState, UseColorProps } from "@atomik-color/core";
import Preview from "./Preview";

interface Props extends UseColorProps {
  showPreview?: boolean;
}

const ColorPicker = forwardRef<HTMLDivElement, Props>(
  ({ showPreview = true, ...props }, ref) => {
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
          <div style={{ flex: 1 }}>
            <HueSlider style={{ marginBottom: "10px" }} state={state} />
            <AlphaSlider state={state} />
          </div>
          {showPreview && <div style={{ width: "10px" }} />}
          {showPreview && <Preview color={state.color.str} />}
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
  }
);

export default ColorPicker;
