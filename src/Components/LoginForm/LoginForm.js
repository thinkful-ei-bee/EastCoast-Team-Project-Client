import React from 'react'
import UserContext from '../../Contexts/UserContext'
import AuthApiService from '../../Services/auth-api-service'

export default class LoginForm extends React.Component{
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
        <div className="login-form">
        <form className='LoginForm' onSubmit={this.handleSubmit}>

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