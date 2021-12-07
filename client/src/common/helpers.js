import getUserDetailsRequest from '../services/users/get-user-details-request';
import { updateUserRequest } from '../services/users/update-user-request';

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

export const intervalRequest = (func, milliseconds) => setInterval(() => {
  func();
}, milliseconds);

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
    })
    .catch(error => console.log(error.message));
};

export const hasUserReacted = (reactions = [], username = '') => {
  return reactions.some(like => like.username === username);
};

export const updateUserLocation = async (userId, setUser) => {
  // if the user denies use of his location
  if (!await getUserLocation()) return;

  // if the user accepts use of his location
  const [latitude, longitude] = await getUserLocation();

  await updateUserRequest('', '', '', '', latitude, longitude);
  const userDetails = await getUserDetailsRequest(userId);
  setUser(userDetails);
  setUserInStorage(userDetails);
};

export const userHasSetLocation = (user) => {
  if (user.latitude && user.longitude) return true;

  return false;
};

export const isYouTubeUrl = (url) => {
  if (url?.includes('youtube.com/watch?v=')) return true;

  return false;
};

export const getVideoId = (videoUrl) => {
  if (!isYouTubeUrl(videoUrl)) return '';

  const id = videoUrl.split('=')[1].split('&')[0];

  return id;
};

export const getUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user;
};

export const validateInput = (inputValue, minLength, maxLength) => {
  let isValid = false;

  if (inputValue.length >= minLength && inputValue.length <= maxLength) {
    isValid = true;
  }

  return isValid;
};
