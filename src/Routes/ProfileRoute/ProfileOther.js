import React from 'react'
import ProfileService from '../../Services/profile-service'
import './Profile.css'

export default class ProfileOther extends React.Component{
  state = {
    profile: [],
  }

  componentDidMount() {
    ProfileService.getProfileById(this.props.match.params.id)
      .then(profile => {
        this.setState({ profile: profile})
      })
  }

  render() {
    console.log(this.state.profile)
    const user = this.state.profile
    return(
      <div className="profile">
        <img src={user.profile_picture} alt=''/>
        <p>Bio: {user.me_intro}</p>
      </div>
    )
  }
}