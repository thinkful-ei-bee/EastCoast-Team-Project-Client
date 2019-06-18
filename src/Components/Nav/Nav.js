import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'
import TokenService from '../../Services/token-service';
import ProfileService from '../../Services/profile-service'
import EventifyService from '../../Services/eventify-service'
import UserContext from '../../contexts/UserContext'

export default class Nav extends React.Component{
  state = {
    currentUserProfileId: [],
    recievedEvents: []
  }
  static contextType = UserContext

  componentDidMount() {
    ProfileService.getCurrentUserProfile()
      .then(profile => {
        const id = profile.map(profile => parseInt(profile.user_id))
        this.setState({ currentUserProfileId: id})
      })

      EventifyService.getEventify()
      .then(eventify => {
        console.log(eventify)
        const filteredRecievedEvents = eventify.filter(e => e.recipient_id === parseInt(this.context.user.id))
        console.log(filteredRecievedEvents)
        this.setState({ 
          recievedEvents: filteredRecievedEvents
        })
      })
  }  

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
      <span>
        {this.context.user.name}
      </span>
      <nav>
        <div className='nav_link_Logged_in'>
        <Link to='/' >Dashboard</Link><br></br>
        <Link to='/notifications' >Notifications ({this.state.recievedEvents.length})</Link><br></br>
        <Link onClick={this.handleLogoutClick} to='/login'>Logout</Link>
        <Link to={`/profile`} >Profile</Link>
        </div>
      </nav>
    </div>
  )}

  renderLoginLink() {
    return (
      <nav>
        <div className='nav_link'>
        <Link to='/landingPage'>Home</Link>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/signup'>Sign up</Link>
        </div>
      </nav>
    )}
  
  render() {
    return(
      <header>
      <div className='logo'>
        <Link to='/'>
          Rendezvous
        </Link>
      </div>
      {TokenService.hasAuthToken()
        ? this.renderLogoutLink()
        : this.renderLoginLink()}
    </header>
  );
  }
  
}

