import axios from "./index";

export function sendMatchInvite(
  toTeam,
  matchDate,
  matchType,
  overs,
  location,
  message
) {
  return axios.post(`/match/invite`, {
    toTeam,
    matchDate,
    matchType,
    overs,
    location,
    message,
  });
}

export function getReceivedMatchInvites() {
  return axios.get(`/match/received`);
}

export function getSentMatchInvites() {
  return axios.get(`/match/sent`);
}

export function getInviteMessages(matchInvitation) {
  return axios.get(`/match/messages`, { params: { matchInvitation } });
}

export function getMessagesCount(matchInvitation) {
  return axios.get(`/match/messages/count`, { params: { matchInvitation } });
}

export function acceptMatchInvite(matchInvitation) {
  return axios.post(`/match/accept/${matchInvitation}`);
}

export function declineMatchInvite(matchInvitation) {
  return axios.post(`/match/decline/${matchInvitation}`);
}

export function cancelMatchInvite(matchInvitation) {
  return axios.post(`/match/cancel/${matchInvitation}`);
}

export function getUpcomingMatches() {
  return axios.get(`/match/upcoming`);
}

export function getHistoryMatches() {
  return axios.get(`/match/history`);
}
