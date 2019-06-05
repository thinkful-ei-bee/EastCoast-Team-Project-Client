import React from 'react';
import {Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Dashboard from './Components/Dashboard/Dashboard'
import Nav from './Components/Nav/Nav'
import Profile from './Components/Profile/Profile'
import EventsPage from './Components/Events/EventsPage';
import RegistrationRoute from './Components/RegistrationRouter/RegistrationRoute';

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path={'/'} component={LandingPage}/>
      <Route path={'/dashboard'} component={Dashboard}/>
      <Route path={'/events'} component={EventsPage} />
      <Route path={'/profile'} component={Profile} />
      <Route path={'/signup'} component={RegistrationRoute} />
    </div>
  );
}

export default App;
