import React from "react";
import cookie from "js-cookie";

function Message({ message }) {
  if (message.UserId == cookie.get("userId")) {
    return (
      <div className=" flex justify-end">
        <div
          dangerouslySetInnerHTML={{
            __html: message?.content.replace(/(\r\n|\n|\r)/g, "<br />"),
          }}
          className="bg-blue-600 p-3 rounded-lg max-w-[35%] w-fit text-white"
        ></div>
      </div>
    );
  } else {
    return (
      <div className=" flex">
        <div
          dangerouslySetInnerHTML={{
            __html: message?.content.replace(/(\r\n|\n|\r)/g, "<br />"),
          }}
          className="dark:bg-slate-600 bg-slate-100 p-3 rounded-lg max-w-[35%] w-fit dark:text-white"
        ></div>
      </div>
    );
  }
}

export default Message;
