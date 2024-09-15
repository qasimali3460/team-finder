import axios from "./index";

export function register(name, phoneNumber, password) {
  return axios.post(`/auth/register`, { name, phoneNumber, password });
}

export function login(phoneNumber, password) {
  return axios.post(`/auth/login`, { phoneNumber, password });
}

export function verifyOtp(otp, phoneNumber) {
  return axios.post(`/auth/verify-otp`, { otp, phoneNumber });
}

export function forgetPassword(phoneNumber) {
  return axios.post(`/auth/forget-password`, { phoneNumber });
}

export function resetPassword(password) {
  return axios.post(`/auth/reset-password`, { password });
}
