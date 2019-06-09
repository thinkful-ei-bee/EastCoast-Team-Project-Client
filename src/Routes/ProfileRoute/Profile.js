import React from 'react'
import ProfileService from '../../Services/profile-service'

export default class Profile extends React.Component{
  state = {

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
      <div>Profile</div>
    )
  }
}