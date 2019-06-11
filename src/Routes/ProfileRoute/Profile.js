import React from 'react'
import ProfileService from '../../Services/profile-service'
import UserProfile from './AddProfile';

export default class Profile extends React.Component{
  state = {
    userInfo: []
  }

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        // console.log(profile)
        this.setState({
          userInfo: profile,
        })
      })
  }

  

  render(){
    console.log(this.state.userInfo);
    const users = this.state.userInfo.map((info) => 
      <div>
        <li>{info.me_intro}</li>
        <li>{info.music_like}</li>
        <li>{info.movie_like}</li>
      </div>
    )
    return(
      <div>
        <UserProfile />
        {users}
      </div>
    )
  }
}

