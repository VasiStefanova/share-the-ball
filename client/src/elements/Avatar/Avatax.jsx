/* eslint-disable react/prop-types */
import './Avatar.css';
import React from 'react';
import Image from 'react-bootstrap/Image';

const Avatar = ({ user, style }) => {

  return (
    <div className='avatar-box'>
      {user.avatar &&
        <Image roundedCircle src={`http://localhost:5000/${user.avatar}`} alt={user.username} className='avatar-image' style={style? style : null} />}
    </div>
  );
};

export default Avatar;
