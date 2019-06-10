import React from 'react';
import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    userPictures: [],
    currentImageIndex: 0,
    showEventifyForm: false,
    selectValue: false
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

  render(){
    // get current image index
    const index = this.state.currentImageIndex;

    // create new array with 1 image with the source images
    let firstImage = this.state.userPictures.slice(index, index + 1);

    //check length of new array 
    if (firstImage.length < 1) {
      firstImage = firstImage.concat(this.state.userPictures.slice(0, 1-firstImage.length))
    }

    return(
      <div className="dashboard">
        <button className="btn" onClick={this.prevPicture}>{'<'}</button>
        <div className="picture-carousel">
        {firstImage.map((pic, index) => 
          <img key={index} src={pic} alt=''/>
          )}
        </div>
        <button className="btn" onClick={this.nextPicture}>{'>'}</button>
      
        <Link to="/eventifyForm">Eventify Her</Link>
        <Link to="/createEvent">Create Event</Link>
      </div>
    )
  }
}