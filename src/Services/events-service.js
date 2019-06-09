import config from '../config'

const RendezvousService = {
  getEvents() {
    return fetch(`${config.API_ENDPOINT}/events`, {
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
  postEvents(eventName, eventDate, eventTime, eventLocation, eventDetails, isPrivate) {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(eventName, eventDate, eventTime, eventLocation, eventDetails, isPrivate),
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

module.exports = RendezvousService;