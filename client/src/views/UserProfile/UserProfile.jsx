import './UserProfile.css';
import { useState, useEffect } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import UserDetails from '../../components/UserDetails/UserDetails';
import Button from 'react-bootstrap/Button';
import Posts from '../../user-profile-tabs/Posts/Posts';
import Teammates from '../../user-profile-tabs/Teammates/Teammates';
import { ButtonGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { isCurrentURL } from '../../common/helpers';

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const [userId, setUserId] = useState(location.pathname.split('/')[2].split('=')[1]);
  const [activeTab, setActiveTab] = useState();
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const result = await getUserDetailsRequest(userId);
    setUserInfo(result);
  };

  useEffect(() => {
    setUserId(location.pathname.split('/')[2].split('=')[1]);

    if (isCurrentURL('teammates')) {
      setActiveTab(<Teammates userId={userId} />);
    } else {
      setActiveTab(<Posts userId={userId} />);
    }
  }, [location, userInfo]);

  useEffect(() => {
    getUserInfo();
  }, [userId]);


  return (
    <div className='user-profile-container'>
      <div className='user-profile-left'>
        <ButtonGroup className='my-profile-tabs-bar theme-button-group-style' size="lg">
          <Button
            className='my-profile-tab'
            variant='outline-dark'
            active={isCurrentURL('posts')}
            onClick={() => history.push(`/user-profile/id=${userId}/posts`)}
          >posts
          </Button>
          <Button
            className='my-profile-tab'
            variant='outline-dark'
            active={isCurrentURL('teammates')}
            onClick={() => history.push(`/user-profile/id=${userId}/teammates`)}
          >teammates
          </Button>
        </ButtonGroup>
        <div className='my-profile-active-tab'>
          {activeTab}
        </div>
      </div>
      <div className='user-profile-right'>
        <UserDetails userId={userId} />
      </div>
    </div>
  );
};

export default UserProfile;
