import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/";

const register = (username, password, email) => {
  return axios.post(`${API_URL}register/`, { username, password, email });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}login/`, { username, password })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else if (typeof response.data === 'string' && response.data.startsWith('<')) {
        throw new Error("Received HTML instead of JSON");
      } else {
        throw new Error("Login failed");
      }
    })
    .catch((error) => {
      console.error("AuthService login error:", error.response.data);
      throw error;
    });
};

const fetchUserData = (accessToken) => {
  return axios.get(`${API_URL}user/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error("Failed to fetch user data:", error.response.data);
    throw error;
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
  fetchUserData,
  logout,
};

export default authService;
