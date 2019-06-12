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
        const id = profile.map(profile => parseInt(profile.id))
        this.setState({ currentUserProfileId: id})
      })
  }  

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    const profileId = this.state.currentUserProfileId
    return (
      <div>
      <span>
        {this.context.user.name}
      </span>
      <nav>
        <Link to='/'>Dashboard</Link><br></br>
        <Link to='/notifications'>Notifications</Link><br></br>
        <Link onClick={this.handleLogoutClick} to='/login'>Logout</Link>
        <Link to={`/profile/${profileId}`}>Profile</Link>
      </nav>
    </div>
  )
  }

  renderLoginLink() {
    return (
      <nav>
        <div className='nav_link'>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/signup'>Sign up</Link>
        </div>
      </nav>
    )
  }
  
  render() {
    console.log(this.context.user)
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

