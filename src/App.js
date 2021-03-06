import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom'
import LandingPage from './Routes/LandingPageRoute/LandingPage'
import Dashboard from './Routes/DashboardRoute/Dashboard'
import Nav from './Components/Nav/Nav'
import Profile from './Routes/ProfileRoute/Profile'
import ProfileCurrentUser from './Routes/ProfileRoute/ProfileCurrentUser'
import EventsPage from './Routes/EventsRoute/EventsPage';
import RegistrationRoute from './Routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from './Routes/LoginRoute/LoginRoute'
import PrivateRoute from './Routes/PrivateOnlyRoute/PrivateOnlyRoute'
import PublicOnlyRoute from './Routes/PublicOnlyRoute/PublicOnlyRoute'
import EventForm from './Routes/EventsRoute/EventForm';
import EventifyForm from './Routes/EventifyRoute/EventifyForm';
import NotifcationSent from './Routes/NotificationSent/NotificationSent';
import NotificationRoute from './Routes/Notifications/NotificationRoute'
import NotFoundRoute from './Routes/NotFoundRoute/NotFoundRoute'
import Footer from './Components/FooterRoute/Footer';
import './App.css'

class App extends React.Component{
  state = { 
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    return (
    <div className="App">
      <Nav />

      <main role="main">
        <Switch>
          <PrivateRoute 
            exact 
            path={'/'}
            component={Dashboard}
          />
          <PrivateRoute path={'/events/:id'} component={EventsPage} />
          <PrivateRoute path={'/createEvent'} component={EventForm}/>
          <PrivateRoute path={'/eventifyForm'} component={EventifyForm}/>
          <PrivateRoute path={'/notificationSent'} component={NotifcationSent} />
          <PrivateRoute path={'/notifications'} component={NotificationRoute} />
          <PrivateRoute path={'/profile/:id'} component={Profile} />
          <PrivateRoute path={'/profile'} component={ProfileCurrentUser} />
          
          <PublicOnlyRoute path={'/signup'} component={RegistrationRoute} />
          <PublicOnlyRoute path={'/login'} component={LoginRoute}  />
          <PublicOnlyRoute exact path={'/landingPage'} component={LandingPage}/>

          <Route component={NotFoundRoute}/>
         
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
  }
}

export default withRouter(App);
