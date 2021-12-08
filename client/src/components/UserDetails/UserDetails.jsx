import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import Avatar from '../../elements/Avatar/Avatax';
import './UserDetails.css';
import { useState, useEffect, useContext } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import AppContext from '../../context/AppContext';
import { setUserInStorage } from '../../common/helpers';
import ToggleFriendshipButton from '../../elements/ToggleFriendshipButton/ToggleFriendshipButton';
import UnfriendButton from '../../elements/UnfriendButton/UnfriendButton';
import { reverseGeocodeLocationRequest } from '../../services/google-geocoding/reverse-geocode-location-request';
import { FRIENDSHIP_STATUS } from '../../common/constants';

const UserDetails = ({ userId: targetUserId }) => {
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [targetUser, setTargetUser] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    getUserDetailsRequest(targetUserId)
      .then(targetUserDetails => setTargetUser(targetUserDetails))
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUserDetailsRequest(user.id)
      .then((loggUserDetails) => {
        setUser(loggUserDetails);
        setUserInStorage(loggUserDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    // if (targetUser.latitude) {
    //   const latLng = [targetUser.latitude, targetUser.longitude];
    //   reverseGeocodeLocationRequest(latLng)
    //     .then(city => setLocation(city));
    // }
  }, [targetUser]);

  const targetIsFriend = user.friends.some(friend => friend.id === +targetUser.id && friend.friendshipStatus === FRIENDSHIP_STATUS.connected);

  return (
    <Figure>
      <Avatar
        user={targetUser}
        style={{
          'marginTop': '3vh',
          'height': '25vh',
          'width': '25vh'
        }}
        avatarBoxStyle={{
          'display': 'unset'
        }}
      />
      <div className='user-info theme-background-color'>
        <h4 className='theme-text-style'>{targetUser.username}</h4>
        <h6 className='user-text theme-text-style'>Email: {targetUser.email}</h6>
        <h6 className='user-text theme-text-style'>Last updated on: {new Date(targetUser.lastUpdated).toLocaleDateString('en-UK')}</h6>
        {targetUser.latitude &&
          <h6 className='user-text theme-text-style'>Location: {location || '*Turn on location service!*'}</h6>}
      </div>
      <ToggleFriendshipButton user={user} targetUser={targetUser} />
      {targetIsFriend &&
        <UnfriendButton user={user} targetUser={targetUser} />}
    </Figure>
  );
};

UserDetails.propTypes = {
  userId: PropTypes.string
};

export default UserDetails;
