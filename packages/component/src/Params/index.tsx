import React, { useState } from "react";
import { ColorState } from "@atomik-color/core";
import styles from "./styles.module.css";

const Field = ({ label, value, onChange, max = 255, type = "number" }: any) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        value={value}
        type={type}
        min={0}
        max={max}
        onChange={onChange}
      />
      <span style={{ fontSize: "12px", fontWeight: 500 }}>{label}</span>
    </label>
  );
};

interface Props {
  state: ColorState;
}

type Mode = "hex" | "rgba" | "hsva" | "hsl";

const modes: Mode[] = ["hex", "rgba", "hsva"];

const Params: React.FC<Props> = ({ state }) => {
  const onChangeR = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setR(parseFloat(e.target.value));
  };
  const onChangeG = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setG(parseFloat(e.target.value));
  };
  const onChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setB(parseFloat(e.target.value));
  };
  const onChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setA(parseFloat(e.target.value));
  };
  const onChangeH = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setH(parseFloat(e.target.value));
  };
  const onChangeS = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setS(parseFloat(e.target.value));
  };
  const onChangeV = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setV(parseFloat(e.target.value));
  };
  const onChangeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setHex(e.target.value);
  };
  const [mode, setMode] = useState<Mode>("hex");

  const toggleMode = () => {
    const index = modes.indexOf(mode);
    const newIndex = index === modes.length - 1 ? 0 : index + 1;

    setMode(modes[newIndex]);
  };

  return (
    <div style={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          marginRight: "10px",
          // maxWidth: "186px",
        }}
      >
        {mode === "rgba" && (
          <>
            <Field label="R" onChange={onChangeR} value={state.color.r} />
            <Field label="G" onChange={onChangeG} value={state.color.g} />
            <Field label="B" onChange={onChangeB} value={state.color.b} />
            <Field
              label="A"
              onChange={onChangeA}
              value={state.color.a}
              max={100}
            />
          </>
        )}
        {mode === "hsva" && (
          <>
            <Field label="H" onChange={onChangeH} value={state.color.h} />
            <Field label="S" onChange={onChangeS} value={state.color.s} />
            <Field label="V" onChange={onChangeV} value={state.color.v} />
            <Field
              label="A"
              onChange={onChangeA}
              value={state.color.a}
              max={100}
            />
          </>
        )}
        {mode === "hex" && (
          <Field
            type="text"
            label="Hex"
            onChange={onChangeHex}
            value={state.color.hex}
          />
        )}
      </div>
      <button
        aria-label="Change color mode"
        className={styles.select}
        style={{ marginLeft: "auto" }}
        onClick={toggleMode}
      >
        <svg width="12px" height="12px" viewBox="0 0 16 16" focusable="false">
          <path
            fill="currentColor"
            d="M11.891 9.992a1 1 0 1 1 1.416 1.415l-4.3 4.3a1 1 0 0 1-1.414 0l-4.3-4.3A1 1 0 0 1 4.71 9.992l3.59 3.591 3.591-3.591zm0-3.984L8.3 2.417 4.709 6.008a1 1 0 0 1-1.416-1.415l4.3-4.3a1 1 0 0 1 1.414 0l4.3 4.3a1 1 0 1 1-1.416 1.415z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Params;
