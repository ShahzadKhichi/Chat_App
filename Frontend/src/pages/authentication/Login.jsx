import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const dipatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    dipatch(loginUserThunk(loginData));
  };

  return (
    <div className="flex   flex-col  justify-center items-center h-screen">
      <div className="flex flex-col w-[90%] md:w-[500px] gap-10 p-6 border-2 border-gray-700 rounded-xl">
        <h2 className="text-center font-bold text-2xl">Login</h2>
        <div>
          <label className=" w-full flex justify-center items-center input validator">
            <FaUser className="text-gray-500" />
            <input
              onChange={handleInputChange}
              type="text"
              required
              name="username"
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>
        </div>
        <div>
          <label className=" w-full flex justify-center items-center  input ">
            <FaEye className="text-gray-500" />
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              required
              placeholder="Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <p className="flex gap-1">
          Don't have an account?
          <Link to={"/signup"} className=" text-blue-400 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
