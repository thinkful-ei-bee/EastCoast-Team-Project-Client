
import React from 'react'
import TokenService from '../../Services/token-service.js'
import ProfileService from '../../Services/profile-service'


export default class AddUserProfile extends React.Component {
    state = {
        music_like: '',
        movie_like: '',
        me_intro: '',
        profile_picture: []
    }

    onSubmit = event => {
        console.log('i work');
        event.preventDefault();
        this.submitProfile(this.state);
    }

    onFormChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    submitProfile = (info) => {
        fetch('http://localhost:8000/api/user_profile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                "music_like": info.music_like,
                "movie_like": info.movie_like,
                "me_intro": info.me_intro,
                "profile_picture": info.profile_picture
            })
        })
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="me_intro">Profile Picture</label>
                <input
                    required
                    name="me_intro"
                    type="text"
                    value={this.state.me_intro}
                    onChange={this.onFormChange}
                />
                <label htmlFor="me_intro">Bio:</label>
                <textarea
                    required
                    name="me_intro"
                    type="text"
                    value={this.state.me_intro}
                    onChange={this.onFormChange}>
                </textarea>
                <label htmlFor="music_like">Music Interests:</label>
                <input
                    required
                    name="music_like"
                    type="text"
                    value={this.state.music_like}
                    onChange={this.onFormChange}
                />
                <label htmlFor="movie_like">Movie Interests:</label>
                <input
                    required
                    name="movie_like"
                    type="text"
                    value={this.state.movie_like}
                    onChange={this.onFormChange}
                />
                <button type="submit">Submit</button>
            </form>

        )
    }
}

// const UserProfiles = props => {
//     return (
//         <div>
//             <h2>Bio: {props.me_intro}</h2>
//             <h2>Music Interests: {props.music_like}</h2>
//             <h2>Movie Interests: {props.movie_like}</h2>
//         </div>
//     )
// }