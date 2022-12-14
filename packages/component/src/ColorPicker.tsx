import { ColorState, hsv2Hex, rgb2Hex, str2Color, useColorState } from "@atomik-color/core";
import { HSV, HSVA, RGB, RGBA, TColor } from "@atomik-color/core/dist/types";
import React, { forwardRef, useContext } from "react";
import ColorBoard from "./ColorBoard";
import Params from "./Params";
import Preview from "./Preview";
import AlphaSlider from "./Sliders/AlphaSlider";
import HueSlider from "./Sliders/HueSlider";

const ColorContext = React.createContext<ColorState>({} as ColorState);

type ColorProp = string | RGB | RGBA | HSV | HSVA;

export const useColorContext = () => useContext(ColorContext);

export interface ColorPickerProps {
    children: React.ReactNode;
    className?: string;

    value?: ColorProp;
    defaultValue?: ColorProp;
    onChange?: (color: { rgb: RGB; hsv: HSV; alpha: number; string: string }) => void;
}

interface ColorPickerCompenent extends React.ForwardRefExoticComponent<ColorPickerProps> {
    Board: typeof ColorBoard;
    HueSlider: typeof HueSlider;
    AlphaSlider: typeof AlphaSlider;
    Preview: typeof Preview;
    Params: typeof Params;
}

const isRBG = (value: any): value is RGB => typeof value === "object" && "r" in value && "g" in value && "b" in value;

const isHSV = (value: any): value is HSV => typeof value === "object" && "h" in value && "s" in value && "v" in value;

const getColorFromProp = (value?: ColorProp): TColor | undefined =>
    typeof value === "string"
        ? str2Color(value)
        : isRBG(value)
        ? str2Color(rgb2Hex(value))
        : isHSV(value)
        ? str2Color(hsv2Hex(value))
        : undefined;

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(({ defaultValue, onChange, value, ...props }, ref) => {
    const state = useColorState({
        defaultValue: getColorFromProp(defaultValue),
        value: getColorFromProp(value),
        onChange: (color) =>
            onChange?.({
                rgb: { r: color.r, g: color.g, b: color.b },
                hsv: { h: color.h, s: color.s, v: color.v },
                alpha: color.a,
                string: color.str,
            }),
    });

    return (
        <ColorContext.Provider value={state}>
            <div role="group" ref={ref} {...props}>
                {props.children}
            </div>
        </ColorContext.Provider>
    );
});

(ColorPicker as ColorPickerCompenent).Board = ColorBoard;
(ColorPicker as ColorPickerCompenent).HueSlider = HueSlider;
(ColorPicker as ColorPickerCompenent).AlphaSlider = AlphaSlider;
(ColorPicker as ColorPickerCompenent).Preview = Preview;
(ColorPicker as ColorPickerCompenent).Params = Params;

export default ColorPicker as ColorPickerCompenent;
