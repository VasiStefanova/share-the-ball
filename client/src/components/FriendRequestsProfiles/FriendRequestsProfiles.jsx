import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './FriendRequestsProfiles.css';
import Avatar from '../../elements/Avatar/Avatax';
import { acceptRequest } from '../../services/friends/accept-request';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';


const FriendsRequestsProfiles = ({ teammates }) => {
  const { user, toggleFriendship, setToggleFriendship } = useContext(AppContext);
  const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(false);

  const acceptFriendRequest = (loggedUser, otherUser) => {
    acceptRequest(loggedUser, otherUser)
      .then(response => {
        setAcceptedFriendRequest(true);
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  const declineFriendRequest = (loggedUser, otherUser) => {
    unfriendRequest(loggedUser, otherUser)
      .then(response => {
        setAcceptedFriendRequest(false);
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {teammates.map(teammate =>
        <div
          className='friend-teammate-container-box'
          key={teammate.id}
        >
          <div className='friend-teammate-container'>
            <div className='friend-teammate-avatar-and-info'>
              <Avatar user={teammate} />
              <div className='friend-teammate-info-box'>
                <h5 className='friend-teammate-info'>{teammate.username}</h5>
              </div>
            </div>
            {acceptedFriendRequest ?
              `You and ${teammate.username} are now friends!` :
              <>
                <Button
                  variant='outline-dark' onClick={() => {
                    acceptFriendRequest(user.id, teammate.id);
                    setToggleFriendship(!toggleFriendship);
                  }}
                >
                  accept
                </Button>
                <Button variant='outline-dark' onClick={() => declineFriendRequest(user.id, teammate.id)}>
                  decline
                </Button>
              </>}
          </div>
        </div>
      )}
    </>
  );
};

FriendsRequestsProfiles.propTypes = {
  teammates: PropTypes.array,
};

export default FriendsRequestsProfiles;
