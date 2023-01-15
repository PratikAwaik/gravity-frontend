import fromnow from "fromnow";

export const getHumanReadableDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getFromNow = (timeStamp: number) =>
  fromnow(timeStamp, { max: 1, suffix: true });
