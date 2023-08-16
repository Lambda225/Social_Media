import React, { useContext, useEffect, useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';
import axios from '../pages/api/axios';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaImages, FaUser } from 'react-icons/fa';
import CurrentUserContext from '@/hook/currentUserProvider';

function AddPostForm({ setPosts, posts }) {
  const { user, dark } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({ Description: '', postImage: '' });
  const [showEmoji, setShowEmoji] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  const addEmoji = (e) => {
    const sym = e.unified.split('_');
    const codeArray = [];
    sym.forEach((el) => {
      codeArray.push('0x' + el);
      let emoji = String.fromCodePoint(...codeArray);
      setFormData({ ...formData, Description: formData.Description + emoji });
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name + '' === 'postImage') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(valide(formData));
    setSubmit(true);
  };

  const valide = (value) => {
    const error = {};
    if (!value.Description && !value.postImage) {
      error.Description = 'Veillez remplie un de ses champ';
      error.postImage = 'Veillez remplie un de ses champ';
    }

    return error;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && submit) {
      let formValue = new FormData();
      formValue.append('postImage', formData.postImage);
      formValue.append('Description', formData.Description);

      axios
        .post(`/post/${cookie.get('userId')}`, formValue, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: cookie.get('token'),
          },
        })
        .then((res) => {
          res.data.UserId = user.id;
          console.log(res.data);
          setPosts([res.data, ...posts]);
          setFormData({ Description: '', postImage: '' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);

  return (
    <div className=' bg-white dark:bg-slate-800 flex p-10 gap-x-4 w-full rounded-lg'>
      <div>
        <div className='h-12 flex justify-center items-center w-12 rounded-full bg-slate-200 dark:bg-slate-700'>
          {!user?.picturePath ? (
            <FaUser className='text-lg text-slate-600 dark:text-slate-400' />
          ) : (
            <img src={user.picturePath} alt='user' />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className=' w-full'>
        <div>
          <div className=' relative'>
            <div className=' flex items-center gap-2 mb-4'>
              <textarea
                className=' bg-slate-100 dark:bg-slate-900  rounded-lg p-3 text-sm text-slate-600 focus:outline-blue-800 dark:focus:outline-blue-800 resize-none w-full'
                name='Description'
                value={formData.Description}
                onChange={handleInput}
                id=''
                rows='1'
                placeholder='Que voulez vous dire ?'
              ></textarea>
              <div
                onClick={(e) => setShowEmoji(!showEmoji)}
                className=' text-xl text-slate-500 cursor-pointer dark:text-slate-400'
              >
                <BsEmojiSmile />
              </div>
            </div>
            <div
              className={`${
                showEmoji ? 'block' : 'hidden'
              } absolute top-full right-0 z-20`}
            >
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={30}
                onEmojiSelect={addEmoji}
                locale={'fr'}
                theme={dark}
              />
            </div>
          </div>

          {formData.postImage && (
            <div className=' overflow-y-scroll h-28 rounded-lg mb-4'>
              <img
                src={URL.createObjectURL(formData.postImage)}
                className='w-full h-auto'
                alt='charger'
              />
            </div>
          )}

          <div className='flex justify-between'>
            <div>
              <input
                type='file'
                name='postImage'
                onChange={handleInput}
                className=' hidden'
                accept='image/png, image/jpeg'
                id='fiche'
                src=''
                alt=''
              />
              <label
                htmlFor='fiche'
                className=' bg-slate-100 dark:bg-slate-700 py-2 px-5 rounded-lg flex cursor-pointer items-center gap-2'
              >
                <FaImages className='text-green-500 text-lg' />
                <span className=' text-sm text-slate-400'>Image</span>
              </label>
            </div>
            <button className=' flex text-blue-800 items-center gap-x-2'>
              <span>
                <RiSendPlane2Fill className=' text-xl -rotate-12' />
              </span>
              <span>Publier</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPostForm;
