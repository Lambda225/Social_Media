'use client';
import cookie from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../pages/api/axios';
import AddPostForm from '@/components/AddPostForm';
import { GoHome, GoLocation } from 'react-icons/go';
import { BiTimeFive } from 'react-icons/bi';
import Post from '@/components/Post';
import { FiHome } from 'react-icons/fi';
import { format } from 'timeago.js';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import ProfileLayout from './layout';
import CurrentUserContext from '@/hook/currentUserProvider';

function Profile() {
  const { user, setUser, users, setUsers } = useContext(CurrentUserContext);
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/post/${cookie.get('userId')}`, {
        headers: { Authorization: cookie.get('token') },
      })
      .then((res) => {
        setPosts(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className='grid grid-cols-4 p-10 gap-10'>
        <div className=' text-slate-700 dark:text-slate-300'>
          <div className=' p-5 bg-white dark:bg-slate-800 rounded-xl'>
            <div className=' flex justify-between text-slate-500 dark:text-slate-300'>
              <h3 className='  font-bold mb-5'>Information</h3>
              <span className=' text-lg cursor-pointer'>
                <BsThreeDots />
              </span>
            </div>
            <div className='flex flex-col gap-y-3'>
              <div className=' flex items-center gap-2'>
                <span className='text-lg'>
                  <FiHome />
                </span>
                <p className='text-sm'>Home</p>
              </div>
              <div className=' flex items-center gap-2'>
                <span className='text-lg'>
                  <GoLocation />
                </span>
                <p className='text-sm'>Location</p>
              </div>
              <div className=' flex items-center gap-2'>
                <span className='text-lg'>
                  <AiOutlineHeart />
                </span>
                <p className='text-sm'>Celibataire</p>
              </div>
              <div className=' flex items-center gap-2'>
                <span className='text-lg'>
                  <BiTimeFive />
                </span>
                <p className='text-sm'>
                  Membre depuis {format(user?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=' col-span-2'>
          <AddPostForm setPosts={setPosts} posts={posts} />

          {posts
            ?.filter((item) => item.UserId == user.id)
            .map((post) => {
              return (
                <Post
                  setUsers={setUsers}
                  setCurrentUser={setUser}
                  key={post.id}
                  setPosts={setPosts}
                  posts={posts}
                  post={post}
                  users={users}
                />
              );
            })}
          <div className=' h-96'></div>
        </div>

        <div className=''>
          <div className=' bg-white dark:bg-slate-800 p-5 rounded-xl'>
            <h3 className=' text-slate-500 dark:text-slate-300 mb-4 text-sm font-bold'>
              Photos
            </h3>
            <div className=' h-80 grid grid-cols-2 rounded-lg overflow-hidden grid-rows-2 gap-2'>
              {posts
                ?.filter((item) => item.ImgPath)
                .slice(0, 5)
                .map((post) => {
                  return (
                    <img
                      key={post?.id}
                      className=' w-full h-full object-cover'
                      src={`http://localhost:3001/${post.ImgPath}`}
                      alt='post'
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
