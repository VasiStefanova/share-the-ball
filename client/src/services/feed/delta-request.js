import { FEED_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const deltaRequest = async (
  createdOrUpdatedAfter = Date.now(),
  trackingPosts = '',
) => {
  const queryParams = [];

  queryParams.push(`createdOrUpdatedAfter=${createdOrUpdatedAfter}`);
  if (trackingPosts) queryParams.push(`trackingPosts=${trackingPosts}`);

  const queryURL = `?${queryParams.join('&')}`;

  try {
    const response = await fetch(`${FEED_URL}/delta/${queryURL}`, {
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    return data.posts;
  } catch (error) {
    return error;
  }
};
