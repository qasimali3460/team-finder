import axios from "./index";

export function getMyProfile() {
  return axios.get(`/profile`);
}

export function getOtherUserProfile(userId) {
  return axios.get(`/profile/user/${userId}`);
}

export function updateMyProfile(formData) {
  console.log("userProfile: ", formData);
  return axios.post(`/profile`, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    transformRequest: () => {
      return formData;
    },
  });
}
