import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import Avatar from '../../elements/Avatar/Avatax';
import Button from 'react-bootstrap/Button';
import './UserDetails.css';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';


const UserDetails = ({ userInfo }) => {
  const { user } = useContext(AppContext);

  const friendConnection = user.friends.find(friend => friend.id === userInfo.id);
  let btnProps = {};

  switch (friendConnection?.friendshipStatus) {
  case 1:
    btnProps = {
      label: 'pending',
      disabled: true,
      iconClassName: 'bi bi-send-exclamation-fill'
    };
    break;
  case 2:
    btnProps = {
      label: 'remove teammate',
      iconClassName: 'bi bi-person-dash-fill',
      handleClick: () => console.log('removed!')
    };

    break;
  default:
    btnProps = {
      label: 'Add teammate',
      iconClassName: 'bi bi-person-plus-fill',
      handleClick: () => console.log('added!')
    };
  }

  return (
    <Figure>
      <Avatar
        user={userInfo}
        style={{
          'margin-top': '3vh',
          'max-height': '30vh',
          'max-width': '40vh',
          'border-radius': '30vh'
        }}
      />
      <Figure.Caption className='user-info'>
        <h5>{userInfo.username}</h5>
        <p className='user-text'>email: {userInfo.email}</p>
        <p className='user-text'>last updated on: {new Date(userInfo.lastUpdated).toLocaleDateString('en-UK')}</p>
      </Figure.Caption>
      <Button variant='dark' disabled={btnProps.disabled} onClick={btnProps.handleClick}>
        <i className={btnProps.iconClassName} />
        {btnProps.label}
      </Button>
    </Figure>
  );
};

UserDetails.propTypes = {
  userInfo: PropTypes.object
};
export default UserDetails;
