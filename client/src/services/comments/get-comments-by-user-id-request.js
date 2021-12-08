import { USERS_URL } from '../../common/constants';
import { getToken } from '../common/helpers';

export const getCommentsByUserIdRequest = async (id = 0) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}/comments`, {
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const comments = await response.json();

    return comments;
  } catch (error) {

    return error;
  }
};
