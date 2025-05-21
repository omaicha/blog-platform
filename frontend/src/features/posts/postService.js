import axios from 'axios';

const API_URL = '/api/posts';

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

// Get posts
const getPosts = async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

// Get single post
const getPostById = async (postId) => {
  const response = await axios.get(`${API_URL}/${postId}`);
  return response.data;
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${API_URL}/${postId}`, config);
  return postId;
};

export default {
  createPost,
  getPosts,
  getPostById,
  deletePost
};
