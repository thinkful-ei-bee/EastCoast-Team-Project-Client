import config from '../config'
import TokenService from './token-service';

const EventsService = {
  getEvents() {
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
  postEvents(event_name, event_date, event_time, event_location, event_details, is_private) {
    return fetch(`${config.API_ENDPOINT}/events`, {
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
  // deleteEvent(eventId) {
  //   return fetch(`${config.API_ENDPOINT}/events/${eventId}`, {
  //       method: "DELETE"
  //     })
  // },
  // updateEvents(eventId) {

  // }
}

export default EventsService;