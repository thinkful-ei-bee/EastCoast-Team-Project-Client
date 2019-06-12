import config from '../config'
import TokenService from '../Services/token-service'

const ProfileService = {
getProfile(){
  return fetch(`${config.API_ENDPOINT}/user_profile`, {
    headers:{
      'authorization':`bearer ${TokenService.getAuthToken()}`
     }, 
  })
    .then(res =>
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  postProfile(profile_picture, music_like, movie_like, me_intro) {
    return fetch(`${config.API_ENDPOINT}/user_profile`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(profile_picture, music_like, movie_like, me_intro),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getProfileById(id) {
    return fetch(`${config.API_ENDPOINT}/user_profile/${id}`, {
      headers:{
        'authorization':`bearer ${TokenService.getAuthToken()}`
       }, 
    })
      .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },
}

export default ProfileService;