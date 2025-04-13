"use client";
import axios from "@/pages/api/axios";
import cookie from "js-cookie";
import { createContext, useEffect, useState } from "react";

const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [setPosts, posts] = useState([]);
  const [users, setUsers] = useState([]);
  const [dark, setDark] = useState("light");

  const toggleDark = () => {
    setDark((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (cookie.get("userId")) {
      axios
        .get(`/auth/user/${cookie.get("userId")}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`/user/all/${cookie.get("userId")}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, dark, toggleDark, users, setUsers }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
