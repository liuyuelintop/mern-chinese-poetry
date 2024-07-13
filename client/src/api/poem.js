import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export const fetchPoems = async (endpoint, page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}?page=${page}`);
  return response.data;
};

export const fetchRandomPoems = async () => {
  const response = await axios.get(`${API_BASE_URL}/poems/random-poems`);
  return response.data;
};

export const likePoem = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/poems/like/${id}`);
  return response.data;
};
