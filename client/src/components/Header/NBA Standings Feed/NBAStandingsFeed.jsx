import { useState, useEffect } from 'react';
import nbaStandingsRequest from '../../../services/nba-data/nba-standings-request';
import Table from 'react-bootstrap/Table';
import Figure from 'react-bootstrap/Figure';
import { TEAM_LOGOS_URL } from '../../../common/constants';
import './NBAStandingsFeed.css';


const NBAStandingsFeedTable = () => {

  const [eastDataTeams, setEastData] = useState([]);
  const [westData, setWestData] = useState([]);

  useEffect(() => {

    const getData = async () => {

      const response = await nbaStandingsRequest();
      setEastData(response.league.standard.conference.east);
      setWestData(response.league.standard.conference.west);
      console.log(eastDataTeams);
    };

    getData();

  }, []);

  return eastDataTeams ?
    <Table className='standings-table' striped bordered hover variant="dark">
      <thead>
        <tr>
          {/* <th>{eastDataTeams[0].teamId}</th> */}
          <th>team</th>
          <th>win</th>
          <th>loss</th>
          <th>pct</th>
        </tr>
      </thead>
      <tbody>
        {eastDataTeams.map(team =>
          <tr key={team.teamId}>
            <td className='team-logos-names'>
              <Figure.Image
                src={TEAM_LOGOS_URL.find(teamlogos => teamlogos.teamId === team.teamId) ? TEAM_LOGOS_URL.find(teamlogos => teamlogos.teamId === team.teamId).logoURL : null}
                roundedCircle
                width={50}
                height={50}
              />
              <span className='single-post-username'>
                {team.teamSitesOnly.teamName}
              </span>
            </td>
            <td>{team.win}</td>
            <td>{team.loss}</td>
            <td>{team.winPct}</td>
          </tr>
        )}
      </tbody>
    </Table> :
    <p>Loading</p>;
};

export default NBAStandingsFeedTable;
