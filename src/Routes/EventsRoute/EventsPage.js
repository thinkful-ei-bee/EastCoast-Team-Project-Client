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
    const date = (!event.event_date) ? '' : event.event_date.slice(0, 10)
    const time = (!event.event_time) ? '' : event.event_time.slice(0, 5)
    console.log(time)

    return(
      <div className="events-page">
        <h2 className="event-name">{event.event_name}</h2>
        <div>
          <h3>Event info:</h3>
          <p>When: {date} at {time}</p>
          <p>Where: {event.event_location}</p>
          <p>Details: {event.event_details}</p>
        </div>
      </div>
    )
  }
}