import React from 'react';
import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import AuthApiService from '../../Services/auth-api-service'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    allUsers: [],
    allProfileInfo: [],
    filteredProfileInfo: [],
    events: [],
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
        this.setState({
          userPictures: profile,
        })

      AuthApiService.getUsers()
      .then(users => {
        this.setState({ allUsers: users })

        const allUsers = (!this.state.allUsers) ? [] : this.state.allUsers
        const allProfiles = (!this.state.userPictures) ? [] : this.state.userPictures

        const loggedinUser = allUsers.filter(user => {
          return user.id === this.context.user.id
        })

        // get gender of logged in user from id
        const loggedinUserGender = loggedinUser.map(user => user.gender)
        
        // filter allUsers array so that only the users that match the users in allProfiles match
        let results = allUsers.filter(o1 => {
          return allProfiles.some(o2 => {
            return o1.id === o2.id;
          })
        }) 
        
        // filters allUsers whose gender does not match logged in user gender
        let filteredGender = results.filter(user => user.gender !== loggedinUserGender.toString()) 
        
        // gets ID of filtered gender from allUsers
        const filteredGenderId = filteredGender.map(user => user.id)

        // filter from allProfiles whose id does not match id of filtered gender
        let filteredProfiles = allProfiles.filter(user => parseInt(user.id) === parseInt(filteredGenderId))
        
        this.setState({ filteredProfileInfo: filteredProfiles })
        const filteredPics = this.state.filteredProfileInfo.map(user => user.profile_picture)  
      })
    })
  }

  prevPicture = () => {
    // find index of last image in the array
    const lastIndex = this.state.filteredProfileInfo.length - 1;

    //check if we need to start over from the last index
    const resetIndex = this.state.currentImageIndex === 0;
    const index = resetIndex ? lastIndex : this.state.currentImageIndex - 1;

    //assign the logical index to currentImageIndex that will use in render method
    this.setState({
      currentImageIndex: index
    })
  }

  nextPicture = () => {
    //find index of the last image in array
    const lastIndex = this.state.filteredProfileInfo.length - 1;

    //check if we need to start over from the last index
    const resetIndex = this.state.currentImageIndex === lastIndex;
    const index = resetIndex ? 0 : this.state.currentImageIndex + 1;

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

  render(){
    // get current image index
    const index = this.state.currentImageIndex;

    // create new array with 1 image with the source images
    let firstImage = this.state.filteredProfileInfo.slice(index, index + 1);

    //check length of new array 
    if (firstImage.length < 1) {
      firstImage = firstImage.concat(this.state.filteredProfileInfo.slice(0, 1-firstImage.length))
    }


    return(
      <div className="dashboard">
        <div className="dashboard-pic">
          <button className="left-btn btn" onClick={this.prevPicture}>{'<'}</button>
          <div className="picture-carousel">
          {firstImage.map((pic, index) => 
            <Link to={`/profile/${pic.id}`} key={index}><img src={pic.profile_picture} alt=''/></Link>
            )}
          </div>
          <button className="right-btn btn" onClick={this.nextPicture}>{'>'}</button>
        </div>
      
        <Link to="/eventifyForm">Eventify Her</Link>
        <Link to="/createEvent">Create Event</Link>

        <h3>Your upcoming events:</h3>
        {this.renderEvents()}
      </div>
    )
  }
}