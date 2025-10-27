import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector(({ userReducer }) => userReducer.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return children;
};

export default LoginProtectedRoute;
