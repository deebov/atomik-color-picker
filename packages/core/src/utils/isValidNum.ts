export const isValidNum = (value: any) =>
  typeof value === "number" && isNaN(value) === false;
