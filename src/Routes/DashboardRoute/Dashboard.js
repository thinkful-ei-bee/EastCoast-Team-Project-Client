import React from 'react';
//import {Link} from 'react-router-dom'
import ProfileService from '../../Services/profile-service'
import './Dashboard.css'

export default class Dashboard extends React.Component{
  state = {
    userPictures: '',
  }

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        console.log(profile)
        this.setState({

        })
      })
  }


  render(){
    return(
      <div className="dashboard">
        <div className="event-carousel">
          <h3>Random potential dates</h3>
        </div>
        <button type="click">Eventify Her</button>
        <button type="click">Create an event</button>
      </div>
    )
  }
}