// src/services/api.js

import axios from "axios";

const API_URL = "http://localhost:8000/api/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Function to refresh the access token
const refreshToken = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const refresh = user?.refresh; // Assuming `refresh` token is stored in the user object

  try {
    const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
    const newAccessToken = response.data.access;

    // Update the user object with the new access token
    user.access = newAccessToken;
    localStorage.setItem("user", JSON.stringify(user));

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    localStorage.removeItem("user");
    return null;
  }
};

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
