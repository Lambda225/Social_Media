'use client';
import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io';
import { login } from '../../pages/api/request';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CurrentUserContext from '@/hook/currentUserProvider';

function Login() {
  const [bodyData, setBodyData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(CurrentUserContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBodyData({ ...bodyData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(bodyData));
    setSubmit(true);
  };

  const valide = (value) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!value.email) {
      error.email = 'Veillez remplie ce champ';
    } else if (!regex.test(value.email)) {
      error.email = 'Format de mail incorrecte ';
    }
    if (!value.password) {
      error.password = 'Veillez remplie ce champ';
    }
    return error;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      login(bodyData, router, setUser);
    }
  }, [formErrors]);

  return (
    <div className=' flex justify-center h-screen bg-slate-50 items-center'>
      <div className=' p-12 bg-white shadow-xl rounded-md'>
        <h1 className='text-2xl font-bold'>Se connecter</h1>
        <form className='mt-5 w-80' onSubmit={(e) => handleSubmit(e)}>
          <div className=' mb-4 flex flex-col '>
            <label htmlFor='email' className=' text-xs mb-2'>
              Email
            </label>
            <input
              onChange={handleInput}
              type='text'
              value={bodyData.email}
              className={` text-slate-500 border py-2 px-2 rounded-sm ${
                formErrors.email
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='email'
              id='email'
            />
          </div>
          <div className=' flex mb-4 flex-col'>
            <label htmlFor='password' className=' text-xs mb-2'>
              Password
            </label>
            <input
              value={bodyData.password}
              onChange={handleInput}
              type='password'
              className={`border py-2 px-2 rounded-sm text-slate-500  ${
                formErrors.password
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='password'
              id='password'
            />
          </div>
          <button className=' rounded-sm hover:shadow-md hover:bg-blue-900 focus:outline-blue-900 bg-blue-800 text-white w-full py-3 text-sm'>
            Envoyer
          </button>
        </form>
        <div className='text-center mt-3 text-sm '>Ou</div>
        <div className='flex justify-between mt-3'>
          <a
            target='_blank'
            href='http://localhost:3001/auth/google'
            type='button'
            className=' flex items-center gap-2 shadow-lg rounded-md px-5 py-2 border border-blue-800'
          >
            <FcGoogle className='text-xl' />
            <span className=' text-sm'>Google</span>
          </a>

          <a
            href='/'
            className=' flex items-center gap-2 rounded-md px-5 py-2 shadow-lg border border-blue-800'
          >
            <IoLogoFacebook className='text-2xl text-blue-800' />
            <span className=' text-sm'>Facebook</span>
          </a>
        </div>
        <div className='text-sm mt-5 text-center'>
          Voulez vous vous{' '}
          <Link
            href='/register'
            className='text-blue-800 underline decoration-1'
          >
            Inscript
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
