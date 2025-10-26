import React from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";

export const SideBar = () => {
  return (
    <div className="max-w-[20rem] flex flex-col w-full h-screen">
      <h1 className="text-center text-2xl font-bold text-[#7480ff]">K-Chat</h1>
      <div className="p-3">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <IoSearch className="text-lg" />
        </label>
      </div>
      <div className="h-full overflow-y-scroll">
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
      <div className="flex  items-center justify-between">
        <User />
        <button className="btn btn-primary">Log out</button>
      </div>
    </div>
  );
};
