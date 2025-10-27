import React, { useEffect } from "react";
import { SideBar } from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  getUserProfieThunk,
} from "../../store/slice/user/user.thunk";
import { initializeSocket } from "../../store/slice/socket/socket.slice";

export const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    ({ userReducer }) => userReducer.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeSocket());
      dispatch(getUserProfieThunk());
      dispatch(getOtherUsersThunk());
    }
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <MessageContainer />
    </div>
  );
};
