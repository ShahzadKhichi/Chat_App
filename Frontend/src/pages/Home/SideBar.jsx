import React, { use } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../store/slice/user/user.thunk";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import toast from "react-hot-toast";

export const SideBar = () => {
  const profile = useSelector(({ userReducer }) => userReducer.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(({ socketReducer }) => socketReducer.socket);
  const onlineUsers = useSelector(
    ({ socketReducer }) => socketReducer.onlineUsers
  );
  const token = useSelector(({ userReducer }) => userReducer.token);
  const handleLogout = async () => {
    const res = await dispatch(logoutUserThunk(token));
    socket?.close();
    if (res?.payload?.success) {
      navigate("/login");
    }
  };

  const otherUsers = useSelector(({ userReducer }) => userReducer.otherUsers);

  return (
    <div className="max-w-[20rem] flex flex-col w-full h-screen">
      <h1 className="text-center text-2xl font-bold text-[#7480ff]">K-Chat</h1>
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input type="text" className="grow" placeholder="Search" />
          <IoSearch className="text-lg" />
        </label>
      </div>
      <div className="h-full overflow-y-scroll">
        {otherUsers?.map((user) => {
          return (
            <div
              key={user._id}
              onClick={() => {
                dispatch(setSelectedUser(user));
              }}
            >
              <User
                status={onlineUsers?.includes(user._id) ? "online" : "offline"}
                image={user?.avatar}
                fullname={user?.fullname}
                username={user?.username}
              />
            </div>
          );
        })}
      </div>
      <div className="flex  items-center justify-between">
        <User
          status={"online"}
          image={profile?.avatar}
          fullname={profile?.fullname}
          username={profile?.username}
        />
        <button className="btn btn-primary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};
