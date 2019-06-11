import React from 'react'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import './Profile.css'

export default class ProfileOther extends React.Component{
  state = {
    profile: [],
    events: []
  }

  componentDidMount() {
    ProfileService.getProfileById(this.props.match.params.id)
      .then(profile => {
        this.setState({ profile: profile})
      })
    
    EventService.getEvents()
      .then(event => {
        const filteredEvents = event.filter(e => e.event_owner_id === this.state.profile.id)
        this.setState({
          events: filteredEvents
        })
      })
  }

  render() {
    const user = this.state.profile
    const events = this.state.events
    const userEvents = (events.length === 0 ) ? 'I have no events yet' : events

    return(
      <div className="profile">
        <img src={user.profile_picture} alt=''/>
        <p>Bio: {user.me_intro}</p>
        <p>Interests:</p>
        <ul>
          <li>Music: {user.music_like}</li>
          <li>Favorite movie: {user.movie_like}</li>
        </ul>
        <p>My events: {userEvents}</p>
      </div>
    )
  }
}