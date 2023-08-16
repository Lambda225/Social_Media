"use client";
import CartChat from "@/components/CartChat";
import NavBar from "@/components/NavBar";
import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  BiSolidContact,
  BiSolidCommentDetail,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Message from "@/components/Message";
import axios from "@/pages/api/axios";
import cookie from "js-cookie";
import ChatContext from "@/hook/chatProvider";
import CurrentUserContext from "@/hook/currentUserProvider";
import CartContact from "@/components/CartContact";

function Chat() {
  const { chatSelect, setChatSelect } = useContext(ChatContext);
  const { user, users } = useContext(CurrentUserContext);
  const [showContact, setShowContact] = useState(false);
  const { dark } = useContext(CurrentUserContext);
  const [formValue, setFormValue] = useState({ content: "" });
  const [submit, setSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showEmoji, setShowEmoji] = useState(false);
  const [chats, setChats] = useState([]);
  const [userSelect, setUserSelect] = useState({});
  const [message, setMessage] = useState([]);

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

  const valide = (value) => {
    let err = {};
    if (!value.content) {
      err.content = "Veillez remplir ce champ";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(formValue));
    setSubmit(true);
  };

  useEffect(() => {
    axios
      .get(`/chat/${cookie.get("userId")}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then(({ data }) => {
        setChats(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(chatSelect).length != 0) {
      axios
        .get(`/user/chat/${cookie.get("userId")}/${chatSelect.id}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then(({ data }) => {
          setUserSelect(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`/message/${cookie.get("userId")}/${chatSelect.id}`, {
          headers: { Authorization: cookie.get("token") },
        })
        .then(({ data }) => {
          setMessage(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chatSelect]);

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      axios
        .post(`/message/${cookie.get("userId")}/${chatSelect.id}`, formValue, {
          headers: { Authorization: cookie.get("token") },
        })
        .then((res) => {
          res.data.UserId = cookie.get("userId");
          setMessage([...message, res.data]);
          setFormValue({ content: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);

  return (
    <div className=" flex flex-col h-screen">
      <NavBar />
      <div className=" flex h-full p-5 overflow-hidden bg-slate-100 dark:bg-slate-900 ">
        <div className=" w-2/6 h-full flex flex-col px-5 pb-3">
          <h1 className=" text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Chats
          </h1>
          <ul className=" uppercase text-slate-500 flex text-xs gap-5 mt-5 mb-3">
            <li
              onClick={(e) => setShowContact(false)}
              className={`${
                !showContact && "text-blue-500 "
              } flex gap-1 items-center cursor-pointer`}
            >
              <span className=" text-lg">
                <BiSolidCommentDetail />
              </span>
              Discution
            </li>
            <li
              onClick={(e) => setShowContact(true)}
              className={`${
                showContact && "text-blue-500 "
              } flex gap-1 items-center cursor-pointer`}
            >
              <span className=" text-lg">
                <BiSolidContact />
              </span>
              Repectoire
            </li>
          </ul>
          <form className=" flex items-center mx-1 mt-2 p-2 rounded-full bg-white dark:bg-slate-700">
            <input
              type="text"
              placeholder="Recherchez"
              className=" focus:outline-none w-full px-2 text-slate-500 dark:text-slate-300 bg-transparent"
            />
            <button className=" text-lg text-slate-600 dark:text-slate-400 mr-3">
              <FiSearch />
            </button>
          </form>
          <div className=" h-full py-1 flex flex-col gap-3 overflow-y-scroll mt-5">
            {!showContact
              ? chats.map((item) => {
                  return <CartChat key={item.id} chat={item} />;
                })
              : user?.follower?.map((id) => {
                  return <CartContact key={id} id={id} users={users} />;
                })}
          </div>
        </div>

        {Object.keys(chatSelect).length == 0 ? (
          <div className="bg-white rounded-xl dark:bg-slate-700 w-full flex justify-center items-center text-2xl dark:text-white ">
            Selectionnez Une Discution
          </div>
        ) : (
          <div className=" bg-white rounded-xl dark:bg-slate-700 w-full flex flex-col overflow-hidden">
            <div className="flex justify-between px-5 py-3 shadow dark:shadow-slate-400 items-center">
              <div className=" flex items-center gap-3">
                <div className=" h-12  aspect-square rounded-full bg-slate-400"></div>
                <h2 className=" font-bold capitalize text-sm dark:text-white">
                  {userSelect?.firstName} {userSelect?.lastName?.split(" ")[0]}
                </h2>
              </div>
              <span className=" text-xl cursor-pointer dark:text-white">
                <BiDotsHorizontalRounded />
              </span>
            </div>
            <div className=" h-full flex flex-col gap-2 overflow-y-scroll p-5">
              {message.map((item) => {
                return <Message key={item.id} message={item} />;
              })}
            </div>

            <form
              onSubmit={handleSubmit}
              className=" relative w-full max-h-32 border-t dark:border-slate-500 flex items-center p-2 gap-3"
            >
              <div className=" bg-slate-100 dark:bg-slate-900 w-full items-center px-3 flex rounded-full">
                <span className=" text-lg cursor-pointer rotate-45 text-slate-500">
                  <MdOutlineAttachFile />
                </span>

                <textarea
                  type="text"
                  rows="1"
                  name="content"
                  onChange={handleChange}
                  value={formValue.content}
                  className=" resize-none h-fit p-3 bg-transparent text-slate-400 focus:outline-none w-full"
                  placeholder="Message"
                ></textarea>
                <span
                  onClick={(e) => setShowEmoji(!showEmoji)}
                  className=" text-xl dark:text-slate-500 cursor-pointer text-slate-700"
                >
                  <BsEmojiSmile />
                </span>
                <div
                  className={`${
                    !showEmoji && "hidden"
                  } absolute bottom-full right-16`}
                >
                  <Picker
                    data={data}
                    emojiSize={20}
                    theme={dark}
                    emojiButtonSize={30}
                    onEmojiSelect={addEmoji}
                  />
                </div>
              </div>
              <button className=" h-10 aspect-square rounded-full -rotate-45 flex justify-center items-center bg-blue-600 text-white">
                <RiSendPlane2Fill />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
