import Table from 'react-bootstrap/Table';
import Figure from 'react-bootstrap/Figure';
import { TEAM_LOGOS_URL } from '../../common/constants.js';
import './NBAStandingsTable.css';
import PropTypes from 'prop-types';


const NBAStandingsFeedTable = ({ dataTeams }) => {


  return (
    <Table className='standings-table' striped bordered hover variant="dark" size='sm'>
      <thead>
        <tr>
          <th className='table-heading'>TEAM</th>
          <th className='table-heading-sm'>W</th>
          <th className='table-heading-sm'>L</th>
          <th className='table-heading-lg'>L10</th>
          <th className='table-heading-lg'>PCT</th>
        </tr>
      </thead>
      <tbody>
        {dataTeams.map(team =>
          <tr key={team.teamId} className='standings-table-tr'>
            <td className='standings-table-td-team'>
              <div className='team-logo-name'>
                <span className='team-logo-box'>
                  <img
                    src={
                      TEAM_LOGOS_URL.find(teamlogos => teamlogos.teamId === team.teamId) ?
                        TEAM_LOGOS_URL.find(teamlogos => teamlogos.teamId === team.teamId).logoURL :
                        null
                    }
                    className='team-logo'
                  />
                </span>
                <span className='team-name'>
                  {team.teamSitesOnly.teamName + ' ' + team.teamSitesOnly.teamNickname}
                </span>
              </div>
            </td>
            <td className='standings-table-td'>{team.win}</td>
            <td className='standings-table-td'>{team.loss}</td>
            <td className='standings-table-td'>{team.lastTenWin} - {team.lastTenLoss}</td>
            <td className='standings-table-td'>{team.winPct}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

NBAStandingsFeedTable.propTypes = {
  dataTeams: PropTypes.array
};

export default NBAStandingsFeedTable;
