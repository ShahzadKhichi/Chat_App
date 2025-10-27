import React from "react";
import User from "./User";
import Message from "./Message";
import { IoSend } from "react-icons/io5";

const MessageContainer = () => {
  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="p-3 border-b border-b-white/10">
        <User />
      </div>
      <div className="h-full overflow-y-scroll">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message /> <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="p-6 flex gap-1">
        <input
          type="text"
          placeholder="Type here ..."
          className="input input-bordered input-primary w-full "
        />
        <button className="btn btn-square btn-primary w-[60px] ">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
