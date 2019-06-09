import React from 'react';
import {Link} from 'react-router-dom'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  render(){
    return(
      <div className="dashboard">
        <div className="event-carousel">
          <h3>Random potential dates</h3>
        </div>
        <button type="click">Eventify Her</button>
        <button type="click">Create an event</button>
      </div>
    )
  }
}