import axios from "axios";
import { getItem } from "expo-secure-store";

export const SERVER_URL = "http://192.168.104.159:5000";
export const BASE_URL = `${SERVER_URL}/api/v1`;

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
