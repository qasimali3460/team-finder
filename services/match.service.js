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

export function getInviteMessages(matchInvitation) {
  return axios.get(`/match/messages`, { params: { matchInvitation } });
}
