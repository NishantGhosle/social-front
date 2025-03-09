import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add request interceptor for authentication
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const token = JSON.parse(localStorage.getItem('profile')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) => API.put(`/posts/${id}/like`);
export const addComment = (id, commentData) => API.put(`/posts/${id}/comment`, commentData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);