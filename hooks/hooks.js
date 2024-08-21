import { getItem, getItemAsync } from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "../services";

export function getAuth() {
  const [token, setToken] = useState(null);
  const [isTokenLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getItemAsync("token").then((token) => {
      setToken(token);
      setLoaded(true);
    });
  }, []);

  return [token, isTokenLoaded];
}

export function currentSession() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    try {
      const token = getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          setUserId(decoded?.id);
        }
      }
    } catch (e) {}
  }, []);

  return [userId];
}

export function getSocket() {
  let [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = getItem("token");
    if (token) {
      const mySocket = io(SERVER_URL, {
        auth: {
          token,
        },
      });
      setSocket(mySocket);
      return () => {
        mySocket.disconnect();
      };
    }
  }, []);
  return [socket];
}
