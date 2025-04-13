import React from 'react';
import '@/styles/globals.css';
import { CurrentUserProvider } from '@/hook/currentUserProvider';

function layout({ children }) {
  return (
    <html lang='fr'>
      <head>
        <title>Social Media</title>
      </head>
      <body className=''>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </body>
    </html>
  );
}

export default layout;
