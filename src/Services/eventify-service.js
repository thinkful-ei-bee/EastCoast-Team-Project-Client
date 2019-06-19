import config from '../config'
import TokenService from './token-service';

const EventifyService = {
  getEventify(){
    return fetch(`${config.API_ENDPOINT}/eventify`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postEventify(recipient_id, event) {
    return fetch(`${config.API_ENDPOINT}/eventify`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(recipient_id, event),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  editEventify(  event_id, event, recipient_id, is_accept ) {
    return fetch(`${config.API_ENDPOINT}/eventify/${event_id}`, {
      method: 'PATCH',
      headers:{
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
       }, 
       body: JSON.stringify( event, recipient_id, is_accept ),
    })
      .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  }
}

export default EventifyService;