import React from 'react'
import './NotificationSent.css'

export default class NotifcationSent extends React.Component{
  state = { userGender: [] }

  componentDidMount() {
    const {userGender} = this.props.location.state
    this.setState({ userGender: userGender})
  }

  routeChange = () => {
    this.props.history.push('/');
  }

  renderMessage() {
    const userGender = this.state.userGender.toString()
    if (userGender === "female") {
      return ( <h2>You have successfully eventified him! :)</h2>)
    } 
    if (userGender === "male") {
      return ( <h2>You have successfully eventified her! :)</h2>)
    }
  }

  render() {
    return(
    <div className="notification-sent">
      {this.renderMessage()}
      <button type="click" onClick={this.routeChange}>Back</button>
    </div>
  )
  }
  
}