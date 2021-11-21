import PropTypes from 'prop-types';
import Figure from 'react-bootstrap/Figure';
import Avatar from '../../elements/Avatar/Avatax';
import './UserDetails.css';


const UserDetails = ({ userInfo }) => {


  return (
    <Figure>
      <Avatar
        user={userInfo}
        style={{
          'max-height': '30vh',
          'max-width': '40vh',
          'border-radius': '30vh'
        }}
      />
      <Figure.Caption className='user-info'>
        <h5>{userInfo.username}</h5>
        <p className='user-text'>email: {userInfo.email}</p>
        <p className='user-text'>last updated on: {new Date(userInfo.lastUpdated).toLocaleDateString('en-UK')}</p>
      </Figure.Caption>
    </Figure>
  );
};

UserDetails.propTypes = {
  userInfo: PropTypes.object
};
export default UserDetails;
