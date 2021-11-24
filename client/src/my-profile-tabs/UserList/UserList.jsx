import { useState } from 'react';
import ShowAllUsers from '../../admin/ShowAllUsers';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';
import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import './UserList.css';

const UserList = () => {

  return <ShowAllUsers />;
  // !users.length ?
  //   <SearchTeammates setTeammates={setUsers} /> :
  //   <>
  //     <SearchTeammates setTeammates={setUsers} />
  //     <FoundTeammates teammates={users} />
  //   </>;

};

export default UserList;
