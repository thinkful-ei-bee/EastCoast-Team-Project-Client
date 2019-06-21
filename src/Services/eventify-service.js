import config from '../config'
import TokenService from './token-service';

const EventifyService = {
  getEventify(){
    return fetch(`${config.REACT_APP_API_BASE}/eventify`, {
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
    return fetch(`${config.REACT_APP_API_BASE}/eventify`, {
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
    return fetch(`${config.REACT_APP_API_BASE}/eventify/${event_id}`, {
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
  },
  deleteEventify(eventify_id) {
    return fetch(`${config.REACT_APP_API_BASE}/eventify/${eventify_id}`, {
      method: 'DELETE',
      headers:{
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
       }, 
    })
    // .then(res =>
    //   (!res.ok)
    //     ? res.json().then(e => Promise.reject(e))
    //     : res.json()
    //   )
  }
}

export default EventifyService;