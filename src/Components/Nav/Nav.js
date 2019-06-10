import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'
import TokenService from '../../Services/token-service';

export default class Nav extends React.Component{
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    );
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
        <Link to='/'>Dashboard</Link>     
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

