import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'
import TokenService from '../../Services/token-service';
import ProfileService from '../../Services/profile-service'
import UserContext from '../../contexts/UserContext'

export default class Nav extends React.Component{
  state = {
    currentUserProfileId: []
  }
  static contextType = UserContext

  componentDidMount() {
    ProfileService.getCurrentUserProfile()
      .then(profile => {
        const id = profile.map(profile => parseInt(profile.user_id))
        this.setState({ currentUserProfileId: id})
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
        <Link to='/' className="nav-links">Dashboard</Link><br></br>
        <Link to='/notifications' className="nav-links notification">Notifications</Link><br></br>
        <Link onClick={this.handleLogoutClick} to='/login' className="nav-links logout">Logout</Link>
        <Link to={`/profile`} className="nav-links">Profile</Link>
      </nav>
    </div>
  )}

  renderLoginLink() {
    return (
      <nav>
        <div className='nav_link'>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/signup'>Sign up</Link>
        </div>
      </nav>
    )}
  
  render() {
    return(
      <header>
      <h1>
        <Link to='/'>
          Rendezvous
        </Link>
      </h1>
      {TokenService.hasAuthToken()
        ? this.renderLogoutLink()
        : this.renderLoginLink()}
    </header>
  );
  }
  
}

