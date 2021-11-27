import './UserProfile.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import UserDetails from '../../components/UserDetails/UserDetails';
import Button from 'react-bootstrap/Button';
import Posts from '../../user-profile-tabs/Posts/Posts';
import Teammates from '../../user-profile-tabs/Teammates/Teammates';
import { ButtonGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { isCurrentURL } from '../../common/helpers';

const UserProfile = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(<Posts />);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const result = await getUserDetailsRequest(match.params.id);
    setUserInfo(result);
    console.log(result);
  };

  useEffect(() => {
    getUserInfo();
  }, [match.params.id]);

  useEffect(() => {
    switch (location.pathname.split('/')[2]) {
    case 'posts':
      setActiveTab(<Posts />);
      break;
    case 'teammates':
      setActiveTab(<Teammates mountedOn="my-profile/teammates" />);
      break;

    default:
      setActiveTab(<Posts />);
    }
  }, [location]);


  return (
    <div className='user-profile-container'>
      <div className='user-profile-left'>
        <ButtonGroup className='my-profile-tabs-bar theme-button-group-style' size="lg">
          <Button
            className='my-profile-tab'
            variant='outline-dark'
            active={isCurrentURL('my-posts')}
            onClick={() => history.push(`/user-profile/id=${match.params.id}/posts`)}
          >posts
          </Button>
          <Button
            className='my-profile-tab'
            variant='outline-dark'
            active={isCurrentURL('my-teammates')}
            onClick={() => history.push(`/user-profile/id=${match.params.id}/teammates`)}
          >teammates
          </Button>
        </ButtonGroup>
        <div className='my-profile-active-tab'>
          {activeTab}
        </div>
      </div>
      <div className='user-profile-right'>
        <UserDetails userId={match.params.id} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  match: PropTypes.object,
};

export default UserProfile;
