import { useEffect, useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import getUsersRequest from '../../services/users/get-users-request';
import './UserList.css';

const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersRequest()
      .then(allUsers => setUsers(allUsers));
  }, []);

  return !users.length ?
    <SearchTeammates setTeammates={setUsers} /> :
    <>
      <SearchTeammates setTeammates={setUsers} />
      <FoundTeammates teammates={users} />
    </>;

};

export default UserList;
