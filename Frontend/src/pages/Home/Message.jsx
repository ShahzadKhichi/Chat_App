import React, { use } from "react";
import { useSelector } from "react-redux";

const Message = ({ simg, rimg, message, senderId }) => {
  const currentUserId = useSelector(
    ({ userReducer }) => userReducer.userProfile._id
  );

  return (
    <div className="p-3">
      {senderId === currentUserId ? (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={simg} />
            </div>
          </div>
          <div className="chat-bubble">{message}</div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={rimg} />
            </div>
          </div>

          <div className="chat-bubble">{message}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
