import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import Overlay from 'react-bootstrap/Overlay';
import SingleFriendRequest from '../../elements/SingleFriendRequest/SingleFriendRequest';
import './FriendRequests.css';
import AppContext from '../../context/AppContext';
import PropTypes from 'prop-types';


const FriendsRequests = ({ show, setShow, setShowNotifications }) => {
  const { friendRequests } = useContext(AppContext);

  const [target, setTarget] = useState(document.querySelector('button.see-friend-requests-btn.btn.btn-outline-secondary.btn-primary'));
  const ref = useRef(null);

  const handleClick = () => {
    setShowNotifications(false);
    setShow(!show);
    setTarget(document.querySelector('button.see-friend-requests-btn.btn.btn-outline-secondary.btn-primary'));
  };

  return (
    <div ref={ref} className='friend-requests-icon-box'>
      <Button
        className='see-friend-requests-btn btn btn-outline-secondary'
        onClick={handleClick}
      >
        <i className="bi bi-people-fill fa-3x" />
        <h5 style={friendRequests?.length? { color: 'rgb(182, 5, 5)' } : null}>{friendRequests?.length ? +friendRequests.length : 0}</h5>
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
            {friendRequests && friendRequests.length ?
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

FriendsRequests.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowNotifications: PropTypes.func
};

export default FriendsRequests;
