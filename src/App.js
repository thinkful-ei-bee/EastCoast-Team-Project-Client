import React from 'react';
import {Route} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Nav from './Nav/Nav'
import Profile from './Profile/Profile'

function App() {
  return (
    <div className="App">
      <Nav />

      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/profile' component={Profile} />
    </div>
  );
}

export default App;
