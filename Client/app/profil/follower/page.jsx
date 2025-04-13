"use client";
import Follow from "@/components/Follow";
import CurrentUserContext from "@/hook/currentUserProvider";
import axios from "@/pages/api/axios";
import cookie from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

function Follower() {
  const { user, users } = useContext(CurrentUserContext);

  return (
    <div className=" bg-white dark:bg-slate-800 dark:text-white mt-5 mx-[10%] p-5 rounded-lg">
      <div className=" flex justify-between items-center">
        <h2 className=" text-xl font-semibold">Follower</h2>
        <form className=" flex items-center ml-3 p-2 rounded-full dark:bg-slate-900 bg-slate-100">
          <button className=" text-lg text-slate-600 mr-3">
            <FiSearch />
          </button>
          <input
            type="text"
            placeholder="Rechercher"
            className=" focus:outline-none text-slate-500 bg-transparent"
          />
        </form>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {user?.follower?.join() &&
          user?.follower?.map((id) => {
            return <Follow key={id} id={id} users={users} />;
          })}
      </div>
    </div>
  );
}

export default Follower;
