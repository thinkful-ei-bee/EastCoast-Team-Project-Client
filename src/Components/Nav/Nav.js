import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'
import TokenService from '../../Services/token-service';
import UserContext from '../../contexts/UserContext'

export default class Nav extends React.Component{
  static contextType = UserContext

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
        <Link to='/'>Dashboard</Link><br></br>
        <Link to='/notifications'>Notifications</Link><br></br>
        <Link onClick={this.handleLogoutClick} to='/login'>Logout</Link>
        <Link to='/profile'>Profile</Link><br></br>
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

