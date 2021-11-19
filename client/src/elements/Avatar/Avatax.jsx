/* eslint-disable react/prop-types */
import './Avatar.css';
import React from 'react';

const Avatar = ({ user }) => {

  return (
    <div className='avatarBox'>
      {user.avatar &&
        <img src={`http://localhost:5000/${user.avatar}`} alt={user.username} className='avatarImage' />}
      {/* <h3 style={{ color: 'white', margin: '0px' }}>Avatar</h3> */}
    </div>
  );
};

export default Avatar;
