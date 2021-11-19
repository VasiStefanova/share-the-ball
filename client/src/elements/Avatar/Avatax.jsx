/* eslint-disable react/prop-types */
import './Avatar.css';

const Avatar = ({ user }) => {

  return (
    <div className='avatarBox'>
      <img src={`http://localhost:5000/upload/${user.avatar}`} alt={user.username} className='avatarImage' />
      {/* <h3 style={{ color: 'white', margin: '0px' }}>Avatar</h3> */}
    </div>
  );
};

export default Avatar;
