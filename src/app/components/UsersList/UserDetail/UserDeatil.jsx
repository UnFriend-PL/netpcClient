"use client";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import "./UserDetail.css";
export default function UserDeatil({ user }) {
  const { isLogged, setIsLogged } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div className="UserDeatil">
        {isLogged ? (
          <div className="UserDetailButtons">
            <button>Delete</button>
            <button>Edit</button>
            {isEditing ? <button>Save</button> : <></>}
          </div>
        ) : (
          <></>
        )}
        <span>
          <strong>Phone:</strong>
          {user.phone}
        </span>
        <span>
          <strong>E-mail:</strong>
          {user.email}
        </span>
      </div>
    </>
  );
}
