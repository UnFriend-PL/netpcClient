"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL, UserContext } from "../components/Context/UserContext";
import axios from "axios";
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isViewToUpdate, setIsViewToUpdate] = useState(false);

  const [contactCategories, setContactCategories] = useState([]);
  const [contactSubCategories, setContactSubCategories] = useState([]);

  useEffect(() => {
    const fetchContactCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/ContactCategories/ContactCategories`
        );
        const data = response.data.data;
        if (data) {
          setContactCategories(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const fetchContactSubCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/ContactCategories/ContactSubCategories`
        );
        const data = response.data.data;
        if (data) {
          setContactSubCategories(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContactCategories();
    fetchContactSubCategories();
  }, []);

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
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        isViewToUpdate,
        setIsViewToUpdate,
        contactCategories,
        setContactCategories,
        contactSubCategories,
        setContactSubCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
