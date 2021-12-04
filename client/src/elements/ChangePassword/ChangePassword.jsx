import './ChangePassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { updateUserRequest } from '../../services/users/update-user-request';
import { logoutRequest } from '../../services/auth/logout-request';
import AppContext from '../../context/AppContext';
import { useHistory } from 'react-router';

const ChangePassword = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [password, setPassword] = useState({ current: '', new: '' });
  const history = useHistory();

  const handleConfirm = async () => {
    await updateUserRequest(password.current, password.new);
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
  };

  return (
    <Form className="change-password-form">
      <div className="change-password-text-box">
        <Form.Control
          type="password" placeholder="Current password" onChange={(e) => {
            setPassword((prev) => ({ ...prev, current: e.target.value }));
          }}
        />
      </div>
      <div className="change-password-text-box new-password-text-box">
        <Form.Control
          type="password" placeholder="New password" onChange={(e) => {
            setPassword((prev) => ({ ...prev, new: e.target.value }));
          }}
        />
      </div>
      <h6 className='theme-helper-text-style helper-text-change-pass theme-background-color'>
        Between 4 and 40 characters
      </h6>
      <Button variant="dark" onClick={() => handleConfirm()}>
        Confirm
      </Button>
    </Form>
  );
};


export default ChangePassword;
