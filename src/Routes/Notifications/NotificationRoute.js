import React from 'react'
import EventifyService from '../../Services/eventify-service'
import './NotificationRoute.css'

export default class Notifications extends React.Component {
  state = {
    showSent: false
  }

  // componentDidMount() {
  //   EventifyService.getEventify()
  //     .then(eventify => {
  //       console.log(eventify)
  //     })
  // }

  handleRecievedButton = () => {
    this.setState({ showSent: false })
  }

  handleSentButton = () => {
    this.setState({ showSent: true})
  }

  renderSentNotifications() {
    return (
      <div className="sent-notification">
        <h3>Sent</h3>
        <h4>You sent an eventify to this person</h4>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
      </div>
    )
  }

  renderRecievedNotifications() {
    return (
        <div className="recieved-notification">
          <h3>Recieved</h3>
          <h4>Person's name</h4>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button>Accept</button>
          <button>Decline</button>
        </div>
    )
  }

  render() {
    const notifications = (!this.state.showSent) ? this.renderRecievedNotifications() : this.renderSentNotifications()

    return(
      <div className="notifcations"> 
        <div className="sent-recieved">
          <button onClick={this.handleRecievedButton} disabled={!this.state.showSent}>See recieved</button>
          <button onClick={this.handleSentButton} disabled={this.state.showSent}>See sent</button>
        </div>
        {notifications}
      </div>
    )
  }
}