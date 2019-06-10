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
      </div>
    )
  }
}

const UserInfo = props => {
  return (
    <h1>{UserInfo}</h1>
  )
}