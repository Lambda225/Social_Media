"use client";
import React, { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "@/pages/api/axios";
import ChatContext from "@/hook/chatProvider";
import { FaUser } from "react-icons/fa";

export default function CartChat({ chat }) {
  const { setChatSelect, chatSelect, activeUser } = useContext(ChatContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`/user/chat/${cookie.get("userId")}/${chat.id}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then(({ data }) => {
        setUser(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      onClick={(e) => setChatSelect(chat)}
      className={`${
        chatSelect.id !== chat.id
          ? "bg-white dark:bg-slate-700"
          : "bg-blue-700 "
      }  p-3 cursor-pointer rounded-xl flex items-center justify-between gap-5`}
    >
      <div className=" flex items-center gap-3">
        <div
          className={`bg-slate-300 dark:bg-slate-400"
          } h-12 aspect-square flex justify-center items-center relative  rounded-full`}
        >
          {user.picturePath ? (
            <img
              src={`http://localhost:3001/${user.picturePath}`}
              alt=""
              className=" rounded-full "
            />
          ) : (
            <FaUser className="text-sm text-slate-600 dark:text-slate-600" />
          )}{" "}
          <div
            className={`${
              !activeUser.some((item) => item.userId == user.id) && "hidden"
            } h-3 aspect-square rounded-full bg-green-400 absolute bottom-0 right-1`}
          ></div>
        </div>
        <div className=" text-xs">
          <h3
            className={`${
              chatSelect.id == chat.id && "text-white"
            } font-semibold mb-1 capitalize dark:text-white`}
          >
            {user?.firstName} {user?.lastName?.split(" ")[0]}
          </h3>
          <p
            className={`${
              chatSelect.id == chat.id
                ? "text-slate-200"
                : "text-slate-400 dark:text-slate-400"
            } `}
          >
            Lorem, ipsum dolor.
          </p>
        </div>
      </div>
      <div className=" h-full flex flex-col justify-between items-end">
        <p
          className={`${
            chatSelect.id == chat.id ? "text-slate-300" : " dark:text-slate-500"
          } text-xs `}
        >
          {" "}
          il a 2min
        </p>
        {/* <div className=" flex justify-center items-center rounded-full bg-blue-600 h-4 w-4 text-white text-xs">
          1
        </div> */}
      </div>
    </div>
  );
}
