"use client";
import axios from "@/pages/api/axios";
import cookie from "js-cookie";
import { createContext, useEffect, useState } from "react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [chatSelect, setChatSelect] = useState({});

  return (
    <ChatContext.Provider value={{ chatSelect, setChatSelect }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
