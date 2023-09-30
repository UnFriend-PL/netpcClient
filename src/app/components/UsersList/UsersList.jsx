"use client";
import { useEffect, useState, useContext } from "react";
import "./UserList.css";
import axios from "axios";
import { API_BASE_URL, UserContext } from "../Context/UserContext";
import React from "react";
import UserDeatil from "./UserDetail/UserDetail";
export default function UsersList() {
  const { user, setUser } = useContext(UserContext);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isViewToUpdate, setIsViewToUpdate } = useContext(UserContext);

  const UsersQuery = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Users/Users`);
      const data = response.data;
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const contactCategoriesQuery = async () => {
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
  const [users, setUsers] = useState([]);
  const [contactCategories, setContactCategories] = useState(
    contactCategoriesQuery
  );

  useEffect(() => {
    UsersQuery();
    // contactCategoriesQuery();
    // console.log(contactCategories);
    // console.log(user);
  }, [user, selectedUserId, isViewToUpdate]);

  return (
    <>
      <div className="UserList">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUserId(user.userId)}
            className={`UserRow ${
              user.userId === selectedUserId ? "Selected" : ""
            }`}
          >
            <span>
              {user.firstName} {user.lastName}
            </span>
            <div>
              {user.userId === selectedUserId ? (
                <>
                  <UserDeatil
                    key={index}
                    user={user}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                    contactCategories={contactCategories}
                  ></UserDeatil>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
