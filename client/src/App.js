import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/"><Redirect to="/home" /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
