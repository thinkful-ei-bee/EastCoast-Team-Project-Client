import config from '../config'
<<<<<<< HEAD
import TokenService from '../Services/token-service'
||||||| merged common ancestors
=======
import TokenService from './token-service'
>>>>>>> 2af7768b1f93e89c9e9e65df5f9e687029d06c98

const ProfileService = {
getProfile(){
  return fetch(`${config.API_ENDPOINT}/user_profile`, {
<<<<<<< HEAD
    headers:{
      'authorization':`bearer ${TokenService.getAuthToken()}`
     }, 
||||||| merged common ancestors
=======
    headers: {
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    }
>>>>>>> 2af7768b1f93e89c9e9e65df5f9e687029d06c98
  })
    .then(res =>
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}

export default ProfileService;