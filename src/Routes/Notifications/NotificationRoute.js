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
    currentUser: ''
  }

  static contextType = UserContext

  componentDidMount() {
    ProfileService.getCurrentUserProfile()
      .then(user => {
        // this.setState({ currentUser: user.map(user=>user.id)})
        const userId = user.map(user=>user.id)
      
    EventifyService.getEventify()
      .then(eventify => {
        console.log(eventify)
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

  handleAcceptButton = () => {
    const senderId = this.state.recievedEvents.map(sender => sender.sender_id)
    return( 
      <>
      <p>Great! Redirecting you to his profile</p>
      {setTimeout(() => {
      this.props.history.push(`/profile/${senderId}`)
    }, 2000)}
      </>
    )
  }

  handleDeclineButton = () => {

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
          <Link to={`/profile/${event.sender_id}`}><img src={event.profile_picture} alt=''/></Link>
          <h4>From: {event.full_name}</h4>
          <button onClick={this.handleAcceptButton}>Accept</button>
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