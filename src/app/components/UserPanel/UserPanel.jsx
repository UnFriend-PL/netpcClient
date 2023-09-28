"use client";
import { API_BASE_URL, UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import "./UserPanel.css";
import axios from "axios";

export default function UserPanel() {
  const { user, setUser } = useContext(UserContext);
  const { isLogged, setIsLogged } = useContext(UserContext);
  const [userLoginDto, setUserLoginDto] = useState({ password: "", email: "" });

  const logoutUser = async () => {
    setUser(null);
    setIsLogged(false);
  };
  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Users/Login`,
        userLoginDto
      );
      const data = response.data;
      console.log(data);
      if (data.success) {
        setUser(data.data);
        setIsLogged(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {isLogged ? (
        <>
          <div className="User-Form">
            <span>Welcome {user.firstName}</span>
            <button onClick={logoutUser}>Log Out</button>
          </div>
        </>
      ) : (
        <>
          <div className="User-Form">
            <h1>Log in</h1>
            <input
              type="text"
              value={userLoginDto.email}
              onChange={(e) =>
                setUserLoginDto({ ...userLoginDto, email: e.target.value })
              }
            ></input>
            <input
              type="password"
              value={userLoginDto.password}
              onChange={(e) =>
                setUserLoginDto({ ...userLoginDto, password: e.target.value })
              }
            ></input>
            <button
              onClick={async () => {
                await loginUser();
              }}
            >
              Log In
            </button>
          </div>
        </>
      )}
    </>
  );
}
