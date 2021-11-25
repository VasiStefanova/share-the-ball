import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import './ChangeAvatar.css';
import UploadFileButton from './../UploadFileButton/UploadFileButton';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { updateUserRequest } from '../../services/users/update-user-request';
import { useHistory } from 'react-router';
import { logoutRequest } from '../../services/auth/logout-request';


const ChangeAvatar = () => {
  const { user, setUser, setLoggedIn } = useContext(AppContext);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleConfirm = async () => {
    await updateUserRequest('', '', '', file);
    setFile(null);
    setAvatarPreview(null);

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
      {avatarPreview ?
        <div className="avatar-preview-container">
          <Image roundedCircle src={avatarPreview} alt={user.username} className="avatar-preview" />
        </div>:
        <div className="current-avatar-container">
          <Image roundedCircle src={`http://localhost:5000/${user.avatar}`} alt={user.username} className="avatar-preview" />
        </div>}
      <div className="change-avatar-button-group">
        <UploadFileButton
          buttonText="Choose file"
          buttonId="change-avatar-upload-button"
          style={{ background: 'black', color: 'white' }}
          onChange={(e) => handleFileChange(e)}
        />
        {avatarPreview &&
          <Button
            id="remove-prievew-button" variant="dark" onClick={() => {
              setAvatarPreview(null);
              setFile(null);
            }}
          ><i className="bi bi-trash" />
          </Button>}
        {avatarPreview &&
          <Button id="confirm-avatar-change-button" variant="dark" onClick={() => handleConfirm()}>Confirm</Button>}
      </div>
    </>
  );

};

export default ChangeAvatar;
