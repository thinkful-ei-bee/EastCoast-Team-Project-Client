import React from 'react';
import {Link} from 'react-router-dom'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  render(){
    return(
      <div className="dashboard">
        <div className="event-carousel">
          <h3>Events carousel</h3>
        </div>

        <div>
          <Link>Events</Link>
          <p>Post a date event</p>
        </div>
      </div>
    )
  }
}