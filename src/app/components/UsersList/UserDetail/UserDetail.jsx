"use client";
import { useContext, useState } from "react";
import { API_BASE_URL, UserContext } from "../../Context/UserContext";
import axios from "axios";
import "./UserDetail.css";
export default function UserDeatil({
  user: userToShow,
  selectedUserId,
  setSelectedUserId,
  // contactCategories,
}) {
  const { isLogged, setIsLogged } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { contactCategories, setContactCategories } = useContext(UserContext);

  const [userDto, setUserDto] = useState({
    email: userToShow.email,
    userId: userToShow.userId,
    phone: userToShow.phone,
    firstName: userToShow.firstName,
    lastName: userToShow.lastName,
    contactSubCategoryId: userToShow.contactSubCategoryId,
    contactCategoryId: userToShow.contactCategoryId,
    birthday: userToShow.date,
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
                value={userDto.lastName}
              ></input>
            </span>
            <span>
              <strong>First Name:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, firstName: e.target.value })
                }
                value={userDto.firstName}
              ></input>
            </span>
            <span>
              <strong>Phone:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, phone: e.target.value })
                }
                value={userDto.phone}
              ></input>
            </span>
            <span>
              <strong>E-mail:</strong>
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, email: e.target.value })
                }
                value={userDto.email}
              ></input>
            </span>
            <span>
              <strong>Birthday:</strong>
              <input
                type="date"
                onChange={(e) =>
                  setUserDto({ ...userDto, birthday: e.target.value })
                }
                defaultValue={new Date(userToShow.birthday).toLocaleDateString(
                  "en-CA"
                )}
              ></input>
            </span>
            <span>
              <strong>Category:</strong>
              <select
                value={userDto.contactCategoryId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUserDto({
                    ...userDto,
                    contactCategoryId: Number(e.target.value),
                  });
                }}
              >
                {contactCategories.map((category) => (
                  <option
                    key={category.contactCategoryId}
                    value={category.contactCategoryId}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <strong>Sub Category:</strong>
              <input
                type="text"
                value={userDto.contactSubCategoryId}
                onChange={(e) =>
                  setUserDto({
                    ...userDto,
                    contactSubCategoryId: Number(e.target.value),
                  })
                }
              ></input>
            </span>
          </>
        ) : (
          <>
            <span>
              <strong>LastName: </strong>
              <input disabled value={userDto.lastName} />
            </span>
            <span>
              <strong>FirstName: </strong>
              <input disabled value={userDto.firstName} />
            </span>
            <span>
              <strong>Phone: </strong>
              <input disabled value={userDto.phone} />
            </span>
            <span>
              <strong>E-mail: </strong>
              <input disabled value={userDto.email} />
            </span>
            <span>
              <strong>Birthday: </strong>
              <input
                type="date"
                value={new Date(userToShow.birthday).toLocaleDateString(
                  "en-CA"
                )}
                disabled
              />
            </span>
            <span>
              <strong>Category: </strong>
              {contactCategories.map((category, index) => (
                <span key={index}>
                  {userToShow.contactCategoryId ==
                  category.contactCategoryId ? (
                    <input disabled value={category.name} />
                  ) : (
                    <></>
                  )}
                </span>
              ))}
            </span>
            <span>
              <strong>Sub Category: </strong>
              <input disabled value={userDto.contactSubCategoryId} />
            </span>
          </>
        )}
      </div>
    </>
  );
}
