import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    ({ userReducer }) => userReducer.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return children;
};

export default LoginProtectedRoute;
