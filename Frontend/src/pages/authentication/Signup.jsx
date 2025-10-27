import React, { useState } from "react";
import { FaEye, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signupUserThunk } from "../../store/slice/user/user.thunk";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singupData, setSingupData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleInputChange = (e) => {
    setSingupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    const res = await dispatch(signupUserThunk(singupData));
    if (res?.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="flex   flex-col  justify-center items-center h-screen">
      <div className="flex flex-col  w-[90%] md:w-[500px] gap-10 p-6 border-2 border-gray-700 rounded-xl">
        <h2 className="text-center font-bold text-2xl">Signup</h2>
        <div>
          <label className=" w-full flex justify-center items-center input ">
            <FaUser className="text-gray-500" />
            <input
              onChange={handleInputChange}
              type="text"
              name="fullname"
              required
              placeholder="Full Name"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
        </div>
        <div>
          <label className=" w-full flex justify-center items-center input ">
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
        <div>
          <label className=" w-full flex justify-center items-center  input ">
            <FaEye className="text-gray-500" />
            <input
              onChange={handleInputChange}
              name="confirmPassword"
              type="password"
              required
              placeholder="confirm password"
            />
          </label>
        </div>
        <label className="w-full flex  items-center input">
          <div className="flex  gap-2 ">
            <div className="flex gap-2">
              <input
                onChange={handleInputChange}
                type="radio"
                value={"male"}
                name="gender"
                className="radio radio-primary"
                defaultChecked
              />
              <label>male{}</label>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleInputChange}
                type="radio"
                name="gender"
                value={"female"}
                className="radio radio-primary"
              />
              <label>female</label>
            </div>
          </div>
        </label>

        <button className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
        <p className="flex gap-1">
          Already have an account?
          <Link to={"/login"} className=" text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
