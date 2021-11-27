import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import Overlay from 'react-bootstrap/Overlay';
import SingleFriendRequest from '../SingleFriendRequest/SingleFriendRequest';
import './FriendRequests.css';
import AppContext from '../../context/AppContext';


const FriendsRequests = () => {
  const { friendRequests } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(document.querySelector('#root > div > div.header-box > div > div.user-box > div > button > div'));
  const ref = useRef(null);

  const handleClick = () => {
    setShow(!show);
    setTarget(document.querySelector('#root > div > div.header-box > div > div.user-box > div > button > div'));
  };

  return (
    <div ref={ref} className='friend-requests-icon-box'>
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
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            Teammate Requests
            <CloseButton className='close-teammates-btn' onClick={handleClick} />
          </Popover.Header>
          <Popover.Body className='friend-requests-body'>
            {friendRequests.length ?
              friendRequests.map(newTeammate => <SingleFriendRequest key={newTeammate.id} newTeammate={newTeammate} />) :
              <h6 className='confirmation-msg'>
                No new requests at the moment
              </h6>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default FriendsRequests;
