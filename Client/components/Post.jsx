import React, { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import { FaUser } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { format } from "timeago.js";
import axios from "@/pages/api/axios";
import CommentCart from "./CommentCart";
import PopPost from "./PopPost";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import CurrentUserContext from "@/hook/currentUserProvider";

export default function Post({
  post,
  setUsers,
  setCurrentUser,
  setPosts,
  posts,
  users,
}) {
  const user = users.find((user) => user.id === post.UserId);
  const [formValue, setFormValue] = useState({ content: "" });
  const currentUser = useContext(CurrentUserContext);
  const [popVisible, setPopVisible] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [comments, setComments] = useState([]);

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => {
      codeArray.push("0x" + el);
      let emoji = String.fromCodePoint(...codeArray);
      setFormValue({ ...formValue, content: formValue.content + emoji });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(formValue));
    setSubmit(true);
  };

  const valide = (value) => {
    let err = {};
    if (!value.content) {
      err.content = "Veillez remplir ce champ";
    }
    return err;
  };

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
        setCurrentUser({
          ...users.find((user) => user.id == cookie.get("userId")),
          following: res.data.following,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setPosts(
          posts.map((item) => {
            if (item.id == post.id) {
              return { ...item, Like: res.data };
            } else {
              return item;
            }
          })
        );
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

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      axios
        .post(`/comment/${cookie.get("userId")}/${post.id}`, formValue, {
          headers: { Authorization: cookie.get("token") },
        })
        .then((res) => {
          setComments([...comments, res.data]);
          setFormValue({ content: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);

  return (
    <div className=" bg-white dark:bg-slate-800 dark:text-white p-5 sm:p-10 rounded-lg">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-x-3">
          <div className="h-12 w-12 overflow-hidden rounded-full flex justify-center items-center dark:bg-slate-700 bg-slate-200">
            {!user?.picturePath ? (
              <FaUser className="text-xl text-slate-600 dark:text-slate-400" />
            ) : (
              <img
                src={`http://localhost:3001/${user.picturePath}`}
                alt="user"
              />
            )}
          </div>
          <div className="">
            <h3 className=" font-bold text-sm capitalize">
              {user?.firstName} {user?.lastName?.split(" ")[0]}
            </h3>
            <p className=" text-xs text-slate-400">{format(post?.createdAt)}</p>
          </div>
        </div>
        <div
          onClick={handleFollow}
          className={` ${
            user?.id == cookie.get("userId") ? "hidden" : "block"
          } text-lg cursor-pointer`}
        >
          {user?.follower?.includes(cookie.get("userId")) ? (
            <AiOutlineUserDelete />
          ) : (
            <AiOutlineUserAdd />
          )}
        </div>
      </div>

      <p
        onClick={(e) => setPopVisible(true)}
        dangerouslySetInnerHTML={{
          __html: post?.Description.replace(/(\r\n|\n|\r)/g, "<br />"),
        }}
        className=" cursor-pointer text-sm mt-4 font-medium"
      ></p>
      {post.ImgPath && (
        <div
          onClick={(e) => setPopVisible(true)}
          className=" cursor-pointer bg-slate-400 overflow-hidden mt-3 rounded-xl"
        >
          {" "}
          <img
            className=" w-full h-auto"
            src={`http://localhost:3001/${post.ImgPath}`}
            alt="post"
          />{" "}
        </div>
      )}
      <div className="my-3 flex gap-x-4">
        <div>
          {post?.Like?.includes(cookie.get("userId")) ? (
            <span
              onClick={handleLike}
              className="flex items-center gap-1 cursor-pointer"
            >
              <AiFillHeart className=" text-xl text-red-600" />
              <span className="text-xs">
                {!post?.Like?.join() ? 0 : post.Like.length}
              </span>
            </span>
          ) : (
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLike}
            >
              <AiOutlineHeart className=" text-xl" />
              <span className="text-xs">
                {!post?.Like?.join() ? 0 : post.Like.length}
              </span>
            </span>
          )}
        </div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={(e) => setPopVisible(true)}
        >
          <AiOutlineMessage className="text-xl" />
          <span className="text-xs">{comments.length}</span>
        </div>
      </div>

      {comments[0] && (
        <div className=" mt-5 mb-7">
          <h3
            className=" mb-2 text-sm font-medium cursor-pointer underline underline-offset-2"
            onClick={(e) => setPopVisible(true)}
          >
            Voir plus de commentaires
          </h3>
          <div className="flex flex-col gap-y-5 pl-10 mb-5">
            {comments.slice(0, 2).map((comment) => {
              return <CommentCart key={comment.id} comment={comment} />;
            })}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className=" flex items-center w-full gap-x-4"
      >
        <div>
          <div className=" flex overflow-hidden justify-center items-center h-10 w-10 rounded-full dark:bg-slate-700 bg-slate-200">
            {!currentUser.user?.picturePath ? (
              <FaUser className="text-sm text-slate-600 dark:text-slate-400" />
            ) : (
              <img
                src={`http://localhost:3001/${currentUser.user.picturePath}`}
                alt="user"
              />
            )}
          </div>
        </div>
        <div className=" flex w-full items-center gap-4">
          <div className="relative w-full flex items-center gap-2">
            <textarea
              name="content"
              placeholder="Entrez un commentaire"
              value={formValue.content}
              onChange={handleChange}
              id=""
              className=" bg-slate-100 dark:bg-slate-900 rounded-lg p-3 text-sm text-slate-600 focus:outline-blue-800 resize-none w-full"
              rows="1"
            ></textarea>
            <div
              onClick={(e) => setShowEmoji(!showEmoji)}
              className=" text-xl text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              <BsEmojiSmile />
            </div>
            <div
              className={`${
                showEmoji ? "block" : "hidden"
              } absolute top-full right-0 z-20`}
            >
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={30}
                onEmojiSelect={addEmoji}
                theme={currentUser.dark}
              />
            </div>
          </div>

          <button>
            <RiSendPlane2Fill className=" text-2xl text-blue-800 -rotate-12 " />
          </button>
        </div>
      </form>
      <PopPost
        setCurrentUser={setCurrentUser}
        setUsers={setUsers}
        users={users}
        user={user}
        post={post}
        comments={comments}
        popVisible={popVisible}
        setPopVisible={setPopVisible}
        handleLike={handleLike}
        setComments={setComments}
      />
    </div>
  );
}
