import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import Button from 'react-bootstrap/Button';
import './UnfriendButton.css';
import PropTypes from 'prop-types';

const UnfriendButton = ({ user, targetUser }) => {
  const { toggleFriendship, setToggleFriendship } = useContext(AppContext);

  const handleUnfriend = () => {
    unfriendRequest(user.id, targetUser.id)
      .then(() => setToggleFriendship(!toggleFriendship))
      .catch(console.error);
  };

  return (
    <Button id="unfriend-button" variant='outline-dark' onClick={() => handleUnfriend()}>
      <i className="bi bi-person-dash-fill" />
    </Button>
  );
};

UnfriendButton.propTypes = {
  user: PropTypes.object,
  targetUser: PropTypes.object
};

export default UnfriendButton;

