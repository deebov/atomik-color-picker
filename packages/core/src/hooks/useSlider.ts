import {
  HTMLAttributes,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Key from "../utils/keys";
import { clamp } from "../utils/clamp";
import { preventScroll } from "./preventScroll";

const calculateX = (
  e: PointerEvent,
  rectSize: DOMRect,
  max: number,
  min: number
) => {
  let x = (e.clientX - rectSize.left) / rectSize.width;
  x = clamp(Math.round(x * max), max, min);
  return x;
};

const calculateY = (
  e: PointerEvent,
  rectSize: DOMRect,
  max: number,
  min: number
) => {
  let y = (e.clientY - rectSize.top) / rectSize.height;
  y = clamp(Math.round(y * max), max, min);
  return y;
};

type Direction =
  | {
      direction?: "horizontal" | "vertical";
      onChange?: (value: number) => void;
    }
  | {
      direction?: "both";
      onChange?: ({ x, y }: { x: number; y: number }) => void;
    };

export type UseSliderProps = Direction & {
  ref: RefObject<HTMLElement>;
  maxValue?: number;
  minValue?: number;
  onStep?: (amount: number) => void;
  ariaLabel?: string;
  ariaValueNow?: number;
  ariaValueText?: string;
  step?: number;
  bigStep?: number;
};

type UseSlider = (props: UseSliderProps) => {
  sliderProps: HTMLAttributes<HTMLElement>;
};

const useSlider: UseSlider = ({
  ref,
  onStep,
  ariaLabel,
  ariaValueNow,
  ariaValueText,
  maxValue = 100,
  minValue = 0,
  step = 1,
  bigStep = 10,
  ...props
}) => {
  const restoreScrollRef = useRef<() => void>(() => {});

  // Restore scroll before unmounting
  useEffect(() => restoreScrollRef.current, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    // Allow users to tab out. Don't prevent default if Tab is pressed
    if (event.key !== Key.Tab) {
      event.preventDefault();
    }
    let amount: number = event.shiftKey ? bigStep : step;

    switch (event.key) {
      case Key.ArrowLeft:
      case Key.ArrowDown: {
        onStep?.(-amount);
        break;
      }
      case Key.ArrowRight:
      case Key.ArrowUp: {
        onStep?.(amount);
        break;
      }
      case Key.Home: {
        if (
          props.direction === "vertical" ||
          props.direction === "horizontal"
        ) {
          props.onChange?.(minValue);
        }
        break;
      }
      case Key.End: {
        if (
          props.direction === "vertical" ||
          props.direction === "horizontal"
        ) {
          props.onChange?.(maxValue);
        }
        break;
      }
      default: {
        return;
      }
    }
  };

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!ref.current || typeof props.onChange !== "function") {
        return;
      }
      event.preventDefault();
      const rectSize = ref.current.getBoundingClientRect();

      if (props.direction === "both") {
        let x = calculateX(event, rectSize, maxValue, minValue);
        let y = calculateY(event, rectSize, maxValue, minValue);
        return props.onChange({ x, y });
      }
      if (props.direction === "horizontal") {
        let x = calculateX(event, rectSize, maxValue, minValue);
        return props.onChange(x);
      }
      if (props.direction === "vertical") {
        let y = calculateY(event, rectSize, maxValue, minValue);
        return props.onChange(y);
      }
    },
    [props.direction, props.onChange]
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (!ref.current) {
        return;
      }
      event.preventDefault();
      restoreScrollRef.current = preventScroll();

      ref.current.focus();
      ref.current.onpointermove = onPointerMove;
      ref.current?.setPointerCapture(event.pointerId);

      onPointerMove(event as any);
    },
    [onPointerMove]
  );

  const onPointerUp = useCallback((event: React.PointerEvent) => {
    if (!ref.current) {
      return;
    }
    ref.current.onpointermove = null;
    ref.current.releasePointerCapture(event.pointerId);

    restoreScrollRef.current();
    restoreScrollRef.current = () => {};
  }, []);

  return {
    sliderProps: {
      tabIndex: 0,
      onPointerDown,
      onPointerUp,
      onKeyDown,
      onPointerCancel: onPointerUp,
      role: "slider",
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-label": ariaLabel,
      "aria-valuenow": ariaValueNow,
      "aria-valuetext": ariaValueText,
    },
  };
};

export default useSlider;
