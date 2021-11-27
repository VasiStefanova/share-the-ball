import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import Avatar from '../../elements/Avatar/Avatax';
import Button from 'react-bootstrap/Button';
import './UserDetails.css';
import { useState, useEffect } from 'react';
import { inviteRequest } from '../../services/friends/invite-request';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import decode from 'jwt-decode';


const UserDetails = ({ userId }) => {

  // should use the user from the context below instead of
  // getting the token from local storage, to be refactored
  // once the user is set correctly in the context

  const loggedUserToken = localStorage.getItem('token');
  const loggedUserId = decode(loggedUserToken)?.id;

  const [renderComponent, setRenderComponent] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [loggedUserInfo, setLoggedUserInfo] = useState({});

  const getUserInfo = async () => {
    const result = await getUserDetailsRequest(userId);
    setUserInfo(result);
    console.log(`current user: ${result.id}`);
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    const getLoggedUserInfo = async () => {
      const result = await getUserDetailsRequest(loggedUserId);
      setLoggedUserInfo(result);
      console.log(`logged user: ${result.id}`);
    };

    getLoggedUserInfo();
  }, [renderComponent]);
  const friendConnection = loggedUserInfo.friends?.find(friend => friend.id === +userId);
  let btnProps = {};

  switch (friendConnection?.friendshipStatus) {
  case 1:
    btnProps = {
      label: 'pending',
      disabled: true,
      iconClassName: 'bi bi-send-exclamation-fill',
    };
    break;
  case 2:
    btnProps = {
      label: 'remove teammate',
      iconClassName: 'bi bi-person-dash-fill',
      handleClick: () => unfriendRequest(loggedUserId, userInfo.id)
        .then(response => {
          setRenderComponent({});
          console.log(response);
        })
        .catch(err => console.error(err))
    };
    break;
  default:
    btnProps = {
      label: 'Add teammate',
      iconClassName: 'bi bi-person-plus-fill',
      handleClick: () => inviteRequest(loggedUserId, userInfo.id)
        .then(response => {
          setRenderComponent({});
          console.log(response);
        })
        .catch(err => console.error(err))
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
        <h5 className='theme-text-style'>{userInfo.username}</h5>
        <p className='user-text theme-text-style'>email: {userInfo.email}</p>
        <p className='user-text theme-text-style'>last updated on: {new Date(userInfo.lastUpdated).toLocaleDateString('en-UK')}</p>
      </Figure.Caption>
      <Button variant='dark' disabled={btnProps.disabled} onClick={btnProps.handleClick}>
        <i className={btnProps.iconClassName} />
        {btnProps.label}
      </Button>
    </Figure>
  );
};

UserDetails.propTypes = {
  userId: PropTypes.number
};
export default UserDetails;
