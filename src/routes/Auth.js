import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { authService, firebaseInstance } from '../fbase';
import AuthForm from '../components/AuthForm';
import logo from '../assets/logo.png';

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider); //eslint-disable-line no-unused-vars
  };

  return (
    <div className='authContainer'>
      <img
        src={logo}
        width='50'
        height='50'
        alt='logo'
        style={{ marginBottom: 20 }}
      />
      <AuthForm />
      <div className='authBtns'>
        <button onClick={onSocialClick} name='google' className='authBtn'>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name='github' className='authBtn'>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
