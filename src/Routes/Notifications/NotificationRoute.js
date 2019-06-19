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
    allProfiles: []
  }

  static contextType = UserContext
  
  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        this.setState({ allProfiles: profile})
      })

    ProfileService.getCurrentUserProfile()
      .then(user => {
      
    EventifyService.getEventify()
      .then(eventify => {
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

  handleAcceptButton = (id) => {
    const eventifyId = id;
    const recipientId = this.state.recievedEvents.filter(event => event.id === eventifyId)
    const recipientIdNum = parseInt(recipientId.map(recipient => recipient.recipient_id))
    const eventId = parseInt(recipientId.map(event => event.event))

    EventifyService.editEventify(eventifyId, {
      event: eventId,
      recipient_id: recipientIdNum,
      is_accept: true
    })
    .then(response => {
      const newReceivedEvents = this.state.recievedEvents.map(rEvent => {
        if(rEvent.event === response.event) {
          rEvent.is_accept = true;
        }
        return rEvent;
      }) 
      this.setState({ recievedEvents: newReceivedEvents })
    })
  }
  
  renderSentNotifications() {
    let sentProfiles = this.state.allProfiles.filter(o1 => this.state.sentEvents.some(o2 => o1.user_id === o2.recipient_id));

    return (this.state.sentEvents.map(event =>
      <div className="sent-notification" key={event.id}>
        <div className="sent-from">
          <h3>Sent an invitation for {event.event_name} to {sentProfiles.filter(user => user.user_id === event.recipient_id).map(user => user.full_name)}</h3>
          <img src={sentProfiles.filter(user => user.user_id === event.recipient_id).map(user => user.profile_picture)} alt=''/>
          <img src={event.profile_picture} alt=''/>
          <h4>Status: {!event.is_accept ? ('Waiting for event to be accepted') : ('Accepted!')} </h4>
        </div>
        <div className="sent-to">
        </div>
      </div>
    ))
  }

  renderRecievedNotifications() {
    return (
    <div>
      <h3 className="received-h3">Received:</h3>
      {!this.state.recievedEvents ? [] : this.state.recievedEvents.map((event, i) => 
        <div className="recieved-notification" key={i}>
          <Link to={`/profile/${event.sender_id}`}><img src={event.profile_picture} alt=''/></Link>
          <h4>{event.full_name} is inviting you to {event.event_name}!</h4>
          
          {!event.is_accept ? 
            <div>
              <button type="click" onClick={() => {this.handleAcceptButton(event.id, i)}} >Accept</button>
              <button type="click" onClick={this.handleDeclineButton}>Decline</button>
            </div> : 
            <div className="accepted-message">You've accepted this request!</div>}
        </div>
       )}
    </div>
      )
    }

  render() {
    const notifications = (!this.state.showSent) ? this.renderRecievedNotifications() : this.renderSentNotifications()

    return(
      <div className="notifcations"> 
        <div className="sent-received">
          <button onClick={this.handleRecievedButton} disabled={!this.state.showSent}>See received</button>
          <button onClick={this.handleSentButton} disabled={this.state.showSent}>See sent</button>
        </div>
        <div className="all-notifications">
        {notifications}
        </div>
      </div>
    )
  }
}