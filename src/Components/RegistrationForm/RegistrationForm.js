import React from 'react'
import AuthApiService from '../../Services/auth-api-service'
import './RegistrationForm.css'

export default class RegistrationForm extends React.Component{
  static defaultProps = {
    registrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password} = e.target
    AuthApiService.postUser({
      name: name.value,
      email: email.value, 
      password: password.value
    })
    .then(user => {
      name.value = ''
      email.value = ''
      password.value = ''
      this.props.registrationSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render(){
    const { error } = this.state
    return(
      <section>
        <div className="registration-form" >
        <fieldset>
          <form onSubmit={this.handleSubmit}>
            
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
            
            <label htmlFor="registration">Full Name</label>
            <input type="text" id="full-name" name="full-name" required/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required/>

            <label htmlFor="Password">Password</label>
            <input type="text" id="password" name="password" required/> 
            
            <label htmlFor="comfirmPassword">Confirm Password</label>
            <input type="text" id="comfirm-password" name="confirm-password" required/>

            <button type="submit">Sign up!</button>       
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}