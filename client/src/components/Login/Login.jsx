import './Login.css';
import decode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { React, useContext, useState } from 'react';
import { loginRequest } from '../../services/auth/login-request';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import AppContext from '../../context/AppContext';
import { setUserInStorage } from '../../common/helpers';

const Login = () => {
  const { setLoggedIn, setUser } = useContext(AppContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();

    try {
      const user = await loginRequest(credentials);
      if (!user.token) throw new Error('Invalid username or password!');

      localStorage.setItem('token', user.token);
      const payload = decode(user.token);
      const userId = payload.id;

      const userDetails = await getUserDetailsRequest(userId);
      setUser(userDetails);
      setUserInStorage(userDetails);
      setLoggedIn(true);
      setCredentials({ username: '', password: '' });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Form className="login-form" onSubmit={(e) => login(e)}>
        <Form.Group className="login-input-field" id="username-field">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text" value={credentials.username} onChange={(e) => {
              setCredentials(prev => ({ ...prev, username: e.target.value }));
            }}
          />
        </Form.Group>
        <Form.Group className="login-input-field" id="password-field">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" value={credentials.password} onChange={(e) => {
              setCredentials(prev => ({ ...prev, password: e.target.value }));
            }}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Login
        </Button>
      </Form>
      <p id="error-msg">{error}</p>
    </>
  );
};

export default Login;
