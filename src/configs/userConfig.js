const userConfig = (userToken) => {
  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };
  return config;
};

export default userConfig;
