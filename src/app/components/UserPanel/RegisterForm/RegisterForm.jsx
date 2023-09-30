"use client";
import { useContext, useState } from "react";
import { API_BASE_URL, UserContext } from "../../Context/UserContext";
import axios from "axios";
export default function RegisterForm({ isRegistering, setIsRegistering }) {
  const { user, setUser } = useContext(UserContext);
  const [userDto, setUserDto] = useState({
    email: "",
    userId: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    contactCategoryId: 0,
    contactSubCategoryId: 0,
    birthday: "2001-04-21",
  });
  const { isViewToUpdate, setIsViewToUpdate } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Users/Register`,
        userDto
      );
      const data = response.data.data;
      if (data) {
        setIsViewToUpdate(!isViewToUpdate);
        setIsRegistering(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <>
        <span>
          <strong>Last Name:</strong>
          <input
            type="text"
            onChange={(e) =>
              setUserDto({ ...userDto, lastName: e.target.value })
            }
          ></input>
        </span>
        <span>
          <strong>First Name:</strong>
          <input
            type="text"
            onChange={(e) =>
              setUserDto({ ...userDto, firstName: e.target.value })
            }
          ></input>
        </span>

        <span>
          <strong>Password</strong>
          <input
            type="password"
            onChange={(e) =>
              setUserDto({ ...userDto, password: e.target.value })
            }
          ></input>
        </span>
        <span>
          <strong>Phone:</strong>
          <input
            type="text"
            onChange={(e) => setUserDto({ ...userDto, phone: e.target.value })}
          ></input>
        </span>
        <span>
          <strong>E-mail:</strong>
          <input
            type="email"
            onChange={(e) => setUserDto({ ...userDto, email: e.target.value })}
          ></input>
        </span>
        <span>
          <strong>Contact Category:</strong>
          <input
            type="number"
            defaultValue={userDto.contactCategoryId}
            onChange={(e) => {
              setUserDto({ ...userDto, contactCategoryId: e.target.value });
            }}
          ></input>
        </span>
        <span>
          <strong>Contact Subcategory:</strong>
          <input
            type="number"
            onChange={(e) =>
              setUserDto({ ...userDto, contactSubCategoryId: e.target.value })
            }
            defaultValue={userDto.contactSubCategoryId}
          ></input>
        </span>
        <span>
          <strong>Birthday:</strong>
          <input
            type="date"
            onChange={(e) =>
              setUserDto({ ...userDto, birthday: e.target.value })
            }
            defaultValue={new Date(...userDto.birthday).toLocaleDateString(
              "en-CA"
            )}
          ></input>
        </span>
        <button onClick={handleRegister}>Register</button>
      </>
    </>
  );
}
