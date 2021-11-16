import {LOGOUT_URL} from '../../common/constants';
import {getToken} from '../../common/helpers';

const logoutRequest = async () => {
  let dataJSON = null;
  try {
    const response = await fetch(`${LOGOUT_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    console.log(response);
    dataJSON = await response.json();
  } catch (err) {
    console.error(err.message);
  }

  return dataJSON;
};

export default logoutRequest;
