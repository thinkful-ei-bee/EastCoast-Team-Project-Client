import React from 'react'
import ProfileService from '../../Services/profile-service'
import UserContext from '../../contexts/UserContext';
import AddUserProfile from '../../Components/addProfileForm/addProfileForm';

export default class Profile extends React.Component{
  state = {
    currentUserProfile: []
  }

  static contextType = UserContext

  
// Inside other components, such as the list of articles, we would use a Link component from react-router-dom to link to this Route for any specific article.
// Clicking on that link would navigate to the new route where we display an edit form: <Link to={`/edit/${props.id}`}>Edit Article</Link>

  componentDidMount() {
    ProfileService.getCurrentUserProfile()
      .then(profile => {
        //  console.log(profile,'test profile')
        //const users = profile.filter(ev => ev.id === this.context.user.id)
        this.setState({
          currentUserProfile: profile
        })
        //console.log(this.state.currentUserProfile,'test current user');
      })
  }

  

  render(){
   
    // const users = this.state.userInfo.map((info) => 
    //   <div>
    //     <li>{info.me_intro}</li>
    //     <li>{info.music_like}</li>
    //     <li>{info.movie_like}</li>
    //   </div>
    // )
    console.log(this.state.currentUserProfile,'test')
    return(
      <div>
        <AddUserProfile />
        
      </div>
    )
  }
}