import './ReactedUserBox.css';
import PropTypes from 'prop-types';
import Avatar from '../Avatar/Avatax';
import { useContext, useEffect, useState } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import AppContext from '../../context/AppContext';
import { setUserInStorage } from '../../common/helpers';
import ToggleFriendshipButton from '../ToggleFriendshipButton/ToggleFriendshipButton';
import { Link } from 'react-router-dom';

const ReactedUserBox = ({ userId }) => {
  const [user, setUser] = useState({ username: '' });
  const { user: loggedUser, setUser: setLoggedUser, toggleFriendship } = useContext(AppContext);

  useEffect(() => {
    getUserDetailsRequest(userId)
      .then(details => setUser(details))
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUserDetailsRequest(loggedUser.id)
      .then(details => {
        setLoggedUser(details);
        setUserInStorage(loggedUser);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  return (
    <div className='reacted-user-container'>
      <div className='teammate-avatar-and-info-home'>
        <Avatar user={user} style={{ width: '5vh', height: '5vh' }} />
        <div className='teammate-info-box-home'>
          <Link className="author-profile-link" to={`/user-profile/id=${user.id}/posts`}>
            <h5 className='teammate-info-home'>{user.username}</h5>
          </Link>
        </div>
      </div>
      <ToggleFriendshipButton user={loggedUser} targetUser={user} />
    </div>
  );
};

ReactedUserBox.propTypes = {
  userId: PropTypes.number
};

export default ReactedUserBox;
