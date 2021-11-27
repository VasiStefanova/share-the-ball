import { getToken } from '../../common/helpers';
import { POSTS_URL } from '../../common/constants';

export const editPostRequest = async (
  id,
  content,
  embed,
  latitude,
  longitude,
  isPublic,
) => {
  const formData = new FormData();

  if (embed) formData.append('embed', embed);
  if (latitude) formData.append('latitude', latitude);
  if (longitude) formData.append('longitude', longitude);
  formData.append('content', content);
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
