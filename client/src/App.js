import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import CallPage from './components/CallPage';
import HomePage from './components/HomePage';
import NoMatch from './components/NoMatch';
function App() {
  return (
    <>
  
      <Router>
        <Switch>
          <Route exact path="/:id">
            <CallPage/>
          </Route>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route exact path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
