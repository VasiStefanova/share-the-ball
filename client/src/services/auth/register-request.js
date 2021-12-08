import { USERS_URL } from '../../common/constants';

export const registerRequest = async (credentials = { username: '', password: '', email: '' }) => {
  const formData = new FormData();

  formData.append('username', credentials.username);
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);

  try {
    const response = await fetch(`${USERS_URL}`, {
      method: 'POST',
      body: formData
    });

    const userDetails = await response.json();
    console.log(userDetails);
    return userDetails;

  } catch (error) {
    return error;
  }
};
