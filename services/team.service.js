import axios from "./index";

export function getMyTeam() {
  return axios.get(`/team/myTeam/`);
}

export function updateMyTeam(formData) {
  return axios.post(`/team`, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    transformRequest: () => {
      return formData;
    },
  });
}

export function sendInvite(phone, message) {
  return axios.post(`/team/invite`, { phone, message });
}

export function getSentInvites() {
  return axios.get(`/team/myInvitations`);
}

export function cancelInvite(invitationId) {
  return axios.post(`/team/decline`, { invitationId });
}
