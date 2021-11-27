import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import getUsersRequest from '../../services/users/get-users-request';


const Teammates = ({ userId }) => {
  const { user, toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);

  // I use userInfo, not just user to avoid react-state-update-warning upon logging out
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    getUserDetailsRequest(userId)
      .then(userDetails => {
        setUserInfo(userDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUsersRequest()
      .then(allUsers => {
        return allUsers
          .filter(({ id: currUserId }) => userInfo.friends
            .some(({ id: teammateId, friendshipStatus }) => currUserId === teammateId && friendshipStatus === 2));
      })
      .then(teammatesList => setTeammates(teammatesList))
      .catch(console.error);

    return () => setTeammates([]);
  }, [userInfo]);


  return teammates.length ?
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <FoundTeammates teammates={teammates} />
    </>:
    <h3 className='theme-text-style' style={{ marginTop: '1vh' }}>You have no teammates yet :(</h3>;
};

Teammates.propTypes = {
  userId: PropTypes.string,
};

export default Teammates;
