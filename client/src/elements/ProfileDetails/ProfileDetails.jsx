import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import './ProfileDetails.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateUserRequest } from '../../services/users/update-user-request';
import { logoutRequest } from '../../services/auth/logout-request';
import { useHistory } from 'react-router';
import { setUserInStorage, updateUserLocation, userHasSetLocation } from '../../common/helpers';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

const ProfileDetails = () => {
  const { user, setUser, setLoggedIn } = useContext(AppContext);
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const history = useHistory();


  const handleEmailUpdate = async () => {
    await updateUserRequest('', '', email);
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

  const handleLocationUpdate = async () => {
    setUpdatingLocation(true);
    await updateUserLocation(user.id, setUser);
    setUpdatingLocation(false);
  };

  const forgetLocation = async () => {
    await updateUserRequest('', '', '', '', 0, 0);
    const userDetails = await getUserDetailsRequest(user.id);
    setUser(userDetails);
    setUserInStorage(userDetails);
  };

  return (
    <>
      <div className="profile-details-container">
        <div className="username-box">
          <h5 className='theme-text-style'>Username: {user.username}</h5>
        </div>
        {editButtonClicked ?
          <div className="edit-email-box">
            <Form className="change-email-form">
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form>
            <div className="edit-email-buttons">
              <Button
                id="confirm-edit-button" variant="dark" onClick={() => handleEmailUpdate()}
              >
                <i className="bi bi-check-square" />
              </Button>
              <Button id="cancel-edit-button" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
                <i className="bi bi-x-square" />
              </Button>
            </div>
          </div> :
          <div className="user-email-box">
            <h5 className='theme-text-style'>E-mail: {user.email}</h5>
            <Button id="edit-email-button" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
              <i className="bi bi-pencil" />
            </Button>
          </div>}
        <div className="user-role-box">
          <h5 className='theme-text-style'>Role: {user.role === 1 ? 'user' : 'admin'}</h5>
        </div>
        {userHasSetLocation(user) ?
          <div className="user-location-box">
            <h5 className='user-location-text theme-text-style '>Location: *Put location here* </h5>
            <Button className="profile-details-buttons" variant="dark" onClick={() => forgetLocation()}>
              Forget location
            </Button>
          </div> :
          <div className="user-location-box">
            <h5 className='user-location-text theme-text-style'>No location set </h5>
            <Button className="profile-details-buttons" variant="dark" disabled={updatingLocation} onClick={() => handleLocationUpdate()}>
              {updatingLocation ? 'Getting your location...' : 'Update location'}
            </Button>
          </div>}

        <h6 id="upon-update-text" className='theme-text-style'>Upon a successful e-mail/password/avatar update you will be automatically logged out.</h6>
      </div>
    </>
  );
};

export default ProfileDetails;
