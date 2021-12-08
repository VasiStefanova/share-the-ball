import './MyTeammates.css';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';
import { setUserInStorage } from '../../common/helpers';
import { FRIENDSHIP_STATUS } from '../../common/constants';

const MyTeammates = () => {
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    getUserDetailsRequest(user.id)
      .then(userDetails => {
        setUserInStorage(userDetails);
        setUser(userDetails);
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    if (!user) return;
    const friends = user.friends.filter(teammate => teammate.friendshipStatus === FRIENDSHIP_STATUS.connected);
    setTeammates(friends);
  }, [user]);

  return (!teammates.length ?
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <h4>No teammates found</h4>
    </>:
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <FoundTeammates teammates={teammates} />
    </>
  );
};

export default MyTeammates;
