import { useContext, useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router';
import AppContext from '../../context/AppContext';
import MyPosts from '../../my-profile-tabs/MyPosts/MyPosts';
import MyTeammates from '../../my-profile-tabs/MyTeammates/MyTeammates';
import UserList from '../../my-profile-tabs/UserList/UserList';
import './MyProfile.css';

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(<MyPosts />);
  const isCurrentURL = (searchedTab = '') => {
    return location.pathname.split('/')[2] === searchedTab;
  };

  useEffect(() => {
    switch (location.pathname.split('/')[2]) {
    case 'posts':
      setActiveTab(<MyPosts />);
      break;
    case 'teammates':
      setActiveTab(<MyTeammates />);
      break;
    case 'user_list':
      setActiveTab(<UserList />);
      break;

    default:
      setActiveTab(<MyPosts />);
    }
  }, [location]);

  return (
    <div className='my-profile-container'>
      <div className='my-profile-left'>
        <div className='main-my-profile-container'>
          <ButtonGroup className='my-profile-tabs-bar theme-button-group-style' size="lg">
            <Button
              variant="outline-dark"
              active={isCurrentURL('posts')}
              className='my-profile-tab'
              onClick={() => history.push('/my-profile/posts')}
            >Posts
            </Button>
            <Button
              variant="outline-dark"
              active={isCurrentURL('teammates')}
              className='my-profile-tab'
              onClick={() => history.push('/my-profile/teammates')}
            >Teammates
            </Button>
            {/* change role on next line to hide from regular users */}
            {user.role === 1 &&
              <Button
                variant="outline-dark"
                active={isCurrentURL('user_list')}
                className='my-profile-tab'
                onClick={() => history.push('/my-profile/user_list')}
              >User List
              </Button>}
          </ButtonGroup>
          <div className='my-profile-active-tab'>
            {activeTab}
          </div>
        </div>
      </div>
      <div className='my-profile-right'>
        <h3>Right</h3>
      </div>
    </div>
  );
};

export default MyProfile;
