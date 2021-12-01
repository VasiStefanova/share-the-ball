import { FEED_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const deltaRequest = async (
  createdOrUpdatedAfter = '',
  trackingPosts = '',
) => {
  const queryParams = [];

  queryParams.push(`createdOrUpdatedAfter=${createdOrUpdatedAfter}`);
  if (trackingPosts) queryParams.push(`trackingPosts=${trackingPosts}`);

  const queryURL = `?${queryParams.join('&')}`;

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
