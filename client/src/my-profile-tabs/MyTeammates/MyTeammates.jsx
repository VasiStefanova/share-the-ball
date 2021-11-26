/* eslint-disable react/prop-types */
import './MyTeammates.css';
import { useContext, useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import AppContext from '../../context/AppContext';
import getUserDetailsRequest from '../../services/users/get-user-details-request';

const MyTeammates = ({ mountedOn = '' }) => {
  const { user, setUser, toggleFriendship } = useContext(AppContext);
  const [teammates, setTeammates] = useState([]);

  // I use userInfo, not just user to avoid react-state-update-warning upon logging out
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    if (!userInfo.id) return;

    getUserDetailsRequest(userInfo.id)
      .then(userDetails => {
        setUser(userDetails);
        setUserInfo(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
      })
      .catch(console.error);
  }, [toggleFriendship]);

  useEffect(() => {
    if (!userInfo.friends) return;

    setTeammates(userInfo.friends
      .filter(friend => friend.friendshipStatus === 2));
  }, [userInfo]);

  return !teammates.length ?
    <h4>You have no teammates yet :(</h4>:
    <>
      <SearchTeammates setTeammates={setTeammates} mountedOn={mountedOn} />
      <FoundTeammates teammates={teammates} mountedOn={mountedOn} />
    </>;
};

export default MyTeammates;
