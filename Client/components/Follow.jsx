import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

function Follow({ id, users }) {
  const user = users.find((user) => user.id == id);
  return (
    <div className=" flex justify-between items-center p-5 rounded-xl border">
      <div className="flex gap-2 items-center">
        <div className=" h-14 w-14 flex justify-center items-center overflow-hidden rounded-full dark:bg-slate-600 bg-slate-200">
          {user.picturePath ? (
            <img src={`http://localhost:3001/${user.picturePath}`} alt="" />
          ) : (
            <FaUser className="text-lg text-slate-600 dark:text-slate-400" />
          )}
        </div>
        <div>
          <h3 className=" mb-1 text-sm font-bold">
            {user?.firstName} {user?.lastName?.split(" ")[0]}
          </h3>
          <div className="flex gap-3 text-slate-400">
            <p className=" text-xs">
              {!user?.follower?.join() ? 0 : user?.follower?.length} Follower
            </p>
            <p className=" text-xs">
              {!user?.following?.join() ? 0 : user?.following?.length} Following
            </p>
          </div>
        </div>
      </div>
      <span>
        <AiOutlineUserDelete />
      </span>
    </div>
  );
}

export default Follow;
