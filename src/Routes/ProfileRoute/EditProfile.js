import React from 'react';

export default class EditProfile extends React.Component {

    state = {
        //help me. not sure
    }

    componentDidMount() {
        const userId = this.props.match.params.user_id
        fetch(`http://localhost:8000/api/user_profile/${userId}`, {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch(`http://localhost:8000/api/user_profile/${this.props.match.params.userId}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state.inputValues)
        })
    }



    render() { 
        const {} = this.state //whenever we talk about this
        return (
            <div>
                <h2>Edit Profile</h2>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="me_intro">Profile Picture</label>
                    <input
                        required
                        name="me_intro"
                        type="text"
                        defaultValue={this.state.me_intro}
                        onChange={this.onFormChange}
                    />
                    <label htmlFor="me_intro">Bio:</label>
                    <textarea
                        required
                        name="me_intro"
                        type="text"
                        defaultValue={this.state.me_intro}
                        onChange={this.onFormChange}>
                    </textarea>
                    <label htmlFor="music_like">Music Interests:</label>
                    <input
                        required
                        name="music_like"
                        type="text"
                        defaultValue={this.state.music_like}
                        onChange={this.onFormChange}
                    />
                    <label htmlFor="movie_like">Movie Interests:</label>
                    <input
                        required
                        name="movie_like"
                        type="text"
                        defaultValue={this.state.movie_like}
                        onChange={this.onFormChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}