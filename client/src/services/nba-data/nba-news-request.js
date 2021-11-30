import { NBA_NEWS_URL } from '../../common/constants';

const nbaNewsRequest = async () => {
  let dataJSON = null;
  try {
    const response = await fetch(`${NBA_NEWS_URL}`, {
    });

    dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err.message);
  }

  return dataJSON;
};

export default nbaNewsRequest;
