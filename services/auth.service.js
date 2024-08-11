import axios from "./index";

export function register(name, phoneNumber, password) {
  return axios.post(`/auth/register`, { name, phoneNumber, password });
}

export function login(phoneNumber, password) {
  return axios.post(`/auth/login`, { phoneNumber, password });
}
