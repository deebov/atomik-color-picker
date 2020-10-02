import React from "react";
import { ColorState } from "@atomik-color/core";

const Field = ({ label, value, onChange, max = 255, type = "number" }: any) => {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <input
        style={{ maxWidth: "100%" }}
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
  const onChangeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.setHex(e.target.value);
  };

  return (
    <div>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60px",
          marginBottom: 5,
        }}
      >
        <input
          style={{ maxWidth: "100%", boxSizing: "border-box" }}
          value={state.color.hex}
          type="text"
          onChange={onChangeHex}
        />
        <span style={{ fontSize: "12px", fontWeight: 500 }}>HEX</span>
      </label>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Field label="R" onChange={onChangeR} value={state.color.r} />
        <Field label="G" onChange={onChangeG} value={state.color.g} />
        <Field label="B" onChange={onChangeB} value={state.color.b} />
        <Field label="A" onChange={onChangeA} value={state.color.a} max={100} />
      </div>
    </div>
  );
};

export default Params;
