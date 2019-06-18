import React from 'react'
import './NotificationSent.css'

export default class NotifcationSent extends React.Component{
  state = { userGender: [], userName: [] }

  componentDidMount() {
    const {userGender } = this.props.location.state
    this.setState({ userGender: userGender })
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
      <button type="click" onClick={() => this.props.history.push('/')}>Back</button>
    </div>
  )
  }
  
}