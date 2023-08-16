'use client';
import NavBar from '@/components/NavBar';
import CurrentUserContext from '@/hook/currentUserProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

function ProfileLayout({ children }) {
  const { user, dark } = useContext(CurrentUserContext);
  const pathName = usePathname();

  useEffect(() => {
    if (dark == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className='bg-slate-100 dark:bg-slate-900 min-h-screen'>
      <NavBar user={user} />
      <div className=' h-72 bg-slate-200 dark:bg-slate-900 shadow-md grid grid-rows-[1fr,7rem,4rem] grid-cols-1'>
        <div className=' row-start-1 row-end-3  col-[1/-1]'>
          {dark === 'dark' ? (
            <img
              src='./vue.jpg'
              alt='profil'
              className=' blur-sm object-cover w-full h-full'
            />
          ) : (
            <img
              src='ligth.jpg'
              alt='./profil'
              className=' blur-sm object-cover w-full h-full'
            />
          )}
        </div>
        <div className=' py-2 px-5 row-start-2 flex items-center gap-5 row-end-4  col-[1/-1] z-10'>
          <div className=' bg-slate-500 h-full aspect-square border-4 border-white dark:border-slate-800 rounded-full'></div>
          <h3 className=' mb-10 text-lg font-semibold dark:text-white uppercase'>
            {user?.firstName} {user?.lastName}
          </h3>
        </div>
        <div className='bg-white dark:bg-slate-800 row-start-3 row-end-5 col-[1/-1]  relative '>
          <nav className=' absolute top-0 left-0 flex items-center justify-center h-full right-0 z-20'>
            <ul className=' flex gap-4 font-medium  text-slate-500 dark:text-slate-300'>
              <li
                className={` ${
                  pathName == '/profil' &&
                  'text-blue-700 border-b-2 border-blue-700'
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href='/profil'>Posts</Link>
              </li>
              <li
                className={` ${
                  pathName == '/profil/apropos' &&
                  'text-blue-700 border-b-2 border-blue-700'
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href='/profil/apropos'>A propos</Link>
              </li>
              <li
                className={` ${
                  pathName == '/profil/follower' &&
                  'text-blue-700 border-b-2 border-blue-700'
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href='/profil/follower'>Follower</Link>
              </li>
              <li
                className={` ${
                  pathName == '/profil/following' &&
                  'text-blue-700 border-b-2 border-blue-700'
                } cursor-pointer px-2 pb-1 `}
              >
                <Link href='/profil/following'>Following</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ProfileLayout;
