import React, { Component } from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm';
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='login__container'>
        <div className='login_title'>
          </div>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
