export const getToken = () => localStorage.getItem('token') || '';

export const checkLoginStatus = () => localStorage.getItem('token')? true : false;

export const getLoggedUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }

  return {};
};
