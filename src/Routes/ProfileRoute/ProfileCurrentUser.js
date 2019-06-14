import React from 'react'
import { Input, Label } from '../../Components/Form/Form'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './Profile.css'

export default class Profile extends React.Component{
  state = {
    profile: [],
    events: []
  }

  static contextType = UserContext

  componentDidMount() {
    ProfileService.getCurrentUserProfile()
      .then(profile => {
        this.setState({ profile: profile[0]})
      })

    EventService.getEventsForCurrentUser()
      .then(events => {
        this.setState({ events: events })
      })  
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

  handleEditButton = () => { 
    this.setState({ edit: true })
  }

  handleCancelButton = () => {
    this.setState({ edit: false})
  }

  renderBioText() {
    const userProfile = this.state.profile
    const profile = (
    <div>
     <img src={userProfile.profile_picture} alt=''/>
       <p>Bio: {userProfile.me_intro}</p>
       <p>Interests:</p>
       <ul>
         <li>Music: {userProfile.music_like}</li>
         <li>Favorite movie: {userProfile.movie_like}</li>
       </ul>
   </div>
    )

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
        <button type="click" onClick={this.handleEditButton}>Edit</button>
        {profile}
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
                <Label htmlFor="bio">About me</Label>
                <Input type="text" id="me_intro" name="me_intro" defaultValue={user.me_intro} />

                <p>Interests:</p>
                <Label htmlFor="music">Favorite music genre:</Label>
                <Input type="text" id="music_like" name="music_like" defaultValue={user.music_like}/>

                <Label htmlFor="movie">Favorite movie:</Label>
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
    const renderForm = (!this.state.edit) ? this.renderBioText() : this.renderEditForm()

    return(
      <div>
        {renderForm}
      </div>
    )
  }
}