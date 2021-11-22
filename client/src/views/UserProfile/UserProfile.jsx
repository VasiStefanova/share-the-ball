import './UserProfile.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import UserDetails from '../../components/UserDetails/UserDetails';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Posts from '../../user-profile-tabs/Posts/Posts';
import Teammates from '../../user-profile-tabs/Teammates/Teammates';

const UserProfile = ({ match }) => {

  const [userInfo, setUserInfo] = useState({});
  const [postsBtnClicked, setPostsBtnCLicked] = useState(true);
  const [teammatesBtnClicked, setTeammatesBtnClicked] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await getUserDetailsRequest(match.params.id);
      setUserInfo(result);
      console.log(result);
    };

    getUserInfo();
  }, [match.params.id]);


  return (
    <div className='user-profile-container'>
      <div className='user-profile-left'>
        <div className='left-btns'>
          <ToggleButton
            className='nav-button'
            variant='outline-dark'
            checked={postsBtnClicked}
            type="checkbox"
            onClick={() => {
              setPostsBtnCLicked(true);
              setTeammatesBtnClicked(false);
            }}
          >posts
          </ToggleButton>
          <ToggleButton
            className='nav-button'
            variant='outline-dark'
            onClick={() => {
              setPostsBtnCLicked(false);
              setTeammatesBtnClicked(true);
            }}
            checked={teammatesBtnClicked}
            type="checkbox"
          >teammates
          </ToggleButton>
        </div>
        {postsBtnClicked ? <Posts userId={match.params.id} /> : <Teammates teammates={userInfo.friends} />}
      </div>
      <div className='user-profile-right'>
        <UserDetails userInfo={userInfo} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  match: PropTypes.object,
};

export default UserProfile;
