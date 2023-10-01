"use client";
import React, { useContext, useEffect } from "react";
import { ErrorContext } from "@/app/services/ErrorProvider";
import "./ErrorMessage.css";
const ErrorMessage = () => {
  const { message, setMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) {
    return null;
  }

  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
