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
    <div className='profile-details-container'>
      <table className='table table-striped table-dark profile-details-table'>
        <tbody>
          <tr className='profile-details-table-row'>
            <td>
              <h5 className='theme-text-style '>Username:</h5>
            </td>
            <td>
              <h5 className='theme-text-style '>{user.username}</h5>
            </td>
            <td />
          </tr>
          <tr className='profile-details-table-row'>
            <td>
              <h5 className='theme-text-style '>Role:</h5>
            </td>
            <td>
              <h5 className='theme-text-style '>{user.role === 1 ? 'User' : 'Admin'}</h5>
            </td>
            <td />
          </tr>
          <tr className='profile-details-table-row'>
            <td>
              <h5 className='theme-text-style '>Email:</h5>
            </td>
            <td>
              {editButtonClicked ?
                <div className="edit-email-box">
                  <Form className="change-email-form">
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form>
                  <div className="edit-email-buttons">
                    <Button
                      id="confirm-edit-button" variant="outline-dark" onClick={() => handleEmailUpdate()}
                    >
                      <i className="bi bi-check-square" />
                    </Button>
                    <Button id="cancel-edit-button" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
                      <i className="bi bi-x-square" />
                    </Button>
                  </div>
                </div> :
                <h5 className='theme-text-style '>{user.email}</h5>}
            </td>
            <td>
              {!editButtonClicked &&
                <Button id="edit-email-button" className="theme-btn-style" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
                  <i className="bi bi-pencil" />
                </Button>}
            </td>
          </tr>
          <tr className='profile-details-table-row'>
            <td>
              <h5 className='theme-text-style '>Location:</h5>
            </td>
            <td>
              {userHasSetLocation(user) ?
                <h5 className='theme-text-style '>*Put location here* </h5>:
                <h5 className='theme-text-style'>No location set </h5>}
            </td>
            <td>
              {userHasSetLocation(user) ?
                <Button className="profile-details-buttons theme-btn-style" variant="dark" onClick={() => forgetLocation()}>
                  Forget!
                </Button> :
                <Button className="profile-details-buttons theme-btn-style" variant="dark" disabled={updatingLocation} onClick={() => handleLocationUpdate()}>
                  {updatingLocation ? 'Getting your location...' : 'Update!'}
                </Button>}
            </td>
          </tr>
        </tbody>
      </table>
      <h6 className='upon-update-text theme-text-style theme-background-color'>Upon a successful e-mail/password/avatar update you will be automatically logged out.</h6>
    </div>
  );
};

export default ProfileDetails;
