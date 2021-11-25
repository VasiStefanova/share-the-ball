import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './FoundTeammates.css';
import Avatar from '../../elements/Avatar/Avatax';
import { useHistory } from 'react-router';


const FoundTeammates = ({ teammates }) => {
  const history = useHistory();

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
            <Button variant='outline-dark' onClick={() => history.push(`/user-profile/id=${teammate.id}`)}>
              view profile
            </Button>
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
