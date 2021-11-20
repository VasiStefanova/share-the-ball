import { USERS_URL } from '../../common/constants';

const getUsersRequest = async (queryParamsObj={}) => {
  let queryParams = '';
  const paramEntries = Object.entries(queryParamsObj);
  if (paramEntries.length) {
    const queryValues = paramEntries
      .map((pair) => `${pair[0]}=${pair[1]}`)
      .join('&');
    queryParams =`?${queryValues}`;
  }

  let dataJSON = null;
  try {
    const response = await fetch(`${USERS_URL}${queryParams}`);

    dataJSON = await response.json();
  } catch (err) {
    console.error(err);
  }

  return dataJSON;
};

export default getUsersRequest;
