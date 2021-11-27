import './LoginAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import Login from '../Login/Login';
import Register from '../Register/Register';

const LoginAccordion = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0" className='login-accordion-item theme-accordion-style'>
        <Accordion.Header>Login</Accordion.Header>
        <Accordion.Body>
          <Login />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className='login-accordion-item theme-accordion-style'>
        <Accordion.Header>Register</Accordion.Header>
        <Accordion.Body>
          <Register />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default LoginAccordion;
