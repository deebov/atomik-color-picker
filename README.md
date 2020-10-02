# Atomik Color

Hooks (and component) for building accessible color picker for React. 0 dependecies, tiny ~3K, built-in powerful color conversions, touch and pen support, keyboard and screen-reader accessible, built using React hooks, fast!

![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label) ![gzip size](https://badgen.net/badgesize/gzip/https/unpkg.com/@atomik-color/core/dist/index.js)

[Demo](https://codesandbox.io/s/atomik-colorcomponent-j3pyf)

## Installation

> This examples shows how to install and use the color picker component, not the hooks! If you want to build your own color picker using our hooks see this [example](https://codesandbox.io/s/atomik-color-hooks-k85hw)

```bash
yarn add @atomik-color/component
```

## Usage

```jsx
import ColorPicker from  "@atomik-color/component"

<ColorPicker />

// Default value
import { str2Color } from "@atomik-color/core"

<ColorPicker defaultValue={str2Color("#000")} />

// Controlled
import { useState } from  "react";

const [color, setColor] = useState()

<ColorPicker value={color} onChange={setColor} />
```

## Supported colors

The color value is converted to multiple formats automatically, so you don't have to deal with color conversion 😄. Available color formats are `rgb`, `hsv`, `hex`, `alpha` and string value (`hsl` coming soon). You can access them via `state.color`.

## API

### ColorPicker

**Props**

| Name            | Description                                     | Type                     | Default |
| --------------- | ----------------------------------------------- | ------------------------ | ------- |
| `value?`        | Present color value                             | `TColor`                 | -       |
| `defaultValue?` | Default color                                   | `TColor`                 | -       |
| `onChange?`     | Callback function for tracking the state change | `(value:TColor) => void` | -       |
| `showPreview?`  | If true, preview box will be shown              | `true`                   |

### useColorState

`useColorState(props: UseColorStateProps): UseColorState`

**Props**

| Name            | Description                                     | Type                     | Default |
| --------------- | ----------------------------------------------- | ------------------------ | ------- |
| `value?`        | Present color value                             | `TColor`                 | -       |
| `defaultValue?` | Default color                                   | `TColor`                 | -       |
| `onChange?`     | Callback function for tracking the state change | `(value:TColor) => void` | -       |

**Returns**

`UseColorState`

| Name                        | Description                            | Type     |
| --------------------------- | -------------------------------------- | -------- |
| `color`                     | Color value                            | `TColor` |
| `setH(value:number)`        | sets Hue (0-359)                       |
| `setS(value:number)`        | sets Saturation (0-100)                |
| `setV(value:number)`        | sets Value (Brightness)                |
| `setSV(s:number, v:number)` | sets Saturation and Value              |
| `setR(value:number)`        | sets Red (0-255)                       |
| `setG(value:number)`        | sets Green (0-255)                     |
| `setB(value:number)`        | sets Blue (0-255)                      |
| `setA(value:number)`        | sets Alpha (0-100)                     |
| `rotateH(amount:number)`    | rotates Hue by `amount`                |
| `rotateS(amount:number)`    | rotates Saturation by `amount`         |
| `rotateV(amount:number)`    | rotates Value (Brightness) by `amount` |
| `rotateA(amount:number)`    | rotates Alpha by `amount`              |

**`TColor`**

Color object that's used across the package.

| Name  | Description                                                                   | Type     |
| ----- | ----------------------------------------------------------------------------- | -------- |
| `r`   | Red                                                                           | `number` |
| `g`   | Green                                                                         | `number` |
| `b`   | Blue                                                                          | `number` |
| `a`   | Alpha (0-100)                                                                 | `number` |
| `h`   | hue                                                                           | `number` |
| `s`   | Saturation                                                                    | `number` |
| `v`   | Value (Brightness)                                                            | `number` |
| `hex` | hex value without `#` prefix                                                  | `string` |
| `str` | if alpha is full then returns hex value with `#` prefix otherwise rgba string | `string` |

### useColorBoard

**Props**

| Name               | Description                                | Type                     | Default |
| ------------------ | ------------------------------------------ | ------------------------ | ------- |
| `state`            | Color state                                | `ColorState`             | -       |
| `ref`              | Ref of the element used as color rectangle | `RefObject<HTMLElement>` | -       |
| `ariaLabel?`       | Aria label                                 | `string`                 | -       |
| `ariaValueFormat?` | Formatted string used for `aria-valuetext` | `string`                 | -       |
| `ariaDescription?` | Aria description                           | `string`                 | -       |

### useHueSlider

**Props**

| Name    | Description                              | Type                     | Default |
| ------- | ---------------------------------------- | ------------------------ | ------- |
| `state` | Color state                              | `ColorState`             | -       |
| `ref`   | Ref of the element used as hue container | `RefObject<HTMLElement>` | -       |

### useAlphaSlider

**Props**

| Name    | Description                                | Type                     | Default |
| ------- | ------------------------------------------ | ------------------------ | ------- |
| `state` | Color state                                | `ColorState`             | -       |
| `ref`   | Ref of the element used as alpha container | `RefObject<HTMLElement>` | -       |
