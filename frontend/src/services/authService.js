import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/";

const register = (username, password) => {
  return axios.post(`${API_URL}register/`, { username, password });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}login/`, { username, password })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.refresh) {
    try {
      await axios.post(`${API_URL}logout/`, { refresh_token: user.refresh });
      localStorage.removeItem("user");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  } else {
    localStorage.removeItem("user");
    return Promise.resolve();
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
