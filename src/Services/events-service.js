import config from '../config'
import TokenService from './token-service';

const EventsService = {
  getAllEvents() {
    return fetch(`${config.API_ENDPOINT}/events/all-event`, {
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
    return fetch(`${config.API_ENDPOINT}/events`, {
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
  postEvents(eventName, eventDate, eventTime, eventLocation, eventDetails, isPrivate) {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(eventName, eventDate, eventTime, eventLocation, eventDetails, isPrivate),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getEventById(id) {
    return fetch(`${config.API_ENDPOINT}/events/${id}`, {
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
  //   return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
  //       method: "DELETE"
  //     })
  // },
  // updateEvents(eventId) {

  // }
}

export default EventsService;