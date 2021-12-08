import { useEffect, useState, useContext } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import getUsersRequest from '../../services/users/get-users-request';
import './UserList.css';
import AppContext from '../../context/AppContext';

const UserList = () => {

  const [users, setUsers] = useState([]);
  const { toggleFriendship } = useContext(AppContext);

  useEffect(() => {
    getUsersRequest({ count: 100 })
      .then(allUsers => setUsers(allUsers));
  }, [toggleFriendship]);

  return !users.length ?
    <SearchTeammates setTeammates={setUsers} /> :
    <>
      <SearchTeammates setTeammates={setUsers} />
      <FoundTeammates teammates={users} />
    </>;
};

export default UserList;
