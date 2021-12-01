import { getToken } from '../../common/helpers';
import { POSTS_URL } from '../../common/constants';

export const editPostRequest = async (
  id,
  content,
  file,
  embed,
  latitude,
  longitude,
  isPublic,
) => {
  const formData = new FormData();

  if (embed) formData.append('embed', embed);
  if (latitude) formData.append('latitude', latitude);
  if (longitude) formData.append('longitude', longitude);
  if (content) formData.append('content', content);
  if (file) {
    formData.append('file', file);
  } else if (!embed) {
    formData.append('embed', 'deleted');
  }

  formData.append('isPublic', isPublic);

  try {
    const response = await fetch(`${POSTS_URL}/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const postInfo = await response.json();

    return postInfo;
  } catch (error) {
    return error;
  }
};
