import React from 'react';
import {Link} from 'react-router-dom'
import UserContext from '../../Contexts/UserContext'
import './Nav.css'
import TokenService from '../../Services/token-service';

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
        <nav className="header-menu-link" role="navigation">
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="header-menu-link" role="navigation">
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/signup'>Sign up</Link>
      </nav>
    )
  }
  
  render() {
    return(
    <div className="nav">
      <nav>
        <Link to='/dashboard'>Dashboard</Link>     
        <Link to='/profile'>Profile</Link> 

        <div>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </nav>
    </div>
  )
  }
  
}

