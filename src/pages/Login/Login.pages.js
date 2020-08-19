import React from 'react';
import './Login.style.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((err) => alert(err));
  };
  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png'
          alt=''
        />
        <div className='login__text'>
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
