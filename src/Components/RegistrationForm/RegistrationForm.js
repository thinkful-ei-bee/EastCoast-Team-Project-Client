import React from 'react'
import './RegistrationForm.css'

export default class RegistrationForm extends React.Component{
  render(){
    return(
      <section>
        <div className="registration-form">
        <form >

          <label htmlFor="registration">Full Name</label>
          <input type="text" id="full-name" name="full-name" required/>

          <label htmlFor="username">User Name</label>
          <input type="text" id="username" name="username" required/>

          <label htmlFor="Password">Password</label>
          <input type="text" id="password" name="password" required/> 
          
          <label htmlFor="comfirmPassword">Confirm Password</label>
          <input type="text" id="comfirm-password" name="confirm-password" required/>

          <button type="submit">Sign up!</button>       
        </form>
        </div>
      </section>
    )
  }   
}