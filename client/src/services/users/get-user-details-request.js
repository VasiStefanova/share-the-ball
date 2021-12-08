import { USERS_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

const getUserDetailsRequest = async (id = 0) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    const userDetails = await response.json();

    return userDetails;
  } catch (error) {

    return error;
  }
};

export default getUserDetailsRequest;
