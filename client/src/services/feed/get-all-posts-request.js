import { FEED_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const getAllPostsRequest = async (
  page = '',
  count = '',
  distance = '',
) => {
  const queryParams = [];

  if (page) queryParams.push(`page=${page}`);
  if (count) queryParams.push(`count=${count}`);
  if (distance) queryParams.push(`distance=${distance}`);

  const queryURL = queryParams.length ? `?${queryParams.join('&')}` : '';

  try {
    const response = await fetch(`${FEED_URL}/${queryURL}`, {
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
