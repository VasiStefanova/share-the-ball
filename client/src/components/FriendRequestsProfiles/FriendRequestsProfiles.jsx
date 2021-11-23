import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './FriendRequestsProfiles.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';
import { acceptRequest } from '../../services/friends/accept-request';
import { useState } from 'react';
import decode from 'jwt-decode';


const FriendsRequestsProfiles = ({ teammates }) => {

  // should use the user from the context below instead of
  // getting the token from local storage, to be refactored
  // once the user is set correctly in the context

  const loggedUserToken = localStorage.getItem('token');
  const loggedUserId = decode(loggedUserToken)?.id;

  const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(false);
  const [renderComponent, setRenderComponent] = useState({});

  const acceptFriendRequest = (loggedUser, otherUser) => {

    acceptRequest(loggedUser, otherUser)
      .then(response => {
        setAcceptedFriendRequest(true);
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
                <Button variant='outline-dark' onClick={()=>acceptFriendRequest(loggedUserId, teammate.id)}>
                  accept
                </Button>
                <Button variant='outline-dark'>
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
