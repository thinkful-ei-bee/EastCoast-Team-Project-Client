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
        console.log(event)
        this.setState({
          events: event
        })
      })
  }

  render(){
    const event = this.state.events;
    const string = (!this.state.event) ? [] : console.log(this.state.event.event_date.splice(0, 10))
    console.log(string)

    return(
      <div className="events-page">
        <h2 className="event-name">{event.event_name}</h2>
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