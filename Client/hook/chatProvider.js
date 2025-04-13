"use client";
import axios from "@/pages/api/axios";
import cookie from "js-cookie";
import { io } from "socket.io-client";
import { createContext, useEffect, useRef, useState } from "react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [chatSelect, setChatSelect] = useState({});
  const [activeUser, setActiveUser] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("newUserAdd", cookie.get("userId"));
    socket.current.on("getUsers", (users) => {
      setActiveUser(users);
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{ chatSelect, setChatSelect, activeUser, socket }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
