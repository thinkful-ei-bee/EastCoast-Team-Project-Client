import React from 'react'

export default class LoginForm extends React.Component{
  render(){
    return(
      <section>
        <div className="login-form">
        <form >

          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required/>

          <label htmlFor="Password">Password</label>
          <input type="text" id="password" name="password" required/> 

          <button type="submit">Login</button>       
        </form>
        </div>
      </section>
    )
  }   
}