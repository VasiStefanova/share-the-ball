import './ChangePassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { updateUserRequest } from '../../services/users/update-user-request';
import { logoutRequest } from '../../services/auth/logout-request';
import AppContext from '../../context/AppContext';
import { useHistory } from 'react-router';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../common/constants';
import { validateInput } from '../../common/helpers';

const ChangePassword = () => {
  const { setUser, setLoggedIn } = useContext(AppContext);
  const [password, setPassword] = useState({ current: '', new: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const isFormValid = validateInput(password.current, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH) &&
  validateInput(password.new, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH);

  const handleConfirm = async () => {
    try {
      const updateResponse = await updateUserRequest(password.current, password.new);

      if (updateResponse.message) throw new Error('Current password is not correct!');
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
    } catch (err) {
      setError(err.message);
    }


  };

  return (
    <>
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
        <Button className={isFormValid ?'confirm-pass-change-btn theme-btn-style' : 'confirm-pass-change-btn-disabled'} variant="dark" onClick={() => handleConfirm()}>
          Confirm
        </Button>
      </Form>
      <p id="error-msg">{error}</p>
    </>
  );
};


export default ChangePassword;
