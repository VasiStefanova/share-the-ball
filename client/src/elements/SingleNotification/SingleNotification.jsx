import './SingleNotification.css';
import Avatar from '../Avatar/Avatax';
import PropTypes from 'prop-types';

const SingleNotification = ({ notification }) => {


  return (
    <div className='notification-container'>
      <Avatar
        user={notification.reaction? notification : notification.author}
        style={{ width: '5vh', height: '5vh' }}
      />
      {notification.reaction?
        <>
          <h4>{notification.username} reacted to your post!</h4>
          {notification.reaction === 1?
            <i className="bi bi-hand-thumbs-up-fill" />:
            notification.reaction === 2?
              <i className="bi bi-emoji-laughing-fill" />:
              <i className="bi bi-heart-fill" />}
        </>:
        <h4>{notification.author.username} commented on your post!</h4>}
    </div>
  );
};

SingleNotification.propTypes = {
  notification: PropTypes.object
};
export default SingleNotification;
