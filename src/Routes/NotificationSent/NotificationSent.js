import React from 'react'
import './NotificationSent.css'

export default class NotifcationSent extends React.Component{

  routeChange = () => {
    this.props.history.push('/');
  }

  render() {
    return(
    <div className="notification-sent">
      <h2>You have successfully eventified her!</h2>
      <button type="click" onClick={this.routeChange}>Back</button>
    </div>
  )
  }
  
}