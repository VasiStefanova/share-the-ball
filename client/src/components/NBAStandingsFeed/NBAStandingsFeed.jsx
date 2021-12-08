import { useState, useEffect } from 'react';
import nbaStandingsRequest from '../../services/nba-data/nba-standings-request';
import './NBAStandingsFeed.css';
import NBAStandingsFeedTable from '../NBAStandingsTable/NBAStandingsTable';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import LoadingIndicator from '../../elements/LoadingIndicator/LoadingIndicator';

const NBAStandingsFeed = () => {
  const [eastDataTeams, setEastData] = useState([]);
  const [westDataTeams, setWestData] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(true);

  const getData = async () => {
    const response = await nbaStandingsRequest();
    const { east, west } = response.league.standard.conference;
    setEastData(east);
    setWestData(west);
    setDataTeams(east);
  };
  useEffect(() => {
    getData();
  }, [setDataTeams]);

  return (
    <div className='standings-feed theme-border-style'>
      {dataTeams.length ?
        <>
          <ButtonGroup className='standings-feed-button-box theme-button-group-style' size="lg">
            <Button
              style={{ marginRight: '1vw' }}
              className="standings-button" variant="outline-dark" active={buttonPressed} onClick={() => setDataTeams(eastDataTeams)}
            >EASTERN
            </Button>
            <Button
              className="standings-button" variant="outline-dark" onClick={() => {
                setButtonPressed(false);
                setDataTeams(westDataTeams);
              }}
            >WESTERN
            </Button>
          </ButtonGroup>
          <NBAStandingsFeedTable dataTeams={dataTeams} />
        </> :
        <LoadingIndicator />}
    </div>
  );
};

export default NBAStandingsFeed;
