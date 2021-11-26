/* eslint-disable react/prop-types */
import './MyTeammates.css';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import getUsersRequest from '../../services/users/get-users-request';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

const MyTeammates = ({ mountedOn = '' }) => {
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);
  // I use userInfo, not just user to avoid react-state-update-warning upon logging out
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    getUserDetailsRequest(user.id)
      .then(userDetails => {
        setUserInfo(userDetails);
        setUser(userDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    getUsersRequest()
      .then(allUsers => {
        return allUsers
          .filter(({ id: userId }) => userInfo.friends
            .some(({ id: teammateId }) => userId === teammateId));
      })
      .then(teammatesList => setTeammates(teammatesList))
      .catch(console.error);
  }, [userInfo]);

  return !teammates.length ?
    <h4>You have no teammates yet :(</h4>:
    <>
      <SearchTeammates setTeammates={setTeammates} mountedOn={mountedOn} />
      <FoundTeammates teammates={teammates} mountedOn={mountedOn} />
    </>;
};

export default MyTeammates;
