import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const navigate = useNavigate();
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

  const handleLogin = async () => {
    const res = await dipatch(loginUserThunk(loginData));
    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex   flex-col  justify-center items-center h-screen">
      <div className="flex flex-col w-[90%] md:w-[500px] gap-10 p-6 border-2 border-gray-700 rounded-xl">
        <h2 className="text-center font-bold text-2xl">Login</h2>
        <div>
          <label className=" w-full flex justify-center items-center input ">
            <FaUser className="text-gray-500" />
            <input
              onChange={handleInputChange}
              type="text"
              required
              name="username"
              placeholder="Username"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
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
            />
          </label>
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
