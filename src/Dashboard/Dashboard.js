import React from 'react';
import './Dashboard.css'

export default class Dashboard extends React.Component{
  render(){
    return(
      <div className="dashboard">
        <div className="event-carousel">
          <h3>Events carousel</h3>
        </div>

        <div>
          <p>Post a date event</p>
        </div>
      </div>
    )
  }
}