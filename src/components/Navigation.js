import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo.png';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul className='navigation__ul'>
        <li>
          <Link to='/' style={{ marginRight: 10 }}>
            <img src={logo} width='50' height='50' alt='logo' />
          </Link>
        </li>

        <li>
          <Link
            to='/profile'
            style={{
              display: 'flex',
              alignsItems: 'center',
              fontSize: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={faUser} color={'#92A3FD'} size='2x' />
              <span className='navigation__profile'>
                {userObj.displayName
                  ? `${userObj.displayName}의 Profile`
                  : 'Profile'}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
