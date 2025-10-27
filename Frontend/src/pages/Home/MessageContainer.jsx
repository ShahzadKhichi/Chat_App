import React, { use, useEffect, useState } from "react";
import User from "./User";
import Message from "./Message";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesThunk,
  sendMessageThunk,
} from "../../store/slice/message/message.thunk";
import toast from "react-hot-toast";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const selectedUser = useSelector(
    ({ userReducer }) => userReducer.selectedUser
  );
  const profile = useSelector(({ userReducer }) => userReducer.userProfile);

  const token = useSelector(({ userReducer }) => userReducer.token);
  const messages = useSelector(({ messageReducer }) => messageReducer.messages);
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessagesThunk({ token, receiverId: selectedUser._id }));
    }
  }, [selectedUser]);

  const sendMessageHandler = () => {
    if (message.trim() === "") toast.error("Message cannot be empty");
    else {
      dispatch(
        sendMessageThunk({ token, receiverId: selectedUser._id, message })
      );
      setMessage("");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col ">
      {selectedUser ? (
        <>
          <div className="p-3 border-b border-b-white/10">
            <User
              image={selectedUser?.avatar}
              fullname={selectedUser?.fullname}
              username={selectedUser?.username}
            />
          </div>
          {messages?.length > 0 ? (
            <div className="h-full overflow-y-scroll">
              {messages?.map((message) => (
                <Message
                  key={message?._id}
                  simg={profile?.avatar}
                  rimg={selectedUser?.avatar}
                  message={message?.message}
                  senderId={message?.senderId}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-center text-2xl text-primary font-bold">
                No messages yet. Start the conversation!
              </h1>
            </div>
          )}
          <div className="p-6 flex gap-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type here ..."
              className="input input-bordered input-primary w-full "
            />
            <button
              className="btn btn-outline btn-primary w-[60px] "
              onClick={sendMessageHandler}
            >
              <IoSend />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-center text-4xl text-primary font-bold">
            start chat
          </h1>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
