"use client";
import { useState } from "react";
import { UserContext } from "../components/Context/UserContext";
import axios from "axios";
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isUpToDateData, setIsUp] = useState(true);

  if (user != null) {
    axios.interceptors.request.use(
      (config) => {
        const token = user.token;
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, isUpToDateData, setIsUp }}
    >
      {children}
    </UserContext.Provider>
  );
};
