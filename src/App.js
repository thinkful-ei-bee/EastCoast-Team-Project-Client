import React from 'react';
import {Route} from 'react-router-dom'
import LandingPage from './Routes/LandingPageRoute/LandingPage'
import Dashboard from './Routes/DashboardRoute/Dashboard'
import Nav from './Components/Nav/Nav'
import Profile from './Routes/ProfileRoute/Profile'
import EventsPage from './Routes/EventsRoute/EventsPage';
import RegistrationRoute from './Routes/RegistrationRouter/RegistrationRoute';

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
