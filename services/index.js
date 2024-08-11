import axios from "axios";
import { getItem, getItemAsync } from "expo-secure-store";

// const BASE_URL = "http://localhost:5000"
const BASE_URL = "http://192.168.10.4:5000/api/v1";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
