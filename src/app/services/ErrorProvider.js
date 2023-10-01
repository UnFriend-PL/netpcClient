"use client";
import React, { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <ErrorContext.Provider value={{ message, setMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
