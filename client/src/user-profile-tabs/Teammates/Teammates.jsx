import PropTypes from 'prop-types';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';


const Teammates = ({ teammates }) => {

  const friends = teammates.filter(friend => friend.friendshipStatus === 2);
  return ( friends.length?
    <FoundTeammates teammates={friends} /> :
    'No teammates to show!'
  );
};

Teammates.propTypes = {
  teammates: PropTypes.array,
};

export default Teammates;
