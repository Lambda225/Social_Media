'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2, FiHome } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { format } from 'timeago.js';
import cookie from 'js-cookie';
import axios from '@/pages/api/axios';

function Apropos() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`/auth/user/${cookie.get('userId')}`, {
        headers: { Authorization: cookie.get('token') },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=' px-[10%] py-10'>
      <div className=' p-5 bg-white dark:bg-slate-800 rounded-lg'>
        <div className=' flex justify-between text-slate-800 dark:text-slate-100'>
          <h3 className='  font-bold text-2xl mb-7'>A propos</h3>
          <span className=' text-lg flex justify-center items-center h-10 w-10 rounded-full text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 cursor-pointer'>
            <FiEdit2 />
          </span>
        </div>
        <div className='flex flex-col gap-y-3 pl-16'>
          <div className=' flex items-center gap-2'>
            <span className='text-xl text-slate-700 dark:text-slate-300 '>
              <FiHome />
            </span>
            <p className=' text-slate-400 dark:text-slate-400 '>Home</p>
          </div>
          <div className=' flex items-center gap-2'>
            <span className='text-xl text-slate-700 dark:text-slate-300 '>
              <GoLocation />
            </span>
            <p className=' text-slate-400 dark:text-slate-400'>Location</p>
          </div>
          <div className=' flex items-center gap-2'>
            <span className='text-xl text-slate-700 dark:text-slate-300 '>
              <AiOutlineHeart />
            </span>
            <p className=' text-slate-400 dark:text-slate-400'>Celibataire</p>
          </div>
          <div className=' flex items-center gap-2 text-slate-600'>
            <span className='text-xl text-slate-700 dark:text-slate-300 '>
              <BiTimeFive />
            </span>
            <p className=' text-slate-400 dark:text-slate-400'>
              Membre depuis {format(user?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apropos;
