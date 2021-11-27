import PropTypes from 'prop-types';
import './FoundTeammates.css';
import SingleUserBox from '../../elements/SingleUserBox/SingleUserBox';

const FoundTeammates = ({ teammates }) => {

  return (
    <>
      {teammates.map(teammate =>
        <SingleUserBox key={teammate.id} teammate={teammate} />
      )}
    </>
  );
};

FoundTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default FoundTeammates;
