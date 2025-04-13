import React from "react";
import cookie from "js-cookie";
import { format } from "timeago.js";

function Message({ message }) {
  if (message.UserId == cookie.get("userId")) {
    return (
      <div className=" flex justify-end">
        <div className="bg-blue-600 p-3 rounded-lg max-w-[70%] md:max-w-[40%] w-fit text-white">
          <div
            dangerouslySetInnerHTML={{
              __html: message?.content.replace(/(\r\n|\n|\r)/g, "<br />"),
            }}
          ></div>
          <div className=" text-xs text-blue-300 text-end">
            {format(message.createdAt)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex">
        <div className="dark:bg-slate-600 bg-slate-100 p-3 rounded-lg max-w-[70%] md:max-w-[40%] w-fit dark:text-white">
          <div
            dangerouslySetInnerHTML={{
              __html: message?.content.replace(/(\r\n|\n|\r)/g, "<br />"),
            }}
          ></div>
          <div className=" text-xs text-slate-400">
            {format(message.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
