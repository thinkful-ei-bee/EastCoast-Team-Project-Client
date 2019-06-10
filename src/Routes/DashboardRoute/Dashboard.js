import React from 'react';
import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    userPictures: [],
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

  renderUserPictures() {
    const userPics = (!this.state.userPictures) ? []
    : <div>
         <img src={this.state.userPictures[0]} alt='profile'/>
      </div>

    return userPics;
  }

  render(){
    return(
      <div className="dashboard">
        <div className="picture-carousel">
          {this.renderUserPictures()}
          <button >Next</button>
        </div>
        <button type="click">Eventify Her</button>
        <button type="click">Create an event</button>
      </div>
    )
  }
}