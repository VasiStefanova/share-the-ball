import {getToken} from '../../../../../MKBL/client/src/common/helpers';
import {POSTS_URL} from '../../common/constants';

export const editPostRequest = async (
    content = '',
    embed = '',
    latitude = 0,
    longitude = 0,
    isPublic = false,
) => {
  const formData = new FormData();

  if (content) formData.append('content', content);
  if (embed) formData.append('embed', embed);
  if (latitude) formData.append('latitude', latitude);
  if (longitude) formData.append('longitude', longitude);
  if (isPublic) formData.append('isPublic', isPublic);

  try {
    const response = await fetch(`${POSTS_URL}`, {
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
