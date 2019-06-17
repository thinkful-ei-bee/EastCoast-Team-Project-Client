import React from 'react'
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css'
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
      <div className='registration_title'>
        Registration
      </div>
      <div>
        <RegistrationForm registrationSucess={this.handleRegistrationSuccess} />
      </div>
    </section>
    )
  }  
}