import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './SingleFriendRequest.css';
import Avatar from '../Avatar/Avatax';
import { acceptRequest } from '../../services/friends/accept-request';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

const SingleFriendRequest = ({ newTeammate, setShowFriendRequestPopover }) => {
  const { user, toggleFriendship, setToggleFriendship } = useContext(AppContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const acceptFriendRequest = (loggedUser, otherUser) => {
    acceptRequest(loggedUser, otherUser)
      .then(() => {
        setToggleFriendship(!toggleFriendship);
        setButtonClicked(true);
        setConfirmation(`You and ${newTeammate.username} are now teammates!`);
      })
      .catch(err => console.error(err));
  };

  const declineFriendRequest = (loggedUser, otherUser) => {
    unfriendRequest(loggedUser, otherUser)
      .then(() => {
        setToggleFriendship(!toggleFriendship);
        setButtonClicked(true);
        setConfirmation(`You have declined ${newTeammate.username}'s invite...`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='friend-request-container'>
      {buttonClicked ?
        <h6 className='confirmation-msg'>{confirmation}</h6> :
        <>
          <div className='new-teammate-avatar-and-info'>
            <Avatar user={newTeammate} style={{ width: '5vh', height: '5vh' }} />
            <div className='new-teammate-info-box'>
              <Link
                className="new-teammate-profile-link"
                to={`/user-profile/id=${newTeammate.id}/posts`}
                onClick={() => setShowFriendRequestPopover(false)}
              >
                <h5 className='new-teammate-info'>{newTeammate.username}</h5>
              </Link>
            </div>
          </div>
          <div className="single-friend-request-btn-group">
            <Button
              variant='outline-dark'
              className='friend-request-accept-btn'
              onClick={() => acceptFriendRequest(user.id, newTeammate.id)}
            >
              Accept
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => declineFriendRequest(user.id, newTeammate.id)}
            >
              Decline
            </Button>
          </div>
        </>}
    </div>
  );
};

SingleFriendRequest.propTypes = {
  newTeammate: PropTypes.object,
  setShowFriendRequestPopover: PropTypes.func
};

export default SingleFriendRequest;
