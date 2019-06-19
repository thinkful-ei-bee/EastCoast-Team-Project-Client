import React from 'react';
import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    currentUser: [],
    allUsers: [],
    allProfileInfo: [],
    filteredProfileInfo: [],
    events: [],
    currentImage: [],
    currentImageIndex: 0,
    currentImageId: [],
    showEventifyForm: false,
    selectValue: false
  }

  static contextType = UserContext

  componentDidMount() {
    EventService.getEventsForCurrentUser()
      .then(events => {
        const filteredEvents = events.filter(e => e.event_owner_id === this.context.user.id) 
        this.setState({ events: filteredEvents })
      })
    ProfileService.getCurrentUserProfile()  
      .then(profile=>
        {
          if(!profile){
            console.log('no')
          }
          console.log('yes')
      }
      )

      ProfileService.getCurrentUserProfile()  
      .then(profile=>
        { 
          // console.log( profile.isEmpty(),'test profile sendback')
          if(profile.length ===0){
            const newUserProfileMandatory ={
              profile_picture:'https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg',
              music_like:'unknown',
              movie_like:'unknown',
              me_intro:'User is lazy, did not leave any bio',
            }
            ProfileService.postProfile(newUserProfileMandatory)
          }
          else
          {console.log(profile.user_id,'yes')}
      }
      )

    ProfileService.getProfile()
      .then(profile => {
        console.log(profile)
        const currentUser = profile.filter(user => user.user_id === this.context.user.id)
        this.setState({
          currentUser: currentUser,
          allUsers: profile
        })
        
      const allUsers = (!this.state.allUsers) ? [] : this.state.allUsers
      const loggedinUser = this.state.currentUser

      // get gender of logged in user from id
      const loggedinUserGender = loggedinUser.map(user => user.gender)

      // filter users whose gender does not match the logged in user gender
      const filteredUsers = allUsers.filter(user => user.gender !== loggedinUserGender.toString())

      this.setState({
        filteredProfileInfo: filteredUsers
      })
      this.setState({
        currentImageId: this.state.filteredProfileInfo[this.state.currentImageIndex].id
      })
    })
  }

  prevPicture = () => {
    // find index of last image in the array
    const lastIndex = this.state.filteredProfileInfo.length - 1;

    const { currentImageIndex } = this.state;

    //check if we need to start over from the last index
    const resetIndex = currentImageIndex === 0;

    const index = resetIndex ? lastIndex : currentImageIndex - 1;

    //assign the logical index to currentImageIndex that will use in render method
    this.setState({
      currentImageIndex: index
    })
  }

  nextPicture = () => {
    //find index of the last image in array
    const lastIndex = this.state.filteredProfileInfo.length - 1;

    const { currentImageIndex } = this.state;

    //check if we need to start over from the last index
    const resetIndex = currentImageIndex === lastIndex;
    const index = resetIndex ? 0 : currentImageIndex + 1;

    //assign the logical index to currentImageIndex that will use in render method
    this.setState({
      currentImageIndex: index
    })
  }

  handleEventifyButton = () => {
    this.setState({ showEventifyForm: true })
  }

  renderEvents() {
    const userEvents = (this.state.events.length === 0) ? 'You have no events yet'
    : this.state.events.map((event, i) => 
      <div key={i}>
        <Link to={`/events/${event.id}`}>{event.event_name}</Link>
      </div>
      )
    return userEvents;
  }

  renderEventifyButton() {
    const userGender = this.state.currentUser.map(user => user.gender)
    const gender = userGender.toString()

    const userId = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].user_id
    const userName = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].full_name

    if (this.state.events.length === 0) {
      return ( <p className="eventify-message">You must first create an event before eventifying this person! </p>)
    } else {
      if (gender === "female") {
      return <Link to={{
        pathname: '/eventifyForm',
        state: { userId: userId, userGender: gender }
      }}>Eventify {userName}</Link>
    } else { 
      return <Link to={{
        pathname: '/eventifyForm',
        state: { userId: userId, userGender: gender }
      }}>Eventify {userName}</Link>
    }
    }
  }
 
  render(){
    const userPic = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].profile_picture
    
    const userId = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].user_id

    const userName = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].full_name

    return(
      <div className='dashboard_container'>
      <div className="dashboard">
        <div className='left_button'>
          <button className="left-btn btn" onClick={this.prevPicture}>{'<'}</button>
        </div>
        <div className="dashboard-pic">
          
          <div className="picture-carousel">
          <h3 className="picture-name">{userName}</h3>
          <Link to={`/profile/${userId}`}><img src={userPic} alt=''/></Link>
          </div>
          <div className='eventify_link_button'>
        {this.renderEventifyButton()}
        </div>
          
        </div>
        <div className='right_button'>
          <button className="right-btn btn" onClick={this.nextPicture}>{'>'}</button>
        </div>
        
      </div>
      <div className="create_event_container">
        <div className='create_event'>
        <Link to='/createEvent'>Create Event</Link>
        </div>
        <div className='upcoming_event_title'>
          Your upcoming events:
        </div>
        <div className='upcoming_events'>
        {this.renderEvents()}
        </div>
      </div>
      </div>
    )
  }
}