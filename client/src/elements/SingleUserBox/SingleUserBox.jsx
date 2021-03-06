import { isCurrentURL, setUserInStorage } from '../../common/helpers';
import PropTypes from 'prop-types';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import ConfirmDeleteUser from '../../admin/DeleteUserModal/ConfirmDeleteUserModal';
import AppContext from '../../context/AppContext';
import ConfirmBanUser from '../../admin/BanUserModal/ConfirmBanUserModal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import './SingleUserBox.css';
import UnfriendButton from '../UnfriendButton/UnfriendButton';
import ToggleFriendshipButton from '../ToggleFriendshipButton/ToggleFriendshipButton';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

const SingleUserBox = ({ teammate }) => {
  const history = useHistory();
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [person, setPerson] = useState(teammate);

  useEffect(() => {
    getUserDetailsRequest(person.id)
      .then(details => {
        setPerson(details);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUserDetailsRequest(user.id)
      .then(userDetails => {
        setUser(userDetails);
        setUserInStorage(userDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  return (
    <div
      className={isCurrentURL('home') ? 'teammate-container-box-home theme-background-color' : 'teammate-container-box theme-background-color'}
      key={teammate.id}
    >
      <div className={isCurrentURL('home') ? 'teammate-container-home' : 'teammate-container'}>
        <div className={isCurrentURL('home') ? 'teammate-avatar-and-info-home' : 'teammate-avatar-and-info'}>
          <Avatar user={teammate} style={{ width: '5vh', height: '5vh' }} />
          <div className={isCurrentURL('home') ? 'teammate-info-box-home' : 'teammate-info-box'}>
            <h5 className={isCurrentURL('home') ? 'teammate-info-home' : 'teammate-info'}>{teammate.username}</h5>
          </div>
        </div>
        <div className={isCurrentURL('home') ? 'teammate-button-group-home' : 'teammate-button-group'}>
          {isCurrentURL('user_list') && teammate.username !== 'admin' &&
            <>
              {teammate.banReason ?
                <Badge className="banned-user-badge" bg='danger'>Banned!</Badge> :
                <Button
                  className='action-btn theme-btn-style'
                  variant='outline-dark'
                  onClick={() => setShowBanModal(true)}
                >
                  <i className="bi bi-slash-circle-fill" />
                  Ban
                </Button>}
              <Button
                className='action-btn theme-btn-style'
                variant='outline-dark'
                onClick={() => setShowDeleteModal(true)}
              >
                <i className="bi bi-x-circle-fill" />
                Delete
              </Button>
            </>}
          {isCurrentURL('search') &&
            <ToggleFriendshipButton user={user} targetUser={person} />}
          <Button className="view-user-profile-button theme-btn-style" variant='outline-dark' onClick={() => history.push(`/user-profile/id=${teammate.id}/posts`)}>
            <i className="bi bi-person-circle" /> View profile
          </Button>
          {isCurrentURL('my-teammates') &&
            <UnfriendButton user={user} targetUser={teammate} />}
        </div>
      </div>
      <ConfirmBanUser userId={teammate.id} username={teammate.username} show={showBanModal} setShow={setShowBanModal} />
      <ConfirmDeleteUser userId={teammate.id} username={teammate.username} show={showDeleteModal} setShow={setShowDeleteModal} />
    </div>
  );
};

SingleUserBox.propTypes = {
  teammate: PropTypes.object,
};

export default SingleUserBox;
