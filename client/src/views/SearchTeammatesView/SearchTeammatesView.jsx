import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import { useState } from 'react';
import SearchedTeammates from '../../components/SearchedTeammates/SearchedTeammates';

const SearchTeammatesView = () => {
  const [teammates, setTeammates] = useState([]);
  console.log('View re-rendered');


  return !teammates.length ?
    <SearchTeammates setTeammates={setTeammates} /> :
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <SearchedTeammates teammates={teammates} />
    </>;
};

export default SearchTeammatesView;
