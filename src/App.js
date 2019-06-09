import React from 'react';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Routes/LandingPageRoute/LandingPage'
import Dashboard from './Routes/DashboardRoute/Dashboard'
import Nav from './Components/Nav/Nav'
import Profile from './Routes/ProfileRoute/Profile'
import EventsPage from './Routes/EventsRoute/EventsPage';
import RegistrationRoute from './Routes/RegistrationRouter/RegistrationRoute';
import LoginRoute from './Routes/LoginRoute/LoginRoute'
import PrivateRoute from './Routes/PrivateOnlyRoute/PrivateOnlyRoute'
import PublicOnlyRoute from './Routes/PublicOnlyRoute/PublicOnlyRoute'

class App extends React.Component{
  render() {
    return (
    <div className="App">
      <Nav />

      <main role="main">
        <Switch>
          <PrivateRoute 
            exact path={'/'}
            component={Dashboard}
          />
          <PrivateRoute path={'/events'} component={EventsPage} />
          <PrivateRoute path={'/profile'} component={Profile} />
          
          <PublicOnlyRoute path={'/signup'} component={RegistrationRoute} />
          <PublicOnlyRoute path={'/login'} component={LoginRoute}  />
          <PublicOnlyRoute exact path={'/landingPage'} component={LandingPage}/>
        </Switch>
        {/* <Route exact path={'/'}
            component={Dashboard}/>
        <Route exact path={'/profile'}
        component={Profile}/> */}

      </main>
    </div>
  );
  }
  
}

export default App;
