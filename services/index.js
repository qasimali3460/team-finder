import axios from "axios";
import { router } from "expo-router";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const SERVER_URL = "http://192.168.10.4:5000";
// export const SERVER_URL = "https://9d4e-116-58-42-68.ngrok-free.app";
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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      deleteItemAsync("token");
      router.replace("(auth)/login");
    }

    return Promise.reject(error); // Reject the error to handle it in the catch block
  }
);

export default instance;
