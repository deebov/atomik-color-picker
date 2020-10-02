# Atomik Color

Hooks (and component) for building accessible color picker for React. 0 dependecies, tiny ~3K, built-in powerful color conversions, touch and pen support, keyboard and screen-reader accessible, built using React hooks, fast!

## Installation

> This examples shows how to install and use the color picker component, not the hooks! If you want to build your own color picker using our hooks see this [example](https://codesandbox.io/s/atomik-color-hooks-k85hw?file=/src/Sliders/HueSlider.tsx)

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
import { str2Color } from "@atomik-color/core"

const [color, setColor] = useState(str2Color("#000"))

<ColorPicker value={color} onChange={setColor} />
```

## API

### ColorPicker

**Props**

```typescript
interface Props extends UseColorStateProps {
  showPreview?: boolean;
}
```

| Name            | Description                                     | Type                     | Default |
| --------------- | ----------------------------------------------- | ------------------------ | ------- |
| `value?`        | Present color value                             | `TColor`                 | -       |
| `defaultValue?` | Default color                                   | `TColor`                 | -       |
| `onChange?`     | Callback function for tracking the state change | `(value:TColor) => void` | -       |
| `showPreview?`  | If true, preview box will be shown              | `true`                   |

### useColorState

`useColorState(props: UseColorStateProps): UseColorState`

**Props**
|Name|Description| Type| Default |
|--|--|--|--|--|
|`value?` |Present color value | `TColor`| - |
|`defaultValue?` |Default color |`TColor`| - |
|`onChange?` |Callback function for tracking the state change | `(value:TColor) => void`| - |

### useColorRectangle

**Props**
|Name|Description| Type| Default |
|--|--|--|--|
|`state` |Color state | `ColorState`| - |
|`ref` |Ref of the element used as color rectangle |`RefObject<HTMLElement>`| - |
|`ariaLabel?` |Aria label | `string`| - |
|`ariaValueFormat?` |Formatted string used for `aria-valuetext` | `string`| - |
|`ariaDescription?` |Aria description | `string`| - |

### useHue

**Props**
|Name|Description| Type| Default |
|--|--|--|--|--|
|`state` |Color state | `ColorState`| - |
|`ref` |Ref of the element used as hue container |`RefObject<HTMLElement>`| - |

### useAlpha

**Props**
|Name|Description| Type| Default |
|--|--|--|--|--|
|`state` |Color state | `ColorState`| - |
|`ref` |Ref of the element used as alpha container |`RefObject<HTMLElement>`| - |
