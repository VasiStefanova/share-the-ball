import { createContext } from 'react';

const AppContext = createContext({
  loggedIn: false,
  setLoggedIn() {},
  user: {
    id: 0,
    username: '',
    email: '',
    role: 0,
    avatar: '',
    banDate: '',
    banReason: '',
    lastUpdated: '',
    latitude: 0,
    longitude: 0,
    friends: []
  },
  setUser() {}
});

export default AppContext;