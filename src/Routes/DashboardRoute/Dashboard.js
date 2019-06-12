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
    showEventifyForm: false,
    selectValue: false
  }

  static contextType = UserContext

  componentDidMount() {
    EventService.getEvents()
      .then(events => {
        const filteredEvents = events.filter(e => e.event_owner_id === this.context.user.id) 
        this.setState({ events: filteredEvents })
      })

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
      //console.log(loggedinUser)

      // get gender of logged in user from id
      const loggedinUserGender = loggedinUser.map(user => user.gender)
     console.log(loggedinUserGender)

      // filter users whose gender does not match the logged in user gender
      const filteredUsers = allUsers.filter(user => user.gender !== loggedinUserGender.toString())

      this.setState({
        filteredProfileInfo: filteredUsers
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
    const userGender = this.state.currentUser.map(user => user.gender.toString())
    if (userGender === 'female') {
      return <Link to="/eventifyForm">Eventify Him</Link>
    } else { return <Link to="/eventifyForm">Eventify Her</Link>}
  }
 
  render(){
    console.log(this.context.user)
    const userPic = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].profile_picture
    
    const userId = (!this.state.filteredProfileInfo[this.state.currentImageIndex]) ? [] : this.state.filteredProfileInfo[this.state.currentImageIndex].id

    return(
      <div className="dashboard">
        <div className="dashboard-pic">
          <button className="left-btn btn" onClick={this.prevPicture}>{'<'}</button>
          <div className="picture-carousel">

          <Link to={`/profile/${userId}`}><img src={userPic} alt=''/></Link>
          </div>

          <button className="right-btn btn" onClick={this.nextPicture}>{'>'}</button>
        </div>
      
        {this.renderEventifyButton()}
        <Link to="/createEvent">Create Event</Link>

        <h3>Your upcoming events:</h3>
        {this.renderEvents()}
      </div>
    )
  }
}