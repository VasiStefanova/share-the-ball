import './SingleNotification.css';
import Avatar from '../Avatar/Avatax';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal';

const SingleNotification = ({ notification }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div
        className='notification-container'
        onClick={() => setModalShow(true)}
      >
        <Avatar
          user={notification.reaction? notification : notification.author}
          style={{ width: '5vh', height: '5vh' }}
        />
        {notification.reaction?
          <>
            <p className='notification-text'>
              {notification.username} reacted to your post!
            </p>
            {notification.reaction === 1?
              <i className="bi bi-hand-thumbs-up-fill like-icon" />:
              notification.reaction === 2?
                <i className="bi bi-emoji-laughing-fill laugh-icon" />:
                <i className="bi bi-heart-fill heart-icon" />}
          </>:
          <p className='notification-text'>{notification.author.username} commented on your post!</p>}
      </div>
      <NotificationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        notification={notification}
      />
    </>
  );
};

SingleNotification.propTypes = {
  notification: PropTypes.object,
};
export default SingleNotification;
