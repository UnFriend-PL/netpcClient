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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersQuery();
  }, [user, selectedUserId, isViewToUpdate]);

  return (
    <>
      <div className="UserList">
        {console.log(users)}
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
