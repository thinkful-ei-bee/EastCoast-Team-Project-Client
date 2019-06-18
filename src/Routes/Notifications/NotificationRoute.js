import React from 'react'
import { Link } from 'react-router-dom'
import EventifyService from '../../Services/eventify-service'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './NotificationRoute.css'

export default class Notifications extends React.Component {
  state = {
    showSent: false,
    recievedEvents: [],
    recievedEventInfo: [],
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
        //const userId = user.map(user=>user.id)
      
    EventifyService.getEventify()
      .then(eventify => {
        console.log(eventify)
        const filteredRecievedEvents = eventify.filter(e => e.recipient_id === parseInt(this.context.user.id))
        console.log(filteredRecievedEvents)
        const filteredSentEvents = eventify.filter(e => e.sender_id === this.context.user.id)
        this.setState({ 
          recievedEvents: filteredRecievedEvents,
          sentEvents: filteredSentEvents 
        })

    EventService.getAllEvents()
      .then(events => {
        let recievedEventInfo = events.filter(o1 => filteredRecievedEvents.some(o2 => o1.id === o2.event));
        this.setState({ recievedEventInfo: recievedEventInfo })
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
    // const eventInfo = (!this.state.recievedEventInfo)? '' : this.state.recievedEventInfo.map(info => 
    //   // <div className="event-info">
    //     <p>Check out more info <Link to={`/events/${info.id}`}>here</Link></p>
    //   // </div>
    // )

    const eventify = (!this.state.recievedEvents) ? [] : this.state.recievedEvents.map(event => 
      <div className="recieved-notification" key={event.id}>
        <h3>Recieved</h3>
        <Link to={`/profile/${event.sender_id}`}><img src={event.profile_picture} alt=''/></Link>
        <h4>{event.full_name} is inviting you to {event.event_name}!</h4>
        <button onClick={() => this.props.history.push(`/profile/${event.sender_id}`)}>Accept</button>
        <button type="click" onClick={this.handleDeclineButton}>Decline</button>
        {/* {eventInfo} */}
      </div>
    )

    // console.log(this.state.recievedEventInfo)
    return (
      <div>
        {eventify}
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