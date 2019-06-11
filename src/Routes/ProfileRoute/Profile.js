import React from 'react'
import ProfileService from '../../Services/profile-service'

export default class Profile extends React.Component{
  state = {
    userInfo: []
  }

  componentDidMount() {
    ProfileService.getProfile()
      .then(profile => {
        // console.log(profile)
        this.setState({
          userInfo: profile
        })
      })
  }

  render(){
    console.log(this.state.userInfo);
    // const users = userInfo.map((info) => 
    // <userInfo {...info} />
    // )
    const users = this.state.userInfo.map((info) =>
      <UserInfo {...info} />
    )
    return(
      <div>
        <UserInfo users={users} />
        <UserProfile />
      </div>
    )
  }
}

const UserInfo = props => {
  return (
    <h1>{UserInfo}</h1>
  )
}

class UserProfile extends React.Component {
  state = {
    music_like: '',
    movie_like: '',
    me_intro: ''
  }
  render () {
    return (
      <form>
        <label htmlFor="me_intro">Bio:</label>
        <input
          required
          name="me_intro"
          type="text"
          value={this.state.me_intro}
        />
        <label htmlFor="music_like">Music Interests:</label>
        <input
          required
          name="music_like"
          type="text"
          value={this.state.music_like}
        />
        <label htmlFor="movie_like">Movie Interests:</label>
        <input
          required
          name="movie_like"
          type="text"
          value={this.state.movie_like}
        />
        <button type="submit">Sumbit</button>
      </form>
    )
  }
}