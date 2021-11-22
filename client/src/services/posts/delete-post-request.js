import { getToken } from '../../common/helpers';
import { POSTS_URL } from '../../common/constants';

export const deletePostRequest = async (id = 0) => {
  try {
    const response = await fetch(`${POSTS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const post = await response.json();

    return post;
  } catch (error) {
    return error;
  }
};
