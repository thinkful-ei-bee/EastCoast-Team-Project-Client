import React from 'react'
import EventsService from '../../Services/events-service'
import './EventsPage.css'

export default class EventsPage extends React.Component{
  state = {
    events: []
  }

  componentDidMount(){
    EventsService.getEventById(this.props.match.params.id)
      .then(event => {
        this.setState({
          events: event
        })
      })
  }

  render(){
    const event = this.state.events

    return(
      <div className="events-page">
        <h2 className="event-name">{event.event_name}</h2>
        {/* <div className="event-picture">Event pic</div> */}
        <div>
          <h3>Event info:</h3>
          <p>When: {event.event_date} at {event.event_time}</p>
          <p>Where: {event.event_location}</p>
          <p>Details: {event.event_details}</p>
        </div>
      </div>
    )
  }
}