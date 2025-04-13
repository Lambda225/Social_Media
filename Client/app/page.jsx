"use client";
import React, { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "../pages/api/axios";
import Post from "@/components/Post";
import AddPostForm from "@/components/AddPostForm";
import ActuCart from "@/components/ActuCart";
import SuggestedComponent from "@/components/SuggestedComponent";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import CurrentUserContext from "@/hook/currentUserProvider";

function Home() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user, dark, setUser, users, setUsers } =
    useContext(CurrentUserContext);

  useEffect(() => {
    axios
      .get(`/post/${cookie.get("userId")}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    if (dark == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className=" bg-slate-100 min-h-screen dark:bg-slate-900">
      <NavBar user={user} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 sm:p-10 gap-10">
        <div className=" hidden lg:block">
          <div className="bg-white sticky dark:bg-slate-800 dark:text-white top-28 left-0 p-5 rounded-lg">
            <div className="flex flex-col items-center rounded-xl">
              <div className=" h-16 w-16 flex justify-center items-center overflow-hidden rounded-full mb-3 bg-slate-200 dark:bg-slate-700">
                {!user.picturePath ? (
                  <FaUser className="text-2xl dark:text-slate-400 text-slate-600" />
                ) : (
                  <img
                    src={`http://localhost:3001/${user.picturePath}`}
                    alt="user"
                  />
                )}
              </div>
              <h3 className=" text-sm mb-1 text-center font-bold uppercase">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-xs text-center">{user?.email}</p>
            </div>
            <div className=" flex justify-center gap-x-4 mt-7">
              <div className="flex flex-col items-center">
                <p className=" font-bold">
                  {posts.filter((item) => item.UserId == user.id).length}
                </p>
                <h4 className=" text-sm text-slate-400 dark:text-slate-300">
                  Post
                </h4>
              </div>
              <div className="flex flex-col items-center">
                <p className=" font-bold">
                  {!user?.follower?.join() ? 0 : user?.follower?.length}
                </p>
                <h4 className=" text-sm text-slate-400 dark:text-slate-300">
                  Follower
                </h4>
              </div>
              <div className="flex flex-col items-center">
                <p className=" font-bold">
                  {!user?.following?.join() ? 0 : user?.following?.length}
                </p>
                <h4 className=" text-sm text-slate-400 dark:text-slate-300">
                  Following
                </h4>
              </div>
            </div>
            <Link href="/profil">
              <button className=" bg-blue-800 mt-7 py-3 text-white w-full rounded-md text-sm">
                Mon Profile
              </button>
            </Link>
          </div>
        </div>

        <div className=" col-span-2">
          <AddPostForm setPosts={setPosts} posts={posts} />
          <div className=" h-[1px] my-5 bg-slate-300 dark:bg-slate-600"></div>
          <div className="flex flex-col gap-10">
            {posts?.map((post) => {
              return (
                <Post
                  setUsers={setUsers}
                  setCurrentUser={setUser}
                  key={post.id}
                  setPosts={setPosts}
                  posts={posts}
                  post={post}
                  users={users}
                />
              );
            })}
          </div>

          <div className=" h-96"></div>
        </div>

        <div className="hidden md:block ">
          <div className=" sticky top-28">
            <div className=" min-h-[300px] p-5 mb-5 bg-white dark:bg-slate-800 dark:text-white rounded-xl">
              <div className="pb-8 flex justify-between items-center">
                <h2 className=" text-sm font-semibold">Actualliter</h2>
                <span className=" cursor-pointer text-xs font-medium dark:text-slate-500 text-slate-600">
                  Vous plus
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {posts.slice(0, 4).map((post) => {
                  return (
                    <ActuCart
                      setCurrentUser={setUser}
                      setUsers={setUsers}
                      key={post.id}
                      setPosts={setPosts}
                      posts={posts}
                      post={post}
                      users={users}
                    />
                  );
                })}
              </div>
            </div>

            <div className=" min-h-[300px] p-5 mb-5 bg-white dark:bg-slate-800 dark:text-white rounded-xl">
              <div className="pb-8 flex justify-between items-center">
                <h2 className=" text-sm font-semibold">Suggestion</h2>
                <span className=" cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-500">
                  Vous plus
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {users
                  .filter((item) => item.id != user.id)
                  .slice(0, 4)
                  .map((user) => {
                    return <SuggestedComponent key={user.id} user={user} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
