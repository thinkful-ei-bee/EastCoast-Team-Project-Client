import React from 'react'
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';

export default class RegistrationRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }
  
  render() {
    return(
    <section>
      <h1>Rendezvous registration</h1>
      <div>
        <RegistrationForm registrationSucess={this.handleRegistrationSuccess} />
      </div>
    </section>
    )
  }  
}