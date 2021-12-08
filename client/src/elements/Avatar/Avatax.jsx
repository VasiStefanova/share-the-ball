import './Avatar.css';
import React from 'react';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { SERVER_URL } from '../../common/constants';

const Avatar = ({ user, style, avatarBoxStyle }) => {

  return (
    <div className='avatar-box' style={avatarBoxStyle ? avatarBoxStyle : null}>
      {user.avatar &&
        <Image roundedCircle src={`${SERVER_URL}/${user.avatar}`} alt={user.username} className='avatar-image' style={style? style : null} />}
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.object,
  style: PropTypes.object,
  avatarBoxStyle: PropTypes.object
};

export default Avatar;
