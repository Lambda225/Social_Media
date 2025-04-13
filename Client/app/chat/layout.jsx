"use client";
import { ChatProvider } from "@/hook/chatProvider";
import CurrentUserContext from "@/hook/currentUserProvider";
import React, { useContext, useEffect } from "react";

function ChatLayout({ children }) {
  const { dark } = useContext(CurrentUserContext);

  useEffect(() => {
    if (dark == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return <ChatProvider>{children}</ChatProvider>;
}

export default ChatLayout;
