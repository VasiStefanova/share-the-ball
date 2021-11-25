import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './FoundTeammates.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';
import decode from 'jwt-decode';
import { useState } from 'react';
import ConfirmDeleteUser from '../../admin/ConfirmDeleteUserModal';


const FoundTeammates = ({ teammates }) => {
  const history = useHistory();
  const [render, setRender] = useState({});
  const [show, setShow] = useState(false);

  // should use the user from the context below instead of
  // getting the token from local storage, to be refactored
  // once the user is set correctly in the context

  // const loggedUserToken = localStorage.getItem('token');
  // const loggedUserId = decode(loggedUserToken)?.id;


  return (
    <>
      {teammates.map(teammate =>
        <div
          className='teammate-container-box'
          key={teammate.id}
        >
          <div className='teammate-container'>
            <div className='teammate-avatar-and-info'>
              <Avatar user={teammate} style={{ maxWidth: '5vh' }} />
              <div className='teammate-info-box'>
                <h5 className='teammate-info'>{teammate.username}</h5>
                <h6 className='teammate-info last-updated'>last updated: {new Date(teammate.lastUpdated).toLocaleDateString('en-UK')}</h6>
              </div>
            </div>
            <div className='action-btns-group'>
              <Button
                className='action-btn'
                variant='outline-dark'
              >
                <i className="bi bi-slash-circle-fill" />
                ban
              </Button>
              <Button
                className='action-btn'
                variant='outline-dark'
                onClick={() => setShow(true)}
              >
                <i className="bi bi-x-circle-fill" />
                delete
              </Button>
              <Button
                className='action-btn'
                variant='outline-dark'
                onClick={() => history.push(`/user-profile/id=${teammate.id}`)}
              >
                view profile
              </Button>
            </div>
            <ConfirmDeleteUser userId={teammate.id} username={teammate.username} show={show} setShow={setShow} />
          </div>
        </div>
      )}
    </>
  );
};

FoundTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default FoundTeammates;
