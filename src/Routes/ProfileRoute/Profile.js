import React from 'react'
import { Input, Label } from '../../Components/Form/Form'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import './Profile.css'

export default class ProfileOther extends React.Component{
  state = {
    profile: [],
    events: [],
    edit: false,
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

  handleEditButton = () => { 
    this.setState({ edit: true })
  }

  handleSubmitButton = (e) => {
    e.preventDefault()

    const { profile_picture, music_like, movie_like, me_intro } = e.target;

    ProfileService.editProfile(this.state.profile.user_id, {
      profile_picture: profile_picture.value,
      music_like: music_like.value,
      movie_like: movie_like.value,
      me_intro: me_intro.value
    })
    .then(response => {
      console.log(response)
      profile_picture.value = ''
      music_like.value = ''
      movie_like.value = ''
      me_intro.value = ''
    })
  }

  handleCancelButton = () => {
    this.setState({ edit: false})
  }

  renderBioText() {
    const user = this.state.profile
    const events = this.state.events
    const userEvents = (events.length === 0 ) ? 'I have no events yet' 
    : <div>
        <p>My events: {events}</p>
        <button>Intrigued</button>
      </div>

    return (
      <div className="profile">
        <button onClick={this.handleEditButton}>Edit Profile</button>
        <img src={user.profile_picture} alt=''/>
        <p>Bio: {user.me_intro}</p>
        <p>Interests:</p>
        <ul>
          <li>Music: {user.music_like}</li>
          <li>Favorite movie: {user.movie_like}</li>
        </ul>
        <p>Events: {userEvents}</p>
      </div>
    )
  }

  renderEditForm() {
    const user = this.state.profile
    return(
      <div className="edit-profile">
        <fieldset>
          <form onSubmit={this.handleSubmitButton}>
            <Label htmlFor="bio">Bio</Label>
            <Input type="text" id="me_intro" name="me_intro" defaultValue={user.me_intro} />

            <p>Interests:</p>
            <Label htmlFor="music">Music</Label>
            <Input type="text" id="music_like" name="music_like" defaultValue={user.music_like}/>

            <Label htmlFor="movie">Movie</Label>
            <Input type="text" id="movie_like" name="movie_like" defaultValue={user.movie_like}/>

            <Label htmlFor="bio">Profile pic</Label>
            <Input type="text" id="profile_picture" name="profile_picture" />

            <button type="submit">Submit</button>
            <button onClick={this.handleCancelButton}>Cancel</button>
          </form>
        </fieldset>
      </div>
    ) 
  }

  render() {
    console.log(this.state.profile)
    const renderForm = (!this.state.edit) ? this.renderBioText() : this.renderEditForm()

    return(
      <div>
        {renderForm}
      </div>
    )
  }
}