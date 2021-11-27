import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import './FoundTeammates.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';
import { useContext, useState } from 'react';
import ConfirmDeleteUser from '../../admin/DeleteUserModal/ConfirmDeleteUserModal';
import AppContext from '../../context/AppContext';
import { unfriendRequest } from '../../services/friends/unfriend-request';
import ConfirmBanUser from '../../admin/BanUserModal/ConfirmBanUserModal';
import { isCurrentURL } from '../../common/helpers';

const FoundTeammates = ({ teammates }) => {
  const { user, toggleFriendship, setToggleFriendship } = useContext(AppContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);

  const handleUnfriend = (toUser) => {
    unfriendRequest(user.id, toUser.id)
      .then(() => setToggleFriendship(!toggleFriendship))
      .catch(console.error);
  };

  return (
    <>
      {teammates.map(teammate =>
        <div
          className={isCurrentURL('home') ? 'teammate-container-box-home' : 'teammate-container-box'}
          key={teammate.id}
        >
          <div className={isCurrentURL('home') ? 'teammate-container-home' : 'teammate-container'}>
            <div className={isCurrentURL('home') ? 'teammate-avatar-and-info-home' : 'teammate-avatar-and-info'}>
              <Avatar user={teammate} style={{ maxWidth: '5vh' }} />
              <div className={isCurrentURL('home') ? 'teammate-info-box-home' : 'teammate-info-box'}>
                <h5 className={isCurrentURL('home') ? 'teammate-info-home' : 'teammate-info'}>{teammate.username}</h5>
                {!isCurrentURL('home') &&
                  <h6 className='teammate-info last-updated'>
                    last updated: {new Date(teammate.lastUpdated).toLocaleDateString('en-UK')}
                  </h6>}
              </div>
            </div>
            {(!isCurrentURL('home') && !isCurrentURL('teammates')) &&
              <div className='action-btns-group'>
                {teammate.banReason ?
                  <Badge bg='danger'>Banned!</Badge> :
                  <Button
                    className='action-btn'
                    variant='outline-dark'
                    onClick={() => setShowBanModal(true)}
                  >
                    <i className="bi bi-slash-circle-fill" />
                    ban
                  </Button>}
                <Button
                  className='action-btn'
                  variant='outline-dark'
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className="bi bi-x-circle-fill" />
                  delete
                </Button>
              </div>}
            <div className={isCurrentURL('home') ? 'teammate-button-group-home' : 'teammate-button-group'}>
              <Button id="view-user-profile-button" variant='light' onClick={() => history.push(`/user-profile/id=${teammate.id}`)}>
                <i className="bi bi-person-circle" /> View profile
              </Button>
              {(isCurrentURL('teammates') || isCurrentURL('home')) &&
                <Button id="remove-friend-button" variant='light' onClick={() => handleUnfriend(teammate)}>
                  <i className="bi bi-person-dash-fill" />
                </Button>}
            </div>
          </div>
          <ConfirmBanUser userId={teammate.id} username={teammate.username} show={showBanModal} setShow={setShowBanModal} />
          <ConfirmDeleteUser userId={teammate.id} username={teammate.username} show={showDeleteModal} setShow={setShowDeleteModal} />
        </div>
      )}
    </>
  );
};

FoundTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default FoundTeammates;
