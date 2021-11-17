import { LOGIN_URL } from '../../common/constants';

export const loginRequest = async (credentials = { username: '', password: '' }) => {
  try {
    const response = await fetch(`${LOGIN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const user = await response.json();
    return user;
  } catch (error) {
    return error;
  }
};
