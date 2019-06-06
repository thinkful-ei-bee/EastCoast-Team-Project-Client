import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
    postUser(user) {
      return fetch(`${config.API_ENDPOINT}/user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
}

export default AuthApiService