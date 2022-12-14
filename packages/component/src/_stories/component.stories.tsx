import React, { useState } from "react";
import ColorPicker from "..";

export const ColorPickerDefault = () => <ColorPicker showPreview={true} />;
export const ColorPickerParams = () => <ColorPicker showPreview={true} showParams />;

export const ColorPickerDefaultValue = () => <ColorPicker showPreview={true} defaultValue={"#f00"} />;

export const ColorPickerDefaultRGB = () => <ColorPicker showPreview={true} defaultValue={{ r: 255, g: 100, b: 50 }} />;

export const ColorPickerControlled = () => {
    const [color, setColor] = useState("#00f");

    return <ColorPicker showPreview={true} value={color} onChange={(color) => setColor(color.string)} />;
};

export default { title: "ColorPicker" };
