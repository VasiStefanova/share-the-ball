import { NBA_STANDINGS_URL } from '../../common/constants';

const nbaStandingsRequest = async () => {
  let dataJSON = null;
  try {
    const response = await fetch(`${NBA_STANDINGS_URL}`, {
    });

    dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err.message);
  }

  return dataJSON;
};

export default nbaStandingsRequest;
