import SearchTeammates from '../../components/SearchTeammates/SearchTeammates';
import { useState } from 'react';
import FoundTeammates from '../../components/FoundTeammates/FoundTeammates';

const SearchTeammatesView = () => {
  const [teammates, setTeammates] = useState([]);

  return !teammates.length ?
    <SearchTeammates setTeammates={setTeammates} /> :
    <>
      <SearchTeammates setTeammates={setTeammates} />
      <FoundTeammates teammates={teammates} />
    </>;
};

export default SearchTeammatesView;
