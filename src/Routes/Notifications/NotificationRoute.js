import React from 'react'
import './NotificationRoute.css'

export default class Notifications extends React.Component {
  state = {
    showSent: false
  }

  render() {
    return(
      <div className="notifcations">
        <div className="sent-recieved">
          <button>See recieved</button>
          <button>See sent</button>
        </div>
        <div className="single-notification">
          <h4>Person's name</h4>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      </div>
    )
  }
}