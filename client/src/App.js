import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppContext from './context/AppContext';
import './App.css';
import Header from './components/Header/Header';
import HomePublic from './views/HomePublic/HomePublic';
import HomePrivate from './views/HomePrivate/HomePrivate';
import CardLinks from './components/CardLinks/CardLinks';
import SearchTeammatesView from './views/SearchTeammatesView/SearchTeammatesView';
import MyProfile from './views/MyProfile/MyProfile';
import { checkLoginStatus, getLoggedUser } from './common/helpers';
import UserProfile from './views/UserProfile/UserProfile';

// eslint-disable-next-line require-jsdoc
function App() {
  // User data
  const [loggedIn, setLoggedIn] = useState(checkLoginStatus());
  const [user, setUser] = useState(getLoggedUser());

  // posts
  const [createdPost, setCreatedPost] = useState(false);

  // friends
  const [toggleFriendship, setToggleFriendship] = useState(false);

  // style={{ backgroundImage: 'url(/background.png)' }} - add this to App div to set background img
  return (
    <div className="App" style={{ backgroundImage: 'url(/background.png)' }}>
      <AppContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, createdPost, setCreatedPost, toggleFriendship, setToggleFriendship }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><Redirect to="/home" /></Route>
            <Route exact path="/home" component={loggedIn ? HomePrivate : HomePublic} />
            <Route exact path="/CardLinks" component={CardLinks} />
            <Route exact path="/search" component={SearchTeammatesView} />
            <Route path="/my-profile" component={MyProfile} />
            <Route path="/user-profile" component={UserProfile} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
