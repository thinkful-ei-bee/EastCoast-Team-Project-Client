import React from 'react'
import EventifyService from '../../Services/eventify-service'
import UserContext from '../../contexts/UserContext'
import './NotificationRoute.css'

export default class Notifications extends React.Component {
  state = {
    showSent: false,
    recievedEvents: [],
    sentEvents: []
  }

  static contextType = UserContext

  componentDidMount() {
    EventifyService.getEventify()
      .then(eventify => {
        console.log(eventify)
        const filteredRecievedEvents = eventify.filter(e => e.recipient_id === this.context.user.id)
        const filteredSentEvents = eventify.filter(e => e.sender_id === this.context.user.id)
        this.setState({ 
          recievedEvents: filteredRecievedEvents,
          sentEvents: filteredSentEvents 
        })
      })
  }

  handleRecievedButton = () => {
    this.setState({ showSent: false })
  }

  handleSentButton = () => {
    this.setState({ showSent: true})
  }

  renderSentNotifications() {
    return (this.state.sentEvents.map(event =>
      <div className="sent-notification" key={event.id}>
        <h3>Sent</h3>
        <img src={event.profile_picture} alt=''/>
        <h4>From: {event.full_name}</h4>
      </div>
    ))
  }

  renderRecievedNotifications() {
    return (this.state.recievedEvents.map(event =>
        <div className="recieved-notification" key={event.id}>
          <h3>Recieved</h3>
          <img src={event.profile_picture} alt=''/>
          <h4>From: {event.full_name}</h4>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      ))
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