import React, { useState } from "react";
import { FaEye, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signupUserThunk } from "../../store/slice/user/user.thunk";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const dispatch = useDispatch();
  const [singupData, setSingupData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  console.log(singupData);
  const handleInputChange = (e) => {
    setSingupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = () => {
    dispatch(signupUserThunk(singupData));
  };
  return (
    <div className="flex   flex-col  justify-center items-center h-screen">
      <div className="flex flex-col  w-[90%] md:w-[500px] gap-10 p-6 border-2 border-gray-700 rounded-xl">
        <h2 className="text-center font-bold text-2xl">Signup</h2>
        <div>
          <label className=" w-full flex justify-center items-center input validator">
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
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>
        </div>
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
          <label className=" w-full flex justify-center items-center  input validator">
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
        <div>
          <label className=" w-full flex justify-center items-center  input validator">
            <FaEye className="text-gray-500" />
            <input
              onChange={handleInputChange}
              name="confirmPassword"
              type="password"
              required
              placeholder="confirm password"
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
        <div className="flex flex-col gap-2 ">
          <h2 className="w-full text-center text-primary text-2xl font-bold">
            {" "}
            Gender
          </h2>
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
