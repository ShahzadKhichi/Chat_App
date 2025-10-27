import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnLoginProtected = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(({ userReducer }) => userReducer);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return children;
};

export default UnLoginProtected;
