"use client";
import React, { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import axios from "@/pages/api/axios";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsChat, BsChatFill } from "react-icons/bs";
import SuggestedComponent from "./SuggestedComponent";
import CurrentUserContext from "@/hook/currentUserProvider";

function NavBar() {
  const router = useRouter();
  const { user, dark, toggleDark, setUser, users, setUsers } =
    useContext(CurrentUserContext);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const pathName = usePathname();

  const disconnecte = (e) => {
    cookie.remove("token");
    cookie.remove("userId");
    setUser({});
    router.push("/login");
  };

  useEffect(() => {
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
  }, []);

  return (
    <nav className="flex justify-between relative py-5 px-10 shadow-lg bg-white dark:bg-slate-800">
      <div className="flex items-center">
        <h1 className=" text-xl font-bold dark:text-white">
          <Link href="/">Social Media</Link>
        </h1>
        {pathName !== "/chat" && (
          <form className=" flex items-center ml-3 p-2 rounded-full bg-slate-100 dark:bg-slate-900">
            <button className=" text-lg text-slate-600 mr-3">
              <FiSearch />
            </button>
            <input
              type="text"
              placeholder="Rechercher"
              className=" focus:outline-none text-slate-500 bg-transparent"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onFocus={(e) => {
                setSearch(true);
              }}
            />
            <div
              className={`${
                search ? "flex" : "hidden"
              } absolute top-[105%] flex-col gap-4 rounded-lg shadow-lg w-72 left-10 p-3 dark:bg-slate-800  bg-white z-40`}
            >
              <div
                className=" absolute -top-2 right-0 bg-slate-200 dark:bg-slate-500 dark:text-slate-300 cursor-pointer text-slate-600 flex justify-center items-center text-xs h-5 w-5 rounded-full"
                onClick={(e) => {
                  setSearch(!search);
                }}
              >
                <GrClose />
              </div>
              {users
                .filter(
                  (item) =>
                    item.id != user.id && item.firstName.includes(inputValue)
                )
                .slice(0, 5)
                .map((user) => {
                  return <SuggestedComponent key={user.id} user={user} />;
                })}
            </div>
          </form>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <div className="flex gap-4 text-slate-500 dark:text-slate-400 pr-5 border-r py-2 items-center text-lg">
          <Link
            href="/"
            className={`${pathName == "/" && "text-blue-600"} cursor-pointer`}
          >
            <AiFillHome />
          </Link>
          <span className=" cursor-pointer">
            <Link
              href="/chat"
              className={`${
                pathName == "/chat" && "text-blue-600"
              } cursor-pointer`}
            >
              <BsChatFill />
            </Link>
          </span>
          <div>
            <div
              onClick={(e) => toggleDark()}
              className=" bg-slate-200 dark:bg-slate-400 h-5 relative rounded-full w-8 cursor-pointer"
            >
              <div
                className={` ${
                  dark === "light" ? " left-0.5" : " left-[13px] "
                } h-4 w-4 top-0.5 rounded-full absolute transition-all ease-out duration-500  bg-slate-600 dark:bg-slate-800`}
              ></div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            setMenu(!menu);
          }}
          className=" h-9 w-9 flex justify-center cursor-pointer items-center bg-slate-200 dark:bg-slate-700 rounded-full"
        >
          {!user.picturePath ? (
            <FaUser className="text-sm text-slate-600 dark:text-slate-400" />
          ) : (
            <img src={user?.picturePath} alt="user" />
          )}
        </div>
        <div
          className={`${
            menu ? "flex" : "hidden"
          } p-3 w-52 flex-col items-center bg-white dark:bg-slate-800 shadow-lg z-40 absolute rounded-lg top-[105%] right-5`}
        >
          <Link href="/profil" className="flex flex-col items-center">
            <div
              onClick={(e) => {
                setMenu(!menu);
              }}
              className=" h-9 w-9 flex justify-center items-center bg-slate-200 dark:bg-slate-700 rounded-full"
            >
              {!user.picturePath ? (
                <FaUser className="text-sm text-slate-600 dark:text-slate-400" />
              ) : (
                <img src={user?.picturePath} alt="user" />
              )}
            </div>
            <h3 className=" text-xs font-bold dark:text-white  capitalize mt-2">
              {user?.firstName} {user?.lastName?.split(" ")[0]}
            </h3>
          </Link>
          <div
            onClick={disconnecte}
            className=" cursor-pointer flex items-center gap-4 text-blue-600 mt-5"
          >
            <div className=" h-7 text-sm w-7 flex justify-center items-center rounded-full dark:bg-slate-700 bg-slate-200">
              <MdOutlineLogout />
            </div>
            <p className=" text-xs ">Deconnection</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
