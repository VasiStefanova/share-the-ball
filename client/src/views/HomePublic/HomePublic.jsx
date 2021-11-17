import LoginAccordion from '../../components/LoginAccordion/LoginAccordion';
import RegisterAccordion from '../../components/RegisterAccordion/RegisterAccordion';
import './HomePublic.css';

const HomePublic = () => {
  return (
    <div className='homePublicContainer'>
      <div className='homePublicLeft'>
        <h1>Left</h1>
      </div>
      <div className='homePublicRight'>
        <LoginAccordion />
        <RegisterAccordion />
      </div>
    </div>
  );
};

export default HomePublic;
