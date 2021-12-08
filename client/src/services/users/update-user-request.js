import { USERS_URL } from '../../common/constants';
import { getToken } from '../../common/helpers';

export const updateUserRequest = async (
  password = '',
  newPassword = '',
  email = '',
  file = '',
  latitude,
  longitude
) => {
  const formData = new FormData();

  if (password && newPassword) {
    formData.append('password', password);
    formData.append('newPassword', newPassword);
  }

  if (email) formData.append('email', email);
  if (file) formData.append('file', file);

  if ((latitude && longitude) || (latitude === 0 && longitude === 0)) {
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
  }

  try {
    const response = await fetch(`${USERS_URL}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${getToken()}`,
      },
      body: formData
    });
    const userDetails = await response.json();

    return userDetails;
  } catch (error) {

    return error;
  }
};


