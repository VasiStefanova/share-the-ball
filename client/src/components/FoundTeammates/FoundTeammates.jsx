import PropTypes from 'prop-types';
import './FoundTeammates.css';
import SingleUserBox from '../../elements/SingleUserBox/SingleUserBox';
import { isCurrentURL } from '../../common/helpers';
import BackToTopButton from '../../elements/BackToTopButton/BackToTopButton';

const FoundTeammates = ({ teammates }) => {

  return (
    <>
      {teammates.map(teammate =>
        <SingleUserBox key={teammate.id} teammate={teammate} />
      )}
      {isCurrentURL('search') &&
        <BackToTopButton offsetRight="10vw" />}
    </>
  );
};

FoundTeammates.propTypes = {
  teammates: PropTypes.array,
};

export default FoundTeammates;
