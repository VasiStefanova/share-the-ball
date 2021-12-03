import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppContext from './context/AppContext';
import './App.css';
import Header from './components/Header/Header';
import HomePublic from './views/HomePublic/HomePublic';
import HomePrivate from './views/HomePrivate/HomePrivate';
import SearchTeammatesView from './views/SearchTeammatesView/SearchTeammatesView';
import MyProfile from './views/MyProfile/MyProfile';
import { checkLoginStatus, getLoggedUser, intervalRequest } from './common/helpers';
import UserProfile from './views/UserProfile/UserProfile';
import getUserDetailsRequest from './services/users/get-user-details-request';
import NBANews from './components/NBANews/NBANews';

// eslint-disable-next-line require-jsdoc
function App() {
  // User data
  const [loggedIn, setLoggedIn] = useState(checkLoginStatus());
  const [user, setUser] = useState(getLoggedUser());

  // posts
  const [createdPost, setCreatedPost] = useState(false);
  const [newPosts, setNewPosts] = useState(false);

  // friends
  const [toggleFriendship, setToggleFriendship] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [interval, setInterval] = useState(null);

  const getUserFriends = async () => {
    const result = await getUserDetailsRequest(user.id);
    const friends = result.friends?.filter(friend => friend.canAcceptFriendship === true);
    setFriendRequests(friends);
  };

  useEffect(() => {
    getUserFriends();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (!interval) setInterval(intervalRequest(getUserFriends, 5000));
    } else {
      clearInterval(interval);
      setInterval(null);
    }
  }, [loggedIn]);

  return (
    <div className="App" style={{ backgroundImage: 'url(/background.png)' }}>
      <AppContext.Provider value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        createdPost,
        setCreatedPost,
        newPosts,
        setNewPosts,
        toggleFriendship,
        setToggleFriendship,
        friendRequests }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><Redirect to={loggedIn ? '/home' : 'home-public'} /></Route>
            <Route exact path="/home" component={HomePrivate} />
            <Route exact path="/home-public" component={HomePublic} />
            <Route exact path="/search" component={SearchTeammatesView} />
            <Route exact path="/nba-news" component={NBANews} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/user-profile" component={UserProfile} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
