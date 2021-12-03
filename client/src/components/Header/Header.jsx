import { useContext, React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../../elements/Avatar/Avatax';
import './Header.css';
import Button from 'react-bootstrap/Button';
import { logoutRequest } from '../../services/auth/logout-request';
import AppContext from '../../context/AppContext';
import FriendRequests from '../FriendRequests/FriendRequests';
import { useHistory } from 'react-router';
import { isCurrentURL } from '../../common/helpers';

const Header = () => {
  const { loggedIn, setLoggedIn, user, setUser, newPosts } = useContext(AppContext);
  const history = useHistory();
  const [showUpdateMsg, setShowUpdateMsg] = useState(false);

  const logout = async (ev) => {
    ev.preventDefault();

    try {
      await logoutRequest();
      setUser({
        id: 0,
        username: '',
        email: '',
        role: 0,
        avatar: '',
        banDate: '',
        banReason: '',
        lastUpdated: '',
        latitude: 0,
        longitude: 0,
        friends: []
      });
      setLoggedIn(false);

      localStorage.removeItem('user');
      localStorage.removeItem('token');

      history.push('/home-public');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (newPosts) setShowUpdateMsg(true);
  }, [newPosts]);

  return (
    <div className="header-box">
      <div className='header-left-container'>
        <NavLink
          to='/home' className='nav-link'
          onClick={() => loggedIn && isCurrentURL('home') && window.location.reload()}
        >
          <div className='logo-box'>
            <img className='app-logo-img' src='/share-the-ball-logo.jpg' />
          </div>
        </NavLink>
        {showUpdateMsg &&
          <div className='new-posts-msg-box'>
            <h5 className='new-posts-msg-first-line'>New posts are available!</h5>
            <h6 className='new-posts-msg-second-line'>(Click the ball to update your feed)</h6>
          </div>}
      </div>
      {loggedIn &&
        <div className="profile-box">
          <div className='user-box'>
            <NavLink to='/my-profile' className='avatar-nav-link'>
              <h5 className='avatar-username'>{user.username}</h5>
              <Avatar user={user} />
            </NavLink>
            <FriendRequests />
          </div>
          <div>
            <Button variant="outline-light" className='logout-button' onClick={(ev) => logout(ev)}>Logout</Button>
          </div>
        </div>}
    </div>
  );
};

export default Header;
