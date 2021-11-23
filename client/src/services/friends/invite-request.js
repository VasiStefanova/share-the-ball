import { getToken } from '../../common/helpers';
import { USERS_URL } from '../../common/constants';

export const inviteRequest = async (id = 0, toId = 0) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}/friends/${toId}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const message = await response.json();

    return message;
  } catch (error) {
    return error;
  }
};
