import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import './ProfileDetails.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateUserRequest } from '../../services/users/update-user-request';
import { logoutRequest } from '../../services/auth/logout-request';
import { useHistory } from 'react-router';

const ProfileDetails = () => {
  const { user, setUser, setLoggedIn } = useContext(AppContext);
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [email, setEmail] = useState(user.email);
  const history = useHistory();


  const handleConfirmEdit = async () => {
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

  return (
    <>
      <div className="profile-details-container">
        <div className="username-box">
          <h5>Username: {user.username}</h5>
        </div>
        {editButtonClicked ?
          <div className="edit-email-box">
            <Form className="change-email-form">
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form>
            <div className="edit-email-buttons">
              <Button
                id="confirm-edit-button" variant="dark" onClick={() => handleConfirmEdit()}
              >
                <i className="bi bi-check-square" />
              </Button>
              <Button id="cancel-edit-button" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
                <i className="bi bi-x-square" />
              </Button>
            </div>
          </div> :
          <div className="user-email-box">
            <h5>E-mail: {user.email}</h5>
            <Button id="edit-email-button" variant="dark" onClick={() => setEditButtonClicked(!editButtonClicked)}>
              <i className="bi bi-pencil" />
            </Button>
          </div>}
        <div className="user-role-box">
          <h5>Role: {user.role === 1 ? 'user' : 'admin'}</h5>
        </div>
        <br /><h6 id="upon-update-text">Upon a successful e-mail/password/avatar update you will be automatically logged out.</h6>
      </div>
    </>
  );
};

export default ProfileDetails;