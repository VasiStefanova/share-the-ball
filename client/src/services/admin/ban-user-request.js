import {USERS_URL} from '../../common/constants';
import {getToken} from '../../common/helpers';

const banUserRequest = async (id=0, body) => {
  const dataJSON = null;
  try {
    const response = await fetch(`${USERS_URL}/${id}/ban`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err);
  }

  return dataJSON;
};

export default banUserRequest;
