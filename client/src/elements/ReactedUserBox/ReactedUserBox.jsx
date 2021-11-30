import './ReactedUserBox.css';
import PropTypes from 'prop-types';
import Avatar from '../Avatar/Avatax';
import { useEffect, useState } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import Button from 'react-bootstrap/Button';

const ReactedUserBox = ({ userId }) => {
  const [user, setUser] = useState({ username: '' });

  useEffect(() => {
    getUserDetailsRequest(userId)
      .then(details => setUser(details))
      .catch(console.error);
  }, []);

  return (
    <div className='reacted-user-container'>
      <div className='teammate-avatar-and-info-home'>
        <Avatar user={user} style={{ width: '5vh', height: '5vh' }} />
        <div className='teammate-info-box-home'>
          <h5 className='teammate-info-home'>{user.username}</h5>
        </div>
      </div>
      <Button type="button" size="sm" className="btn btn-success">Add friend</Button>
    </div>
  );
};

ReactedUserBox.propTypes = {
  userId: PropTypes.number
};
export default ReactedUserBox;
