import {COMMENTS_URL} from '../../common/constants';
import {getToken} from '../common/helpers';

export const reactToCommentRequest = async (id = 0, reaction = 0) => {
  try {
    const response = await fetch(`${COMMENTS_URL}/${id}/react`, {
      method: 'PUT',
      body: JSON.stringify({reaction: reaction}),
      headers: {
        'authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const message = await response.json();

    return message;
  } catch (error) {
    return error;
  }
};
