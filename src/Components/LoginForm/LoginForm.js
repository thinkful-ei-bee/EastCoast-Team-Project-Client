import React from 'react'
import TokenService from '../../Services/token-service'
import AuthApiService from '../../Services/auth-api-service'

export default class LoginForm extends React.Component{
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );

    user_name.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        console.log(res.authToken)
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }


  render(){
    const { error } = this.state
    return(
      <section>
        <div className="login-form">
        <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>

        <div role='alert'>
          {error && <p>{error}</p>}
        </div>

          <label htmlFor="email">UserName</label>
          <input type="text" ref={this.firstInput} id="user_name" name="email" required/>

          <label htmlFor="Password">Password</label>
          <input type="password" id="password" name="password" required/> 

          <button type="submit">Login</button>       
        </form>
        </div>
      </section>
    )
  }   
}