import React from 'react'
import { Link } from 'react-router-dom'
import EventifyService from '../../Services/eventify-service'
import ProfileService from '../../Services/profile-service'
import UserContext from '../../contexts/UserContext'
import './NotificationRoute.css'

export default class Notifications extends React.Component {
  state = {
    showSent: false,
    recievedEvents: [],
    sentEvents: [],
    allProfiles: [],
  }

  static contextType = UserContext

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        this.setState({ allProfiles: profile})
      })

    ProfileService.getCurrentUserProfile()
      .then(user => {
        const userId = user.map(user=>user.id)
      
    EventifyService.getEventify()
      .then(eventify => {
        const filteredRecievedEvents = eventify.filter(e => e.recipient_id === parseInt(userId))
        const filteredSentEvents = eventify.filter(e => e.sender_id === this.context.user.id)
        this.setState({ 
          recievedEvents: filteredRecievedEvents,
          sentEvents: filteredSentEvents 
        })
      })
    })
  }

  handleRecievedButton = () => {
    this.setState({ showSent: false })
  }

  handleSentButton = () => {
    this.setState({ showSent: true})
  }

  handleDeclineButton = () => {
    this.props.history.push(`/`)
  }

  renderSentNotifications() {
    return (this.state.sentEvents.map(event =>
      <div className="sent-notification" key={event.id}>
        <div className="sent-from">
          <h3>Sent</h3>
          <img src={event.profile_picture} alt=''/>
          <h4>From: {event.full_name}</h4>
        </div>
        <div className="sent-to">
        </div>
      </div>
    ))
  }

  renderRecievedNotifications() {
    return (this.state.recievedEvents.map((event, i) =>
        <div className="recieved-notification" key={event.id}>
          <h3>Recieved</h3>
          <Link to={`/profile/${event.sender_id}`}><img src={event.profile_picture} alt=''/></Link>
          <h4>{event.full_name}is inviting you to {event.event_name}!</h4>
          <button onClick={() => this.props.history.push(`/profile/${event.sender_id}`)}>Accept</button>
          <button type="click" onClick={this.handleDeclineButton}>Decline</button>
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