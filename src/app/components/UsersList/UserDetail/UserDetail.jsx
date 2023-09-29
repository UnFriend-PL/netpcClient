"use client";
import { useContext, useState } from "react";
import { API_BASE_URL, UserContext } from "../../Context/UserContext";
import axios from "axios";
import "./UserDetail.css";
export default function UserDeatil({
  user: userToShow,
  selectedUserId,
  setSelectedUserId,
}) {
  const { isLogged, setIsLogged } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [userDto, setUserDto] = useState({
    email: userToShow.email,
    userId: userToShow.userId,
    phone: userToShow.phone,
    firstName: userToShow.firstName,
    lastName: userToShow.lastName,
    subContactCategoryId: userToShow.subContactCategoryId,
    contactCategory: userToShow.contactCategory,
    date: userToShow.date,
  });
  const handleEditClick = () => {
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  };
  const handleSaveClick = () => {
    axios
      .put(`${API_BASE_URL}/api/Users/UpdateUser`, userDto)
      .then((response) => {
        setUser(response.data.data);
        setIsEditing(false);
      })
      .catch((error) => console.log("Error:", error));
  };
  const handleDelteClick = () => {
    axios
      .delete(`${API_BASE_URL}/api/Users/DeleteUser`, {
        data: { userId: selectedUserId },
      })
      .then((response) => {
        setIsEditing(false);
        setSelectedUserId(null);
      })
      .catch((error) => console.log("Error:", error));
  };
  return (
    <>
      <div className="UserDeatil">
        {isLogged ? (
          <div className="UserDetailButtons">
            <button onClick={handleDelteClick}>Delete</button>
            <button onClick={handleEditClick}>Edit</button>
            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {isEditing && isLogged ? (
          <>
            <span>
              <strong>Last Name:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, lastName: e.target.value })
                }
                defaultValue={userToShow.lastName}
              ></input>
            </span>
            <span>
              <strong>First Name:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, firstName: e.target.value })
                }
                defaultValue={userToShow.firstName}
              ></input>
            </span>
            <span>
              <strong>Phone:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, phone: e.target.value })
                }
                defaultValue={userToShow.phone}
              ></input>
            </span>
            <span>
              <strong>E-mail:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, email: e.target.value })
                }
                defaultValue={userToShow.email}
              ></input>
            </span>
          </>
        ) : (
          <>
            <span>
              <strong>LastName:</strong>
              {userToShow.lastName}
            </span>
            <span>
              <strong>FirstName:</strong>
              {userToShow.firstName}
            </span>
            <span>
              <strong>Phone:</strong>
              {userToShow.phone}
            </span>
            <span>
              <strong>E-mail:</strong>
              {userToShow.email}
            </span>
            <span>
              <strong>Birthday:</strong>
              {userToShow.birthday}
            </span>
            <span>
              <strong>Category:</strong>
              {userToShow.contactCategory}
            </span>
            <span>
              <strong>Sub Category:</strong>
              {userToShow.subContactCategoryId}
            </span>
          </>
        )}
      </div>
    </>
  );
}
