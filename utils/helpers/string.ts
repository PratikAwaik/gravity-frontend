// used to combine strings for classNames or any other uses
export const combineStrings = (...strings: (string | false | undefined)[]) => {
  return strings.filter((s) => s).join(" ");
};
