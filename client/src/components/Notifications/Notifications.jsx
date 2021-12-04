import './Notifications.css';
import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import Overlay from 'react-bootstrap/Overlay';
import AppContext from '../../context/AppContext';
import SingleNotification from '../../elements/SingleNotification/SingleNotification';

const Notifications = () => {
  const { notifications } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(document.querySelector('button.see-friend-requests-btn.btn.btn-outline-secondary.btn-primary'));
  const ref = useRef(null);

  const handleClick = () => {
    setShow(!show);
    setTarget(document.querySelector('button.see-friend-requests-btn.btn.btn-outline-secondary.btn-primary'));
  };

  return (
    <div ref={ref} className='notifications-icon-box'>
      <Button
        className='see-notifications-btn btn btn-outline-secondary'
        onClick={handleClick}
      >
        <i className="bi bi-people-fill fa-3x" />
        <div style={{ color: 'rgb(182, 5, 5)' }}>{notifications?.length ? +notifications.length : 0}</div>
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
            {notifications && notifications.length ?
              notifications.map(notification => <SingleNotification key={notification.itemId} newTeammate={notification} />) :
              <h6 className='confirmation-msg'>
                No new requests at the moment
              </h6>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default Notifications;
