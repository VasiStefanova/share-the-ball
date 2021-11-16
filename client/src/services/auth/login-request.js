import {LOGIN_URL} from '../../common/constants';

const loginRequest = async (body) => {
  let dataJSON = null;
  try {
    const response = await fetch(`${LOGIN_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    dataJSON = await response.json();
    console.log(dataJSON);
  } catch (err) {
    console.error(err.message);
  }

  return dataJSON;
};

export default loginRequest;
