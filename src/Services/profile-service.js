import config from '../config'

const ProfileService = {
getProfile() {
  return fetch(`${config.API_ENDPOINT}/user_profile`, {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    },
  })
    .then(res =>
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
}

module.exports = ProfileService;