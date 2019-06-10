import React from 'react';
//import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    userPictures: [],
    currentImageIndex: 0
  }

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
<<<<<<< HEAD
        console.log(profile)
||||||| merged common ancestors
        console.log.log(profile)
=======
        const userProfilePictures = profile.map(pic => pic.profile_picture)
>>>>>>> 2af7768b1f93e89c9e9e65df5f9e687029d06c98
        this.setState({
          userPictures: userProfilePictures
        })
      })
  }

  // renderUserPictures() {
  //   const userPics = (!this.state.userPictures) ? []
  //   : <div>
  //        <img src={this.state.userPictures[0]} alt='profile'/>
  //     </div>

  //   return userPics;
  // }

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
        
        <button type="click" className="btn">Eventify Her</button>
        <button type="click" className="btn">Create an event</button>
      </div>
    )
  }
}