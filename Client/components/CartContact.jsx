"use client";
import React, { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "@/pages/api/axios";
import ChatContext from "@/hook/chatProvider";

function CartContact({ id }) {
  const { setChatSelect } = useContext(ChatContext);
  const [user, setUser] = useState({});
  const hundleClick = () => {
    axios
      .post(
        `/chat/${cookie.get("userId")}/${id}`,
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((res) => {
        setChatSelect(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/auth/user/${id}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      onClick={hundleClick}
      className="p-3 bg-white dark:bg-slate-700 flex items-center gap-2 rounded-xl cursor-pointer"
    >
      <div className="h-12 aspect-square bg-slate-300 dark:bg-slate-400  rounded-full"></div>
      <h3 className=" text-xs font-bold capitalize dark:text-white">
        {" "}
        {user?.firstName} {user?.lastName?.split(" ")[0]}
      </h3>
    </div>
  );
}

export default CartContact;
