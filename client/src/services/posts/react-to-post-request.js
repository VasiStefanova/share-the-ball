import { getToken } from '../../common/helpers';
import { POSTS_URL } from '../../common/constants';

export const reactToPostRequest = async (id = 0, reaction = 0) => {

  try {
    const response = await fetch(`${POSTS_URL}/${id}/react`, {
      method: 'PUT',
      body: JSON.stringify({ reaction: reaction }),
      headers: {
        'authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
    });

    const post = await response.json();

    return post;
  } catch (error) {
    return error;
  }
};
