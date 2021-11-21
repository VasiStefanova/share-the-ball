/* eslint-disable react/prop-types */
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './SearchedTeammates.css';
import Avatar from '../../elements/Avatar/Avatax';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const SearchedTeammates = ({ teammates }) => {

  return (
    <>
      {teammates.map(teammate =>
        <div
          className='teammate-container-box'
          key={teammate.id}
        >
          <div className='teammate-container'>
            <div className="teammate-username">
              <Avatar user={teammate} />
              <p className='teammate-username'>{teammate.username}</p>
              <p className='teammate-last-updated'>last updated: {new Date(teammate.lastUpdated).toLocaleDateString('en-UK')}</p>
            </div>
            <Button variant='outline-dark'>
              view profile
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

SearchedTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default SearchedTeammates;
