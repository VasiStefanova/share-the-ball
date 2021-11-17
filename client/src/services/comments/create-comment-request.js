import { POSTS_URL } from '../../common/constants';
import { getToken } from '../common/helpers';

export const createCommentRequest = async (
  id = 0,
  content = '',
  embed = '',
) => {
  const formData = new FormData();

  if (content) formData.append('content', content);
  if (embed) formData.append('embed', embed);

  try {
    const response = await fetch(`${POSTS_URL}/${id}/comments`, {
      method: 'POST',
      body: formData,
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const commentDetails = await response.json();

    return commentDetails;
  } catch (error) {
    return error;
  }
};
