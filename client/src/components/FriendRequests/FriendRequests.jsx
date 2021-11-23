import { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import decode from 'jwt-decode';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import FriendRequestsProfiles from '../FriendRequestsProfiles/FriendRequestsProfiles';
import './FriendRequests.css';


const FriendsRequests = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [loggedUserInfo, setLoggedUserInfo] = useState({});
  const [renderComponent, setRenderComponent] = useState({});


  const loggedUserToken = localStorage.getItem('token');
  const loggedUserId = decode(loggedUserToken)?.id;

  useEffect(() => {
    const getLoggedUserInfo = async () => {
      const result = await getUserDetailsRequest(loggedUserId);
      setLoggedUserInfo(result);
      console.log(`logged user: ${result.id}`);
    };

    getLoggedUserInfo();
  }, [renderComponent]);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const friendRequests = loggedUserInfo?.friends?.filter(friend => friend.canAcceptFriendship === true);

  return (
    <div ref={ref}>
      <Button variant="outline-secondary" color='white' style={{ marginRight: '1vw' }} onClick={handleClick}>See friend requests</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" className='friend-requests-body'>
          <Popover.Header as="h3">Teammates Invites</Popover.Header>
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
