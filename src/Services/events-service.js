import config from '../config'
import TokenService from './token-service';

const EventsService = {
  getAllEvents() {
    return fetch(`${config.REACT_APP_API_BASE}/events/all-event`, {
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
  getEventsForCurrentUser(){
    return fetch(`${config.REACT_APP_API_BASE}/events`, {
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
  postEvents(event_name, event_date, event_time, event_location, event_details, is_private) {
    return fetch(`${config.REACT_APP_API_BASE}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(event_name, event_date, event_time, event_location, event_details, is_private),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getEventById(id) {
    return fetch(`${config.REACT_APP_API_BASE}/events/${id}`, {
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
  // deleteEvent(eventId) {
  //   return fetch(`${config.REACT_APP_API_BASE}/events/${eventId}`, {
  //       method: "DELETE"
  //     })
  // },
  // updateEvents(eventId) {

  // }
}

export default EventsService;