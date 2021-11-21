import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppContext from './context/AppContext';
import './App.css';
import Header from './components/Header/Header';
import HomePublic from './views/HomePublic/HomePublic';
import HomePrivate from './views/HomePrivate/HomePrivate';
import NBAStandingsFeed from './components/NBAStandingsFeed/NBAStandingsFeed';
import CardLinks from './components/CardLinks/CardLinks';
import SearchTeammatesView from './views/SearchTeammatesView/SearchTeammatesView';
import MyProfile from './views/MyProfile/MyProfile';

// eslint-disable-next-line require-jsdoc
function App() {

  // User data
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
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
  });

  // posts
  const [createdPost, setCreatedPost] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, createdPost, setCreatedPost }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/"><Redirect to="/home" /></Route>
            {loggedIn ?
              <Route exact path="/home" component={HomePrivate} /> :
              <Route exact path="/home" component={HomePublic} />}
            <Route exact path="/CardLinks" component={CardLinks} />
            <Route exact path="/search" component={SearchTeammatesView} />
            <Route exact path="/my-profile" component={MyProfile} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
