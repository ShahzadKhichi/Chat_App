import React from "react";
import { SideBar } from "./SideBar";
import MessageContainer from "./MessageContainer";

export const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <MessageContainer />
    </div>
  );
};
