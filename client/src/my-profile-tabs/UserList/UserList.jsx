import { useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  return !users.length ?
    <SearchTeammates setTeammates={setUsers} /> :
    <>
      <SearchTeammates setTeammates={setUsers} />
      <FoundTeammates teammates={users} />
    </>;

};

export default UserList;
