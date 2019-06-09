import config from '../config'

const ProfileService = {
getProfile() {
  return fetch(`${config.API_ENDPOINT}/user_profile`, {
  })
    .then(res =>
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}

export default ProfileService;