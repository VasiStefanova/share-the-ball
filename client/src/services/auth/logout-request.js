import { LOGOUT_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const logoutRequest = async () => {
  try {
    const response = await fetch(`${LOGOUT_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    console.log(response);
    const message = await response.json();
    return message;
  } catch (error) {
    return error;
  };
};
