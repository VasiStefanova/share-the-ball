import { getToken } from '../../common/helpers';
import { USERS_URL } from '../../common/constants';

export const getPostsByUserIdRequest = async (id = 0, page = 0, count = 0) => {
  const queryParams = [];

  if (page) queryParams.push(`page=${page}`);
  if (count) queryParams.push(`count=${count}`);

  const queryURL = queryParams.length? `?${queryParams.join('&')}` : '';

  try {
    const response = await fetch(`${USERS_URL}/${id}/posts${queryURL}`, {
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const posts = await response.json();

    return posts;
  } catch (error) {

    return error;
  }
};
