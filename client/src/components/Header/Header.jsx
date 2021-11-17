import { useContext, React } from 'react';
import Avatar from '../../elements/Avatar/Avatax';
import './Header.css';
import Button from 'react-bootstrap/Button';
import { logoutRequest } from '../../services/auth/logout-request';
import AppContext from '../../context/AppContext';


const Header = () => {
  const { loggedIn, setLoggedIn, setUser } = useContext(AppContext);

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="headerBox">
      <div className='logoBox'>
        {/* replace h3 on next line with real logo */}
        <h3 style={{ color: 'white', margin: '0px' }}>Logo</h3>
      </div>
      <div className="profileBox">
        {loggedIn &&
          <Button variant="outline-secondary" color='white' style={{ marginRight: '1vw' }} onClick={(ev) => logout(ev)}>Logout</Button>}
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
