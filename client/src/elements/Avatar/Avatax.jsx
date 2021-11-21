/* eslint-disable react/prop-types */
import './Avatar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Avatar = ({ user }) => {

  return (
    <NavLink to='my-profile' className='avatar-nav-link'>
      <div className='avatar-box'>
        <h5 className='avatar-username'>{user.username}</h5>
        {user.avatar &&
          <img src={`http://localhost:5000/${user.avatar}`} alt={user.username} className='avatar-image' />}
      </div>
    </NavLink>
  );
};

export default Avatar;
