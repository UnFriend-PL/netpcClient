"use client";
import { useContext, useEffect, useState } from "react";
import { API_BASE_URL, UserContext } from "../../Context/UserContext";
import axios from "axios";
import "./RegisterForm.css";
import { ErrorContext } from "@/app/services/ErrorProvider";
export default function RegisterForm({ isRegistering, setIsRegistering }) {
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setMessage } = useContext(ErrorContext);
  const [userDto, setUserDto] = useState({
    email: "",
    userId: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    contactCategoryId: 1,
    contactSubCategoryId: 0,
    subCategoryName: null,
    birthday: "2001-04-21",
  });
  const { isViewToUpdate, setIsViewToUpdate } = useContext(UserContext);
  const { contactCategories, setContactCategories } = useContext(UserContext);

  // Validation functions
  const validatePasswords = () => {
    // Password matching validation
    if (userDto.password !== repeatPassword) {
      console.error("Passwords do not match");
      setMessage("Passwords do not match");
      return false;
    }
    return validatePasswordComplexity();
  };

  const validatePasswordComplexity = () => {
    // Password complexity validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    if (!passwordRegex.test(userDto.password)) {
      console.error("Password does not meet complexity requirements");
      setMessage("Password does not meet complexity requirements");
      return false;
    }
    return true;
  };
  const { contactSubCategories, setContactSubCategories } =
    useContext(UserContext);
  // Handle registration
  const handleRegister = async () => {
    if (!validatePasswords()) return;
    try {
      const subCategory = contactCategories.find(
        (c) => c.name === userDto.subCategoryName
      );
      // Create a new contact subcategory if it doesn't exist
      if (!subCategory && subCategory != null) {
        const response = await axios.post(
          `${API_BASE_URL}/api/ContactCategories/CreateContactSubCategory`,
          {
            contactCategoryId: userDto.contactCategoryId,
            name: userDto.subCategoryName,
          }
        );
        const data = response.data.data;
        userDto.contactSubCategoryId = data.contactSubCategoryId;
      } else if (subCategory == null) {
        // Set contactSubCategoryId to 0 if subCategory is null
        setUserDto({
          ...userDto,
          contactSubCategoryId: 0,
        });
      } else {
        // Use existing contactSubCategoryId if subCategory exists
        userDto.contactSubCategoryId = subCategory.contactSubCategoryId;
      }
      // Register the user
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
      <div className="RegisterForm">
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
          <strong>Password:</strong>
          <input
            type="password"
            onChange={(e) =>
              setUserDto({ ...userDto, password: e.target.value })
            }
          ></input>
        </span>
        <span>
          <strong>Repeat Password:</strong>
          <input
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
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
          <select
            onChange={(e) => {
              setUserDto({
                ...userDto,
                contactCategoryId: Number(e.target.value),
              });
              console.log(e.target.value);

              console.log(contactSubCategories);
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
          {userDto.contactCategoryId !== 0 &&
            userDto.contactCategoryId === 2 && (
              <>
                <strong>Contact Subcategory:</strong>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setUserDto({
                      ...userDto,
                      contactSubCategoryId: Number(e.target.value),
                    });
                  }}
                >
                  {contactSubCategories &&
                    contactSubCategories
                      .filter(
                        (subCategory) => subCategory.contactCategoryId === 2
                      )
                      .map((subCategory) => (
                        <option
                          key={subCategory.contactSubCategoryId}
                          value={subCategory.contactSubCategoryId}
                        >
                          {subCategory.name}
                        </option>
                      ))}
                </select>
              </>
            )}
          {userDto.contactCategoryId !== 0 &&
            userDto.contactCategoryId === 3 && (
              <input
                type="text"
                onChange={(e) =>
                  setUserDto({ ...userDto, subCategoryName: e.target.value })
                }
                value={userDto.subCategoryName}
              ></input>
            )}
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
      </div>
    </>
  );
}
