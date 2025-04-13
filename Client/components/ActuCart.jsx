import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { format } from "timeago.js";
import PopPost from "./PopPost";
import axios from "@/pages/api/axios";
import { FaUser } from "react-icons/fa";

function ActuCart({ users, setPosts, post, posts, setCurrentUser, setUsers }) {
  const user = users.find((user) => user.id === post.UserId);
  const [comments, setComments] = useState([]);
  const [nbrLike, setNbrLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [popVisible, setPopVisible] = useState(false);

  const handleLike = (e) => {
    axios
      .post(
        `/like/${cookie.get("userId")}`,
        { postId: post.id },
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setPosts(
          posts.map((item) => {
            if (item.id == post.id) {
              return { ...item, Like: res.data };
            } else {
              return item;
            }
          })
        );
        setNbrLike(!isLike ? nbrLike + 1 : nbrLike - 1);
        setIsLike(!isLike);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/comment/${cookie.get("userId")}/${post.id}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        className=" flex items-center justify-between cursor-pointer"
        onClick={(e) => {
          setPopVisible(true);
        }}
      >
        <div className=" flex items-center">
          <div className=" overflow-hidden rounded-full h-12 w-12 flex justify-center items-center dark:bg-slate-700 bg-slate-200">
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
            <h3 className=" text-xs font-bold mb-1 capitalize">
              {user?.firstName} {user?.lastName.split(" ")[0]}
            </h3>
            <p className=" text-xs">
              {post.ImgPath ? "Photo" : "Text"}{" "}
              <span className=" ml-1">{format(post?.createdAt)}</span>
            </p>
          </div>
        </div>
        {post.ImgPath && (
          <div className=" bg-slate-400 h-12 aspect-square overflow-hidden rounded-lg">
            {" "}
            <img
              className=" w-full h-full  object-cover"
              src={`http://localhost:3001/${post.ImgPath}`}
              alt="post"
            />{" "}
          </div>
        )}
      </div>
      <PopPost
        setCurrentUser={setCurrentUser}
        setUsers={setCurrentUser}
        users={users}
        user={user}
        post={post}
        comments={comments}
        popVisible={popVisible}
        setPopVisible={setPopVisible}
        handleLike={handleLike}
      />
    </div>
  );
}

export default ActuCart;
