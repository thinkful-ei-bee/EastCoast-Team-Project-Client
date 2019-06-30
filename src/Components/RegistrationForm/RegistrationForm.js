import React from 'react'
import AuthApiService from '../../Services/auth-api-service'
import { Link } from 'react-router-dom'
import './RegistrationForm.css'

export default class RegistrationForm extends React.Component{
  static defaultProps = {
    registrationSucess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    const { full_name, user_name, email, password, gender } = e.target
    AuthApiService.postUser({
      full_name: full_name.value,
      user_name: user_name.value,
      email: email.value, 
      password: password.value,
      gender: gender.value
    })
    .then(user => {
      full_name.value = ''
      user_name.value = ''
      email.value = ''
      password.value = ''
      gender.value = ''
      this.props.registrationSucess()
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
        <div className="registration-form-container" >
        
          <form onSubmit={this.handleSubmit} className="registration-form">
            
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
            
            <label htmlFor="registration">Full Name</label>
            <input 
              className="registration-input" 
              ref={this.firstInput}
              id="full_name"
              type="text"
              name="full-name" 
              placeholder="Enter full name"
              required/>

            <label htmlFor="email">Email</label>
            <input 
              className="registration-input" 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Enter Email"
              required/>

            <label htmlFor="email">Username</label>
            <input 
              className="registration-input" 
              type="text" 
              id="user_name" 
              name="username" 
              placeholder="Enter username"
              required/>

            <label htmlFor="Password">Password</label>
            <input 
              className="registration-input" 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter password"
              autoComplete="password"
              required/>

            <label htmlFor="email">Gender</label>
            <input 
              className="registration-input" 
              type="text" 
              id="gender" 
              name="gender" 
              placeholder="Enter gender"
              required/> 
              <button type="submit" className="sign-up-button btn">Sign Up!</button> 
              <Link to='/login' className="account-created">Already have an account?</Link>
            {' '}<br></br>
          </form>
            
                  
         
        
        </div>
      </section>
    )
  }   
}