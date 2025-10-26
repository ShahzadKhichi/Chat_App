import React from "react";

const User = () => {
  return (
    <div className="flex items-center gap-5 p-3">
      {" "}
      <div className="avatar avatar-online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
        </div>
      </div>
      <div className="">
        <h1 className="line-clamp-1">full name</h1>
        <p className="text-xs">User name</p>
      </div>
    </div>
  );
};

export default User;
