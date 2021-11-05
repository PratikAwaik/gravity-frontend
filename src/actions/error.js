export const setErrorAction = (error) => {
  return {
    type: "SET_ERROR",
    payload: error,
  };
};
