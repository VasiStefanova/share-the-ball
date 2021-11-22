import PropTypes from 'prop-types';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';


const Teammates = ({ teammates }) => {

  return ( teammates.length?
    <FoundTeammates teammates={teammates} /> :
    'No teammates to show!'
  );
};

Teammates.propTypes = {
  teammates: PropTypes.array,
};

export default Teammates;
