import React from "react";

const User = ({ image, fullname, username }) => {
  return (
    <div className="flex items-center gap-5 m-1 p-2 border-2 border-[#1D232A] transition-all duration-200 hover:border-[#7480ff] cursor-pointer rounded-2xl active:scale-95">
      {" "}
      <div className="avatar avatar-online">
        <div className="w-16 rounded-full">
          <img src={image} />
        </div>
      </div>
      <div className="">
        <h1 className="line-clamp-1">{fullname || " "}</h1>
        <p className="text-xs">{username || ""}</p>
      </div>
    </div>
  );
};

export default User;
