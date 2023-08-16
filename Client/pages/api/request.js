import cookie from 'js-cookie';
import axios from './axios';
import { useContext } from 'react';
import CurrentUserContext from '@/hook/currentUserProvider';

export const login = (bodyData, router, setUser) => {
  axios
    .post('/auth/login', bodyData)
    .then((res) => {
      cookie.set('token', res.data.token);
      cookie.set('userId', res.data.user.id);
      axios
        .get(`/auth/user/${res.data.user.id}`, {
          headers: { Authorization: res.data.token },
        })
        .then((res) => {
          setUser(res.data.user);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const register = (bodyData, router) => {
  axios
    .post('/auth', bodyData)
    .then((res) => {
      console.log(res.data);
      router.push('/login');
    })
    .catch((err) => {
      console.log(err.response);
    });
};
