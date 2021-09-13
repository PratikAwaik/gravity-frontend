import axios from "axios";

const baseUrl = '/api/forums';

const getAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const exports = { 
  getAllPosts 
};

export default exports;