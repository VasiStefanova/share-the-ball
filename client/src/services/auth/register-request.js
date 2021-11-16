import {USERS_URL} from '../../common/constants';

const registerRequest = async (body) => {
  let dataJSON = null;
  try {
    const response = await fetch(`${USERS_URL}`, {
      method: 'POST',
      body,
    });

    dataJSON = await response.json();
  } catch (err) {
    console.error(err.message);
  }

  return dataJSON;
};

export default registerRequest;

