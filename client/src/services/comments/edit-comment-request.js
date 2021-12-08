import { COMMENTS_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const editCommentRequest = async (id = 0, content = '', embed = '', file) => {
  const formData = new FormData();

  if (content) formData.append('content', content);
  if (embed) formData.append('embed', embed);
  formData.append('file', file);

  try {
    const response = await fetch(`${COMMENTS_URL}/${id}`, {
      method: 'PUT',
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
