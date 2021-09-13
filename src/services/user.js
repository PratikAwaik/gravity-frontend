import axios from "axios";

const baseUrl = '/api/users';

const getAllUsers = async () => {
  let response;
  try {
    response = await axios.get(baseUrl);
  } catch (err) {
    console.log(err);
    response = err;
  }
  return response.data;
}

const getSingleUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const registerUser = async (userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userInfo);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

const loginUser = async (userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userInfo);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

const exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  loginUser
}

export default exports;