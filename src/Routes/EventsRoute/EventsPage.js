import React from 'react'
import './EventsPage.css'

export default class EventsPage extends React.Component{
  render(){
    return(
      <div className="events-page">
        <h2>Event Name</h2>
        <div className="event-picture">Event pic</div>
        <div>Event info</div>
      </div>
    )
  }
}