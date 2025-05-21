import axios from 'axios';

const API_URL = '/api/posts';

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(API_URL, postData, config);
};

const getPosts = async (page = 1) => {
  return await axios.get(`${API_URL}?page=${page}`);
};

export default { createPost, getPosts };
