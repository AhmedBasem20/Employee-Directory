import axios from "axios";

const API_URL = "http://localhost:3307/api";

export const loginService = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password });
    return res.data.token;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logoutService = () => {
  localStorage.removeItem("token");
};
