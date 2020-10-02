import React, { useState } from "react";
import { str2Color } from "@atomik-color/core";
import ColorPicker from "../src";

export const ColorPickerDefault = () => <ColorPicker showPreview={true} />;

export const ColorPickerDefaultValue = () => (
  <ColorPicker showPreview={true} defaultValue={str2Color("#000")} />
);

export const ColorPickerControlled = () => {
  const [color, setColor] = useState(str2Color("#000"));

  return <ColorPicker showPreview={true} value={color} onChange={setColor} />;
};

export default { title: "ColorPicker" };
