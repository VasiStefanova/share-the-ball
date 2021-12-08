import { COMMENTS_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const deleteCommentRequest = async (id = 0) => {
  try {
    const response = await fetch(`${COMMENTS_URL}/${id}`, {
      method: 'DELETE',
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
