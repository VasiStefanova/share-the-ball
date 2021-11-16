import {USERS_URL} from '../../common/constants';
import {getToken} from '../../common/helpers';

const deleteUserRequest = async (id=0) => {
  const dataJSON = null;
  try {
    const response = await fetch(`${USERS_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err);
  }

  return dataJSON;
};

export default deleteUserRequest;
