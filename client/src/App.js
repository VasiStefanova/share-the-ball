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
import { checkLoginStatus, getLoggedUser, getUserFromStorage, intervalRequest, setUserInStorage } from './common/helpers';
import UserProfile from './views/UserProfile/UserProfile';
import getUserDetailsRequest from './services/users/get-user-details-request';
import NBANews from './components/NBANews/NBANews';
import AboutUs from './views/AboutUs/AboutUs';
import { getPostsByUserIdRequest } from './services/posts/get-posts-by-user-id-request';
import { getUserNotificationsRequest } from './services/feed/get-user-notifications-request';
import NewFriendToast from './elements/NewFriendToast/NewFriendToast';
import { FRIENDSHIP_STATUS } from './common/constants';

function App() {
  // User data
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(getLoggedUser());

  // posts
  const [createdPost, setCreatedPost] = useState(false);
  const [newPosts, setNewPosts] = useState(false);

  // notifications
  const [userCurrentPosts, setUserCurrentPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsInterval, setNotificationsInterval] = useState([]);

  // friends
  const [toggleFriendship, setToggleFriendship] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [interval, setInterval] = useState(null);
  const [newFriend, setNewFriend] = useState(null);

  const getUserPosts = () => {
    getPostsByUserIdRequest(user.id, null, 100)
      .then(posts => Array.isArray(posts) && setUserCurrentPosts(posts))
      .catch(console.error);
  };

  const getNotifications = () => {
    getUserNotificationsRequest(user.id, userCurrentPosts)
      .then(newNotifications => {
        console.log(newNotifications);
        newNotifications.length && setNotifications(newNotifications);
      })
      .catch(console.error);
  };

  const getUserFriends = async () => {
    const userDetails = await getUserDetailsRequest(user.id);
    const potentialFriends = userDetails.friends?.filter(friend => friend.canAcceptFriendship === true);
    setFriendRequests(potentialFriends);

    const friendsFromResponse = userDetails.friends.filter(friend => friend.friendshipStatus === FRIENDSHIP_STATUS.connected);
    const loggedUserFriends = getUserFromStorage().friends.filter(friend => friend.friendshipStatus === FRIENDSHIP_STATUS.connected);

    if (friendsFromResponse.length !== loggedUserFriends.length) {
      setUser(userDetails);
      setUserInStorage(userDetails);

      if (friendsFromResponse.length > loggedUserFriends.length) {
        setNewFriend(friendsFromResponse
          .filter(({ id: friendFromResponseId }) => !loggedUserFriends
            .some(({ id: loggedUserFriendId }) => friendFromResponseId === loggedUserFriendId))[0]);
      }
    }
  };

  useEffect(() => {
    setLoggedIn(checkLoginStatus());
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getUserPosts();
      getUserFriends();

      if (!interval) setInterval(intervalRequest(getUserFriends, 5000));
    } else {
      clearInterval(interval);
      setInterval(null);
      clearInterval(notificationsInterval);
      setNotificationsInterval(null);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!notificationsInterval) setNotificationsInterval(intervalRequest(getNotifications, 15000));
  }, [userCurrentPosts]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

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
        notifications,
        toggleFriendship,
        setToggleFriendship,
        friendRequests }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><Redirect to="/home" /></Route>
            <Route exact path="/home" component={loggedIn ? HomePrivate : HomePublic} />
            <Route exact path="/search" component={SearchTeammatesView} />
            <Route exact path="/nba-news" component={NBANews} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/about-us" component={AboutUs} />
          </Switch>
          <NewFriendToast newFriend={newFriend} setNewFriend={setNewFriend} />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
