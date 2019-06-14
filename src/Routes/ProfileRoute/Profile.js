import React from 'react'
import { Input, Label } from '../../Components/Form/Form'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './Profile.css'

export default class Profile extends React.Component{
  state = {
    profile: [],
    events: [],
    edit: false,
    canEdit: false
  }

  static contextType = UserContext

  componentDidMount() {
    ProfileService.getProfileById(this.props.match.params.id)
      .then(profile => {
        console.log(profile)
        this.setState({ profile: profile})

      const profileId = this.state.profile.user_id

    EventService.getAllEvents()
      .then( event => {
        const profileEvents = event.filter(e => e.event_owner_id === profileId)
        this.setState({ events: profileEvents})
      })

      if (profileId === this.context.user.id) {
        this.setState({ canEdit: true })
      }
    })  
  }

  handleEditButton = () => { 
    this.setState({ edit: true })
  }

  handleSubmitButton = (e) => {
    e.preventDefault()
    const userId = this.state.profile.user_id

    const { profile_picture, music_like, movie_like, me_intro } = e.target;

    ProfileService.editProfile(userId, {
      // profile_picture: profile_picture.value,
      music_like: music_like.value,
      movie_like: movie_like.value,
      me_intro: me_intro.value
    })
    .then(response => {
      console.log(response)
      // profile_picture.value = ''
      music_like.value = ''
      movie_like.value = ''
      me_intro.value = ''
      this.setState({ 
        profile: response,
        edit: false 
      })
    })
  }

  renderEditButton() {
    const editButton = (this.state.canEdit) ? <button onClick={this.handleEditButton}>Edit Profile</button> : ''
    return editButton
  }

  handleCancelButton = () => {
    this.setState({ edit: false})
  }

  renderBioText() {
    const user = this.state.profile
    console.log(user)
    const events = this.state.events
    const userEvents = (events.length === 0 ) ? 'I have no events yet' 
    : events.map(event => 
      <div key={event.id}>
        <p >{event.event_name}</p>
        <button>Intrigued</button>
      </div> 
    )
    return (
      <div className="profile">
       {this.renderEditButton()}
        <img src={user.profile_picture} alt=''/>
        <p>Bio: {user.me_intro}</p>
        <p>Interests:</p>
        <ul>
          <li>Music: {user.music_like}</li>
          <li>Favorite movie: {user.movie_like}</li>
        </ul>
        <p>Events:</p>
        {userEvents}
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

            {/* <Label htmlFor="bio">Profile pic</Label>
            <Input type="text" id="profile_picture" name="profile_picture" /> */}

            <button type="submit">Submit</button>
            <button onClick={this.handleCancelButton}>Cancel</button>
          </form>
        </fieldset>
      </div>
    ) 
  }

  render() {
    console.log(this.state.canEdit)
    const renderForm = (!this.state.edit) ? this.renderBioText() : this.renderEditForm()

    return(
      <div>
        {renderForm}
      </div>
    )
  }
}

