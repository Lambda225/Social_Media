'use client';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io';
import { login, register } from '../../pages/api/request';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Register() {
  const [bodyData, setBodyData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBodyData({ ...bodyData, [name]: value });
    setSubmit(true);
  };

  const valide = (value) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!value.firstName) {
      error.firstName = 'Veillez remplie ce champ';
    }
    if (!value.lastName) {
      error.lastName = 'Veillez remplie ce champ';
    }
    if (!value.email) {
      error.email = 'Veillez remplie ce champ';
    } else if (!regex.test(value.email)) {
      error.email = 'Format de mail incorrecte ';
    }
    if (!value.password) {
      error.password = 'Veillez remplie ce champ';
    }
    if (!value.confPassword) {
      error.confPassword = 'Veillez remplie ce champ';
    } else if (value.confPassword != value.password) {
      error.confPassword = 'Contenu différent du champ password';
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(bodyData));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      register(bodyData, router);
    }
  }, [formErrors]);

  return (
    <div className=' flex justify-center h-screen bg-slate-50 items-center'>
      <div className=' p-12 bg-white shadow-xl rounded-md'>
        <h1 className='text-2xl font-bold'>S'inscript</h1>
        <form className='mt-5 w-96' onSubmit={handleSubmit}>
          <div className=' mb-4 flex flex-col '>
            <label htmlFor='firstName' className=' text-xs mb-2'>
              First Name
            </label>
            <input
              value={bodyData.firstName}
              onChange={handleInput}
              type='text'
              className={` text-slate-500 border py-2 px-2 rounded-sm ${
                formErrors.firstName
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='firstName'
              id='firstName'
            />
          </div>
          <div className=' mb-4 flex flex-col '>
            <label htmlFor='lastName' className=' text-xs mb-2'>
              Last Name
            </label>
            <input
              value={bodyData.lastName}
              onChange={handleInput}
              type='text'
              className={` text-slate-500 border py-2 px-2 rounded-sm ${
                formErrors.lastName
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='lastName'
              id='lastName'
            />
          </div>
          <div className=' mb-4 flex flex-col '>
            <label htmlFor='email' className=' text-xs mb-2'>
              Email
            </label>
            <input
              value={bodyData.email}
              onChange={handleInput}
              type='text'
              className={` text-slate-500 border py-2 px-2 rounded-sm  ${
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
              className={` text-slate-500 border py-2 px-2 rounded-sm ${
                formErrors.password
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='password'
              id='password'
            />
          </div>
          <div className=' flex mb-4 flex-col'>
            <label htmlFor='confPassword' className=' text-xs mb-2'>
              Confirme password
            </label>
            <input
              value={bodyData.confPassword}
              onChange={handleInput}
              type='password'
              className={` text-slate-500 border py-2 px-2 rounded-sm ${
                formErrors.confPassword
                  ? 'border-2 border-red-500'
                  : 'border-slate-700'
              } focus:outline-blue-700`}
              name='confPassword'
              id='confPassword'
            />
          </div>
          <button className=' rounded-sm hover:shadow-md hover:bg-blue-900 focus:outline-blue-900 bg-blue-800 text-white w-full py-3 text-sm'>
            Envoyer
          </button>
        </form>
        <div className='text-center mt-3 text-sm'>Ou</div>

        <div className='text-sm text-center'>
          Voulez vous vous{' '}
          <Link href='/login' className='text-blue-800 underline decoration-1'>
            Connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
