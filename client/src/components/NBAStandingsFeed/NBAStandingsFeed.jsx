import { useState, useEffect } from 'react';
import nbaStandingsRequest from '../../services/nba-data/nba-standings-request';
import './NBAStandingsFeed.css';
import NBAStandingsFeedTable from '../NBAStandingsTable/NBAStandingsTable';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import LoadingIndicator from '../../elements/LoadingIndicator/LoadingIndicator';


const NBAStandingsFeed = () => {

  const [eastDataTeams, setEastData] = useState([]);
  const [westDataTeams, setWestData] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(true);

  const getData = async () => {

    const response = await nbaStandingsRequest();
    // Need to ask a trainer about this piece of code below //
    // I suspect that setState() is async//

    // setEastData(response.league.standard.conference.east);
    // setWestData(response.league.standard.conference.west);
    // setDataTeams(eastDataTeams);
    const { east, west } = response.league.standard.conference;
    setEastData(east);
    setWestData(west);
    setDataTeams(east);
  };
  useEffect(() => {
    getData();
  }, [setDataTeams]);

  return (
    <div className='standings-feed'>
      {dataTeams.length ?
        <>
          <ButtonGroup className='standings-feed-button-box' size="lg">
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
