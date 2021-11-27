import { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import Overlay from 'react-bootstrap/Overlay';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import FriendRequestsProfiles from '../FriendRequestsProfiles/FriendRequestsProfiles';
import './FriendRequests.css';
import AppContext from '../../context/AppContext';
import { intervalRequest } from '../../common/helpers';


const FriendsRequests = () => {
  const { friendRequests } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button
        className='see-friend-requests-btn btn btn-outline-secondary'
        onClick={handleClick}
      >
        <i className="bi bi-people-fill fa-3x" />
        <div style={{ color: 'rgb(182, 5, 5)' }}>{friendRequests?.length ? +friendRequests.length : 0}</div>
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" className='friend-requests-body'>
          <Popover.Header as="h3">
            Teammates Invites
            <CloseButton className='close-teammates-btn' onClick={handleClick} />
          </Popover.Header>
          <Popover.Body>
            {friendRequests?.length ?
              <FriendRequestsProfiles teammates={friendRequests} /> :
              <p>
                No friend requests at the moment
              </p>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default FriendsRequests;
