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
  }
}

export default ProfileService;