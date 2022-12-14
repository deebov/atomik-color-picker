import React, { forwardRef } from "react";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";
import styles from "./index.module.css";

export { default as ColorPicker } from "./ColorPicker";
export type { ColorPickerProps } from "./ColorPicker";

interface Props extends Omit<ColorPickerProps, "children"> {
    showPreview?: boolean;
    showParams?: boolean;
}

const Picker = forwardRef<HTMLDivElement, Props>(({ showPreview = true, showParams = false, ...props }, ref) => {
    return (
        <ColorPicker {...props} className={styles.container}>
            <ColorPicker.Board />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                }}>
                <div style={{ flex: 1, gap: 10, display: "flex", flexDirection: "column" }}>
                    <ColorPicker.HueSlider />
                    <ColorPicker.AlphaSlider />
                </div>
                {showPreview && <ColorPicker.Preview />}
            </div>
            {showParams && <ColorPicker.Params />}
        </ColorPicker>
    );
});

export default Picker;
