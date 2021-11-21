import './UserProfile.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import UserDetails from '../../components/UserDetails/UserDetails';

const UserProfile = ({ match }) => {

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await getUserDetailsRequest(match.params.id);
      setUserInfo(result);
    };

    getUserInfo();
  }, [match.params.id]);


  return (
    <div className='user-profile-container'>
      <div className='user-profile-left'>
        <h3>Left</h3>
      </div>
      <div className='user-profile-right'>
        <h3>Right</h3>
        <UserDetails userInfo={userInfo} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  match: PropTypes.object,
};

export default UserProfile;
