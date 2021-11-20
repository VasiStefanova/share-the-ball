import { FEED_URL } from '../../common/constants';

export const getPopularPostsRequest = async () => {
  try {
    const response = await fetch(`${FEED_URL}/popular`);

    const posts = await response.json();

    return posts;
  } catch (error) {
    return error;
  }
};
