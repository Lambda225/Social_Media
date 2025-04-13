"use client";
import NavBar from "@/components/NavBar";
import CurrentUserContext from "@/hook/currentUserProvider";
import axios from "@/pages/api/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cookie from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function ProfileLayout({ children }) {
  const { user, dark } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({ userImage: "" });
  const pathName = usePathname();

  useEffect(() => {
    if (dark == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const changeUserPicture = () => {
    if (Object.keys(formData).length == 0 && submit) {
      let formValue = new FormData();
      axios
        .put(`/post/${cookie.get("userId")}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <NavBar user={user} />
      <div className=" h-72 bg-slate-200 dark:bg-slate-900 shadow-md grid grid-rows-[1fr,7rem,4rem] grid-cols-1">
        <div className=" row-start-1 row-end-3  col-[1/-1]">
          {dark === "dark" ? (
            <img
              src="./vue.jpg"
              alt="profil"
              className=" blur-sm object-cover w-full h-full"
            />
          ) : (
            <img
              src="ligth.jpg"
              alt="./profil"
              className=" blur-sm object-cover w-full h-full"
            />
          )}
        </div>
        <div className=" py-2 px-5 row-start-2 flex items-center gap-5 row-end-4  col-[1/-1]">
          <div className=" group z-20 relative overflow-hidden bg-slate-200 h-full aspect-square border-4 border-white dark:border-slate-800 rounded-full">
            {user.picturePath ? (
              <img src={`http://localhost:3001/${user.picturePath}`} alt="" />
            ) : (
              <FaUser className="text-2xl z-40 text-slate-600 dark:text-slate-400" />
            )}

            <form className=" absolute  top-0 left-full group-hover:left-0 duration-100 w-full h-full bg-black opacity-70">
              <input
                type="file"
                className=" hidden"
                accept="image/png, image/jpeg"
                name="pic"
                id="pic"
              />
              <label
                htmlFor="pic"
                className=" h-full w-full cursor-pointer flex justify-center items-center text-2xl text-white"
              >
                <MdAddAPhoto />
              </label>
            </form>
          </div>
          <h3 className=" mb-10 z-20 text-lg font-semibold dark:text-white uppercase">
            {user?.firstName} {user?.lastName}
          </h3>
        </div>
        <div className="bg-white dark:bg-slate-800 row-start-3 row-end-5 col-[1/-1]  relative ">
          <nav className="z-10 absolute top-0 left-0 flex items-center justify-center h-full right-0">
            <ul className=" flex gap-4 font-medium  text-slate-500 dark:text-slate-300">
              <li
                className={` ${
                  pathName == "/profil" &&
                  "text-blue-700 border-b-2 border-blue-700"
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href="/profil">Posts</Link>
              </li>
              <li
                className={` ${
                  pathName == "/profil/apropos" &&
                  "text-blue-700 border-b-2 border-blue-700"
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href="/profil/apropos">A propos</Link>
              </li>
              <li
                className={` ${
                  pathName == "/profil/follower" &&
                  "text-blue-700 border-b-2 border-blue-700"
                } cursor-pointer px-2 pb-1 hidden sm:inline-block `}
              >
                <Link href="/profil/follower">Follower</Link>
              </li>
              <li
                className={` ${
                  pathName == "/profil/following" &&
                  "text-blue-700 border-b-2 border-blue-700"
                } cursor-pointer px-2 pb-1 hidden sm:inline-block `}
              >
                <Link href="/profil/following">Following</Link>
              </li>
              <li className=" sm:hidden flex items-center text-xl bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer hover:bg-slate-200 px-3 rounded-md">
                <BiDotsHorizontalRounded />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ProfileLayout;
