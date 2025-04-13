import React from 'react';
import { format } from 'timeago.js';

function CommentCart({ comment }) {
  return (
    <div className=' relative'>
      <div className='absolute -bottom-3 flex items-center gap-x-2'>
        <div className='  h-5 w-5 bg-slate-400 rounded-full'></div>
        <p className=' text-xs text-slate-700 dark:text-slate-300 '>
          {format(comment.createdAt)}
        </p>
      </div>
      <div className=' bg-slate-100 dark:bg-slate-600 p-3 rounded-xl w-fit'>
        {comment.content}
      </div>
    </div>
  );
}

export default CommentCart;
