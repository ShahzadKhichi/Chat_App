import React, { useEffect } from "react";
import { SideBar } from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  getUserProfieThunk,
} from "../../store/slice/user/user.thunk";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socket.slice";
import { addNewMessage } from "../../store/slice/message/message.slice";

export const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    ({ userReducer }) => userReducer.isAuthenticated
  );
  const token = useSelector(({ userReducer }) => userReducer.token);
  const userId = useSelector(({ userReducer }) => userReducer.userProfile?._id);
  const socket = useSelector(({ socketReducer }) => socketReducer.socket);

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(initializeSocket(userId));
    } else if (token) {
      dispatch(getUserProfieThunk());
      dispatch(getOtherUsersThunk(token));
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socket.on("newMessage", (newMessage) => {
        dispatch(addNewMessage(newMessage));
      });
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <div className="flex">
      <SideBar />
      <MessageContainer />
    </div>
  );
};
