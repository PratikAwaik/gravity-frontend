import axios from "axios";

const baseUrl = '/api/forums';

let token;

const setToken = (newToken) => {
  token = 'Bearer ' + newToken;
}

const getAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getSinglePost = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const handleUpvote = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  try {
    const response = await axios.patch(`${baseUrl}/${id}/upvote`, {}, config);
    return response.data;
  } catch (err) {
    console.log(err.response);
  }
}

const handleDownvote = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  try {
    const response = await axios.patch(`${baseUrl}/${id}/downvote`, {}, config);
    return response.data;
  } catch (err) {
    console.log(err.response);
  }
}

const createPost = async (postData) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  try {
    const response = await axios.post(baseUrl, postData, config);
    return response.data;
  } catch (err) {
    console.log(err.response);
  }
}

const exports = { 
  setToken,
  getAllPosts,
  getSinglePost,
  handleUpvote,
  handleDownvote,
  createPost
};

export default exports;