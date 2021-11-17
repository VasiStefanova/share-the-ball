import React from 'react';
import {BrowserRouter, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route exact path="/"><Navigate to="/home" /></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
