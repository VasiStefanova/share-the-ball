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
