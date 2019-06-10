import React from 'react';
import {Link} from 'react-router-dom'
import Popup from "reactjs-popup"; 
import ProfileService from '../../Services/profile-service'
import EventService from '../../Services/events-service'
import EventForm from '../../Components/EventForm/EventForm'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    userPictures: [],
    currentImageIndex: 0,
    showEventifyForm: false,
    selectValue: null
  }

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        const userProfilePictures = profile.map(pic => pic.profile_picture)
        this.setState({
          userPictures: userProfilePictures
        })
      })
  }

  prevPicture = () => {
    // find index of last image in the array
    const lastIndex = this.state.userPictures.length - 1;

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
    const lastIndex = this.state.userPictures.length - 1;

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

  handleAddEvent = (e) => {
    e.preventDefault()
    const { event_name, event_date, event_time, event_type, is_private, event_location, event_details } = e.target;

    console.log(event_name.value, event_date.value, event_time.value, event_type.value, is_private.value, event_location.value, event_details.value)

    EventService.postEvents({
      event_name: event_name.value,
      event_date: event_date.value,
      event_time: event_time.value, 
      event_type: event_type.value,
      is_private: is_private.value,
      event_location: event_location.value,
      event_details: event_details.value
    }) 
      .then(response => {
        event_name.value =''
        event_date.value = ''
        event_time.value = ''
        event_type.value = ''
        is_private.value = ''
        event_location.value = ''
        event_details.value = ''
      })
  }

  handleMenuChange = (selectValue) => {
    this.setState({ selectValue })
  }

  render(){
    // get current image index
    const index = this.state.currentImageIndex;

    // create new array with 1 image with the source images
    let firstImage = this.state.userPictures.slice(index, index + 1);

    //check length of new array 
    if (firstImage.length < 1) {
      firstImage = firstImage.concat(this.state.userPictures.slice(0, 1-firstImage.length))
    }

    const showForm = (!this.state.showEventifyForm) ? '' : <EventForm addEvent={this.handleAddEvent} handleChange={this.handleMenuChange} selectValue={this.state.selectValue}/>

    console.log(this.state.selectValue)

    return(
      <div className="dashboard">
          <button className="btn" onClick={this.prevPicture}>{'<'}</button>
          <div className="picture-carousel">
          {firstImage.map((pic, index) => 
            <img key={index} src={pic} alt=''/>
            )}
          </div>
          <button className="btn" onClick={this.nextPicture}>{'>'}</button>
        
        <button type="click" className="btn" >Eventify Her</button>
        {/* <Popup
          trigger={open => (
            <button className="btn"></button>
          )}
          >
        </Popup> */}
        <button type="click" className="btn" onClick={this.handleEventifyButton}>Create an event</button>
        {showForm}
      </div>
    )
  }
}