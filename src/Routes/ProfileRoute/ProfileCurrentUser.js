import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Label } from '../../Components/Form/Form'
import Button from '../../Components/Button/Button'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './Profile.css'

export default class Profile extends React.Component{
  state = {
    profile: [],
    events: [],
    selectedFile: null,
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

    const { music_like, movie_like, me_intro, profile_picture } = e.target;

    ProfileService.editProfile(userId, {
      music_like: music_like.value,
      movie_like: movie_like.value,
      me_intro: me_intro.value,
      profile_picture: profile_picture.value
    })
    .then(response => {
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
    <>
     <img src={userProfile.profile_picture} alt=''/>
       <p>Bio: {userProfile.me_intro}</p>
       <p>Interests:</p>
       <ul>
         <li>Music: {userProfile.music_like}</li>
         <li>Favorite movie: {userProfile.movie_like}</li>
       </ul>
   </>
    )

    const events = this.state.events
    const userEvents = (events.length === 0 ) ? 'I have no events yet' 
    : events.map(event => 
      <div key={event.id} className="profile-event">
          <Link to={`/events/${event.id}`}>{event.event_name}</Link>
      </div> 
    )
    return (
      <>
        <button className="edit-button" type="click" onClick={this.handleEditButton}>Edit</button>
        {profile}
        <p>Events:</p>
        <div className="profile-events">
          {userEvents}
        </div>
      </>
    )
  }

  renderEditForm() {
    const user = this.state.profile
    return(
      <div className="edit-profile">
        <h4>Edit profile</h4>
        <fieldset>
          <form onSubmit={this.handleSubmitButton}>
              <Label className="edit-label" htmlFor="profilePicture">Profile picture</Label>
              <Input type="text" id="profile_picture" name="profile_picture" defaultValue={user.profile_picture}/>

              <Label className="edit-label" htmlFor="bio">About me</Label>
              <Input type="text" id="me_intro" name="me_intro" defaultValue={user.me_intro} />

              <Label className="edit-label" htmlFor="music">Favorite music genre:</Label>
              <Input type="text" id="music_like" name="music_like" defaultValue={user.music_like}/>

              <Label className="edit-label" htmlFor="movie">Favorite movie:</Label>
              <Input type="text" id="movie_like" name="movie_like" defaultValue={user.movie_like}/>

            <Button type="submit">Submit</Button>
            <Button onClick={this.handleCancelButton}>Cancel</Button>
          </form>
        </fieldset>
      </div>
    ) 
  }

  render() {
    const renderForm = (!this.state.edit) ? this.renderBioText() : this.renderEditForm()

    return(
      <div className="personal-profile">
        {renderForm}
      </div>
    )
  }
}