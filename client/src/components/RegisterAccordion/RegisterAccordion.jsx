import './RegisterAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { React, useState } from 'react';
import { registerRequest } from '../../services/auth/register-request';

const RegisterAccordion = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });


  const register = async (e) => {
    e.preventDefault();

    await registerRequest(credentials);
    setCredentials({ username: '', password: '', email: '' });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Register</Accordion.Header>
          <Accordion.Body>
            <Form className="registerForm" onSubmit={(e) => register(e)}>
              <Form.Group className="registerInputField">
                <Form.Control
                  type="text" placeholder="Username" value={credentials.username} onChange={(e) => {
                    setCredentials(prev => ({ ...prev, username: e.target.value }));
                  }}
                />
                <Form.Text>
                  Length must be between 4 and 40 characters
                </Form.Text>
              </Form.Group>

              <Form.Group className="registerInputField">
                <Form.Control
                  type="password" placeholder="Password" value={credentials.password} onChange={(e) => {
                    setCredentials(prev => ({ ...prev, password: e.target.value }));
                  }}
                />
                <Form.Text>
                  Length must be between 6 and 40 characters
                </Form.Text>
              </Form.Group>

              <Form.Group className="registerInputField">
                <Form.Control
                  type="email" placeholder="Email adress" value={credentials.email} onChange={(e) => {
                    setCredentials(prev => ({ ...prev, email: e.target.value }));
                  }}
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Register
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default RegisterAccordion;
