import { USERS_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

const banUserRequest = async (id=0, body) => {
  let dataJSON = null;
  try {
    const response = await fetch(`${USERS_URL}/${id}/ban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err);
  }

  return dataJSON;
};

export default banUserRequest;
