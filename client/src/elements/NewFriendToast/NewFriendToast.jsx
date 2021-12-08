import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import './NewFriendToast.css';
import PropTypes from 'prop-types';

const NewFriendToast = ({ newFriend, setNewFriend }) => {
  const [showNewFriendToast, setShowNewFriendToast] = useState(false);

  useEffect(() => {
    if (newFriend) {
      setShowNewFriendToast(true);
    }
  }, [newFriend]);

  if (showNewFriendToast) {
    return (
      <>
        <Toast
          className="new-friend-toast" bg="success" show={showNewFriendToast} delay={4500} autohide
          onClose={() => {
            setShowNewFriendToast(false);
            setNewFriend(null);
          }}
        >
          <Toast.Header>
            <strong className="me-auto">You have a new teammate!</strong>
          </Toast.Header>
          <Toast.Body><strong className="me-auto">{newFriend.username} has accepted your teammate request!</strong></Toast.Body>
        </Toast>
      </>
    );
  }

  return null;
};

NewFriendToast.propTypes = {
  newFriend: PropTypes.object,
  setNewFriend: PropTypes.func
};

export default NewFriendToast;
