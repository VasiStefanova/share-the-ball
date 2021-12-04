import './Notifications.css';
import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import CloseButton from 'react-bootstrap/CloseButton';
import Overlay from 'react-bootstrap/Overlay';
import AppContext from '../../context/AppContext';
import SingleNotification from '../../elements/SingleNotification/SingleNotification';
import PropTypes from 'prop-types';

const Notifications = ({ setShow, showNotifications, setShowNotifications }) => {
  const { notifications } = useContext(AppContext);

  const [target, setTarget] = useState(document.querySelector('button.see-notifications-btn.btn.btn-outline-secondary.btn-primary'));
  const ref = useRef(null);

  const handleClick = () => {
    setShow(false);
    setShowNotifications(!showNotifications);
    setTarget(document.querySelector('button.see-notifications-btn.btn.btn-outline-secondary.btn-primary'));
  };

  return (
    <div ref={ref} className='notifications-icon-box'>
      <Button
        className='see-notifications-btn btn btn-outline-secondary'
        onClick={handleClick}
      >
        <i className="bi bi-bell-fill" />
        <h5 style={notifications?.length? { color: 'rgb(182, 5, 5)' } : null}>{notifications?.length ? +notifications.length : 0}</h5>
      </Button>
      <Overlay
        show={showNotifications}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">
            Notifications
            <CloseButton className='close-notifications-btn' onClick={handleClick} />
          </Popover.Header>
          <Popover.Body className='notifications-body'>
            {notifications && notifications.length ?
              notifications.map(notification => <SingleNotification key={notification.itemId} notification={notification} />) :
              <h6 className='confirmation-msg'>
                No new notifications at the moment
              </h6>}
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

Notifications.propTypes = {
  setShow: PropTypes.func,
  showNotifications: PropTypes.bool,
  setShowNotifications: PropTypes.func
};
export default Notifications;
