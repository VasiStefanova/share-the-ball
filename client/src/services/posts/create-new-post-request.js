import { getToken } from '../../common/helpers';
import { POSTS_URL } from '../../common/constants';

export const createNewPostRequest = async (
  content = '',
  embed = '',
  file = '',
  latitude = 0,
  longitude = 0,
  isPublic = false,
) => {
  const formData = new FormData();

  if (content) formData.append('content', content);
  if (embed) formData.append('embed', embed);
  if (file) formData.append('file', file);
  if (latitude) formData.append('latitude', latitude);
  if (longitude) formData.append('longitude', longitude);
  formData.append('isPublic', isPublic);

  try {
    const response = await fetch(`${POSTS_URL}`, {
      method: 'POST',
      body: formData,
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
    });

    const postInfo = await response.json();
    console.log(postInfo);

    return postInfo;
  } catch (error) {

    return error;
  }
};
