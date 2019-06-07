import React from 'react'
import AuthApiService from '../../Services/auth-api-service'
import { Link } from 'react-router-dom'
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
            <input 
              className="registration-input" 
              ref={this.firstInput}
              id="registration-name-input"
              type="text"
              name="full-name" 
              placeholder="Enter full name"
              required/>

            <label htmlFor="email">Email</label>
            <input 
              className="registration-input" 
              type="text" 
              id="registration-email-input" 
              name="email" 
              placeholder="Enter Email"
              required/>

            <label htmlFor="Password">Password</label>
            <input 
              className="registration-input" 
              type="text" 
              id="registration-password-input" 
              name="password" 
              placeholder="Enter password"
              required/> 
            
            <label htmlFor="comfirmPassword">Confirm Password</label>
            <input 
              className="registration-input" 
              type="text" 
              id="registration-confirm-password-input" 
              name="confirm-password" 
              placeholder="Confirm password"
              required/>

            <button type="submit" className="btn">Sign up!</button> 
            {' '}<br></br>
            <Link to='/login'>Already have an account?</Link>      
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}