import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import getUsersRequest from '../../services/users/get-users-request';


const Teammates = ({ userId }) => {
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);

  // I use userInfo, not just user to avoid react-state-update-warning upon logging out
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    getUserDetailsRequest(userId)
      .then(userDetails => {
        setUserInfo(userDetails);
        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUsersRequest()
      .then(allUsers => {
        return allUsers
          .filter(({ id: currUserId }) => userInfo.friends
            .some(({ id: teammateId }) => currUserId === teammateId));
      })
      .then(teammatesList => setTeammates(teammatesList))
      .catch(console.error);
  }, [userInfo]);


  return !teammates.length ?
    <h4>You have no teammates yet :(</h4>:
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <FoundTeammates teammates={teammates} />
    </>;
};

Teammates.propTypes = {
  userId: PropTypes.number,
};

export default Teammates;
