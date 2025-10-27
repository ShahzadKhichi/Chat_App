import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnLoginProtected = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector(({ userReducer }) => userReducer);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return children;
};

export default UnLoginProtected;
