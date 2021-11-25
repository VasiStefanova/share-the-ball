import './ChangeCredentialsAccordion.css';
import Accordion from 'react-bootstrap/Accordion';
import ProfileDetails from '../../elements/ProfileDetails/ProfileDetails';
import ChangePassword from '../../elements/ChangePassword/ChangePassword';
import ChangeAvatar from '../../elements/ChangeAvatar/ChangeAvatar';

const ChangeCredentialsAccordion = () => {
  return (
    <Accordion defaultActiveKey="0" className='change-credentials-accordion'>
      <Accordion.Item eventKey="0" className='change-credentials-accordion-item theme-accordion-style'>
        <Accordion.Header>Profile details</Accordion.Header>
        <Accordion.Body>
          <ProfileDetails />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className='change-credentials-accordion-item theme-accordion-style'>
        <Accordion.Header>Change password</Accordion.Header>
        <Accordion.Body>
          <ChangePassword />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='change-credentials-accordion-item theme-accordion-style'>
        <Accordion.Header>Update avatar</Accordion.Header>
        <Accordion.Body>
          <ChangeAvatar />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ChangeCredentialsAccordion;
