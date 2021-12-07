import './ToggleFriendshipButton.css';
import Button from 'react-bootstrap/Button';
import { inviteRequest } from '../../services/friends/invite-request';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { acceptRequest } from '../../services/friends/accept-request';

const ToggleFriendshipButton = ({ user, targetUser }) => {
  const { toggleFriendship, setToggleFriendship } = useContext(AppContext);

  const potentialFriend = user.friends.find(friend => friend.id === +targetUser.id);

  if (user.id === targetUser.id) return null;

  if (potentialFriend?.friendshipStatus === 1 && potentialFriend?.canAcceptFriendship === true) {
    return (
      <Button
        className="toggle-friendship-button theme-btn-style"
        variant='outline-dark'
        onClick={() => {
          acceptRequest(user.id, targetUser.id)
            .then(() => setToggleFriendship(!toggleFriendship))
            .catch(console.error);
        }}
      >
        <i className="bi bi-check-lg" />
        Accept teammate request
      </Button>
    );
  } else if (potentialFriend?.friendshipStatus === 1) {
    return (
      <Button
        className="toggle-friendship-button theme-btn-style"
        variant='outline-dark'
        disabled
        style={{ background: 'white' }}
      >
        <i className="bi bi-send-exclamation-fill" />
        Pending
      </Button>
    );
  } else if (potentialFriend?.friendshipStatus === 2) {
    return (
      <Button
        className="toggle-friendship-button theme-btn-style"
        variant='outline-dark'
        disabled style={{ background: 'white' }}
      >
        <i className="bi bi-check-lg" />
        Teammates
      </Button>
    );
  } else {
    return (
      <Button
        className="toggle-friendship-button theme-btn-style"
        variant='outline-dark'
        onClick={() => {
          inviteRequest(user.id, targetUser.id)
            .then(() => setToggleFriendship(!toggleFriendship))
            .catch(console.error);
        }}
      >
        <i className="bi bi-person-plus-fill" />
        Add to teammates
      </Button>
    );
  }
};

ToggleFriendshipButton.propTypes = {
  user: PropTypes.object,
  targetUser: PropTypes.object
};

export default ToggleFriendshipButton;
