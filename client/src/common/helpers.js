export const getToken = () => localStorage.getItem('token') || '';

export const checkLoginStatus = () => localStorage.getItem('token')? true : false;

export const getLoggedUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }

  return {};
};

export const isCurrentURL = (searchedTab = '') => {
  const locArr = location.pathname.split('/');
  const lastItem = locArr[locArr.length - 1];
  return lastItem === searchedTab;
};

export const intervalRequest = (func) => setInterval(() => {
  func();
}, 5000);

export const setUserInStorage = (userInfo) => localStorage.setItem('user', JSON.stringify(userInfo));

const getPosition = (options) => {

  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
};

export const getUserLocation = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000
  };

  return getPosition(options)
    .then(position => {
      const coords = [position.coords.latitude, position.coords.longitude];
      return coords;
    });
};

export const hasUserReacted = (reactions = [], username = '') => {
  return reactions.some(like => like.username === username);
};


