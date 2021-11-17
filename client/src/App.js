import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePublic from './views/HomePublic/HomePublic';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/"><Redirect to="/home" /></Route>
          <Route exact path="/home" component={HomePublic} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
