import React from 'react';
import { Link } from 'react-router-dom'

export default function NotificationSent() {
  return (
    <div className="notification-sent">
      <div className="eventified-notification">
        <h3>You have successfully Eventified her!</h3>
      </div>
      <Link to="/dashboard">Back</Link>
    </div>
  )
}