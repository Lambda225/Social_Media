import React, { useContext } from "react";
import cookie from "js-cookie";
import { AiOutlineUserDelete, AiOutlineUserAdd } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import axios from "@/pages/api/axios";
import CurrentUserContext from "@/hook/currentUserProvider";

function SuggestedComponent({ user }) {
  const { setUser, users, setUsers } = useContext(CurrentUserContext);
  const handleFollow = (e) => {
    axios
      .put(
        `/user/${cookie.get("userId")}/${user.id}`,
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(
          users.map((item) => {
            if (item.id == cookie.get("userId")) {
              return { ...item, following: res.data.following };
            } else if (item.id == user.id) {
              return { ...item, follower: res.data.follower };
            } else {
              return item;
            }
          })
        );
        setUser({
          ...users.find((user) => user.id == cookie.get("userId")),
          following: res.data.following,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className=" flex items-center justify-between cursor-pointer">
        <div className=" flex items-center">
          <div className=" rounded-full h-12 w-12 flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-slate-700">
            {!user?.picturePath ? (
              <FaUser className="text-lg text-slate-600 dark:text-slate-400" />
            ) : (
              <img
                src={`http://localhost:3001/${user.picturePath}`}
                alt="user"
              />
            )}
          </div>
          <div className=" ml-4 text-sm">
            <h3 className=" text-xs font-bold mb-1 capitalize dark:text-white">
              {user?.firstName} {user?.lastName.split(" ")[0]}
            </h3>
          </div>
        </div>
        <div
          onClick={handleFollow}
          className={` ${
            user?.id == cookie.get("userId") ? "hidden" : "block"
          } text-lg dark:text-white cursor-pointer`}
        >
          {user?.follower?.includes(cookie.get("userId")) ? (
            <AiOutlineUserDelete />
          ) : (
            <AiOutlineUserAdd />
          )}
        </div>
      </div>
    </div>
  );
}

export default SuggestedComponent;
