import { useContext, React, useState, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Avatar from '../../elements/Avatar/Avatax';
import './Header.css';
import Button from 'react-bootstrap/Button';
import { logoutRequest } from '../../services/auth/logout-request';
import AppContext from '../../context/AppContext';
import FriendRequests from '../FriendRequests/FriendRequests';
import { isCurrentURL } from '../../common/helpers';
import Notifications from '../Notifications/Notifications';

const Header = () => {
  const { loggedIn, setLoggedIn, user, setUser, newPosts } = useContext(AppContext);
  const [showUpdateMsg, setShowUpdateMsg] = useState(false);
  const history = useHistory();

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

      history.push('/home');

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
          to='/home' className='logo-nav-link'
          onClick={() => loggedIn && isCurrentURL('home') && window.location.reload()}
        >
          <img className='app-logo-img' src='/share-the-ball-logo.jpg' />
        </NavLink>
        {showUpdateMsg &&
          <div className='new-posts-msg-box'>
            <h5 className='new-posts-msg-first-line'>New posts are available!</h5>
            <h6 className='new-posts-msg-second-line'>(Click the ball to update your feed)</h6>
          </div>}
      </div>
      <div className='header-wallpapers-container'>
        <img src="/kobe-fadeaway.png" alt="kobe-fadeaway" className='header-wallpaper' />
        <img src="/jordan-fadeaway.png" alt="jordan-fadeaway" className='header-wallpaper' />
      </div>
      {loggedIn?
        <div className="profile-box">
          <div className='user-box'>
            <div className='username-and-notifications'>
              <div className='username-box'>
                <Link className="author-profile-link" to='/my-profile/my-posts'>
                  <h5 className='avatar-username'>{user.username}</h5>
                </Link>
              </div>
              <div className='notifications-box'>
                <Notifications />
                <FriendRequests />
              </div>
            </div>
            <div className='avatar-and-logout'>
              <NavLink to='/my-profile/my-posts' className='avatar-nav-link'>
                <Avatar user={user} />
              </NavLink>
              <Button variant="outline-light" className='logout-button' onClick={(ev) => logout(ev)}>Logout</Button>
            </div>
          </div>
          <div />
        </div>:
        <div style={{ width: '12vw' }} />}
    </div>
  );
};

export default Header;
