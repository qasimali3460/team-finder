import axios from "./index";

export function getMyTeam() {
  return axios.get(`/team/myTeam/`);
}

export function getUserAllTeams(userId) {
  return axios.get(`/team/user/all/${userId}`);
}

export function getOtherTeamDetail(teamId) {
  return axios.get(`/team/details/${teamId}`);
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

export function getMyInvites() {
  return axios.get(`/team/invitations`);
}

export function cancelInvite(invitationId) {
  return axios.post(`/team/decline`, { invitationId });
}

export function acceptInvite(invitationId) {
  return axios.post(`/team/accept`, { invitationId });
}

export function getMyTeamMembers() {
  return axios.get(`/team/teamMembers`);
}

export function getNearbyTeams(search, longitude, latitude) {
  return axios.get(`/team/nearby`, {
    params: { longitude, latitude, page: 1, limit: 100, search },
  });
}
