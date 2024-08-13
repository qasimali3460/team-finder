import axios from "axios";
import { getItem } from "expo-secure-store";

const BASE_URL = "http://192.168.10.5:5000/api/v1";

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
