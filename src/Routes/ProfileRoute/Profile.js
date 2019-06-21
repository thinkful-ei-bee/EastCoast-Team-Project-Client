import React from 'react'
import { Link } from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import EventifyService from '../../Services/eventify-service'
import UserContext from '../../contexts/UserContext'
import './Profile.css'

export default class Profile extends React.Component{
  state = {
    profile: [],
    events: [],
    disabledButton: -1,
    eventifySent: false
  }

  static contextType = UserContext

  componentDidMount() {
    ProfileService.getProfileById(this.props.match.params.id)
      .then(profile => {
        this.setState({ profile: profile})

      const profileId = this.state.profile.user_id

    EventService.getAllEvents()
      .then( event => {
        const profileEvents = event.filter(e => e.event_owner_id === profileId)
        this.setState({ events: profileEvents})
      })
    })  
  }

  handleIntriguedButton = (id, index) => {
    EventifyService.postEventify({
      recipient_id: this.props.match.params.id,
      event: id,
    })
    .then( response => {
      this.setState({ 
        disabledButton: index, 
        eventifySent: true
      }) }
    )
  }

  render() {
    const user = this.state.profile
    const events = this.state.events

    const userEvents = (events.length === 0 ) ? 'I have no events yet' 
    : events.map((event, i) => 
      <div key={event.id} className="profile-event">
        <Link to={`/events/${event.id}`}>{event.event_name}</Link>
      </div> 
    )
    return (
      <div className="profile">
        <img src={user.profile_picture} alt=''/>
        <p>Bio: {user.me_intro}</p>
        <ul>
          <li>Music: {user.music_like}</li>
          <li>Favorite movie: {user.movie_like}</li>
        </ul>
        <p>Events:</p>
        <div className="profile-events">
          {userEvents} 
        </div>
      </div>
    )
  }
}

