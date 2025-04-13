import { useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";
import { format } from "timeago.js";
import CommentCart from "./CommentCart";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "@/pages/api/axios";
import CurrentUserContext from "@/hook/currentUserProvider";

function PopPost({
  setCurrentUser,
  setUsers,
  users,
  user,
  popVisible,
  setPopVisible,
  post,
  comments,
  handleLike,
  setComments,
}) {
  const [formValue, setFormValue] = useState({ content: "" });
  const [submit, setSubmit] = useState(false);
  const { dark } = useContext(CurrentUserContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const current = useContext(CurrentUserContext);

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => {
      codeArray.push("0x" + el);
      let emoji = String.fromCodePoint(...codeArray);
      setFormValue({ ...formValue, content: formValue.content + emoji });
    });
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
    <div
      className={`${
        popVisible ? "block" : "hidden"
      } top-0 flex justify-center items-center left-0 fixed z-20 h-screen w-screen bg-opacity-40 bg-black`}
    >
      <div className=" w-11/12 sm:w-3/5 lg:w-3/6 bg-white dark:bg-slate-800 dark:text-white max-h-[75vh] rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b dark:border-slate-900 flex">
          <h1 className=" text-xl font-semibold text-center w-full">
            Publication
          </h1>
          <div
            className="text-xl cursor-pointer"
            onClick={(e) => setPopVisible(false)}
          >
            <IoMdClose />
          </div>
        </div>

        <div className=" h-full p-5 overflow-y-scroll">
          <div className=" flex items-center justify-between">
            <div className=" flex gap-x-3">
              <div className="h-12 w-12 overflow-hidden rounded-full flex justify-center items-center dark:bg-slate-700 bg-slate-200">
                {user?.picturePath ? (
                  <img
                    src={`http://localhost:3001/${user.picturePath}`}
                    alt=""
                  />
                ) : (
                  <FaUser className="text-xl dark:text-slate-400 text-slate-600" />
                )}
              </div>
              <div className="">
                <h3 className=" font-bold capitalize">
                  {user?.firstName} {user?.lastName?.split(" ")[0]}
                </h3>
                <p className=" text-xs text-slate-400">
                  {format(post?.createdAt)}
                </p>
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

          <p className="text-sm mt-4 font-medium">{post?.Description}</p>
          {post.ImgPath && (
            <div className=" bg-slate-400 overflow-hidden mt-3 rounded-xl">
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
                    {!post.Like?.join() ? 0 : post.Like.length}
                  </span>
                </span>
              ) : (
                <span
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={handleLike}
                >
                  <AiOutlineHeart className=" text-xl" />
                  <span className="text-xs">
                    {!post.Like?.join() ? 0 : post.Like.length}
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <AiOutlineMessage className="text-xl" />
              <span className="text-xs">{comments.length}</span>
            </div>
          </div>

          {comments[0] && (
            <div className=" mt-5 mb-7">
              <h3 className=" underline underline-offset-2 mb-2 text-sm font-medium cursor-pointer">
                Commentaires
              </h3>
              <div className="flex flex-col gap-y-5 pl-5 mb-5">
                {comments.map((comment) => {
                  return <CommentCart key={comment.id} comment={comment} />;
                })}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className=" p-4 flex items-center w-full gap-x-4"
        >
          <div>
            <div className=" overflow-hidden flex justify-center items-center h-10 w-10 rounded-full dark:bg-slate-700 bg-slate-200">
              {!current.user?.picturePath ? (
                <FaUser className="text-sm text-slate-600 dark:text-slate-400" />
              ) : (
                <img
                  src={`http://localhost:3001/${current.user.picturePath}`}
                  alt="user"
                />
              )}
            </div>
          </div>
          <div className=" relative flex w-full items-center gap-4">
            <textarea
              name="content"
              value={formValue.content}
              onChange={handleChange}
              placeholder="Entez votre commentaire"
              id=""
              className=" bg-slate-100 dark:bg-slate-900 rounded-lg p-3 text-sm text-slate-600 focus:outline-blue-800 resize-none w-full"
              rows="1"
            ></textarea>
            <div
              onClick={(e) => setShowEmoji(!showEmoji)}
              className=" text-xl dark:text-slate-400 text-slate-500 cursor-pointer"
            >
              <BsEmojiSmile />
            </div>
            <div
              className={`${
                showEmoji ? "block" : "hidden"
              } absolute bottom-full right-10 z-20`}
            >
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={30}
                theme={dark}
                onEmojiSelect={addEmoji}
              />
            </div>
            <button>
              <RiSendPlane2Fill className=" text-2xl text-blue-600 -rotate-12 " />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopPost;
