import React from 'react'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import Button from '../../Components/Button/Button'
import './EventifyForm.css'
import EventifyService from '../../Services/eventify-service';


export default class EventifyForm extends React.Component{
  state = {
    events: [],
    selectedValue: '',
    recipientUserId: []
  }

  static contextType = UserContext

  componentDidMount() {
    const {userId} = this.props.location.state
    console.log(userId)
    this.setState({ recipientUserId: userId })

    EventService.getEvents()
      .then(event => {
        const eventList = event.filter(ev => ev.event_owner_id === this.context.user.id)
        this.setState({ events: eventList})
      })
  }

  handleMenuChange = (selectedValue) => {
    this.setState({ selectedValue })
  }

  handleChooseEvent = (e) => {
    e.preventDefault()
    const userId = this.state.recipientUserId

    const { event } = e.target;
    
    EventifyService.postEventify({
      recipient_id: userId,
      event: event.value,
    })
      .then(response => {
        console.log(response)
        event.value = ''
      })
    //this.props.history.push('/notificationSent')
  }

  routeChange = () => {
    this.props.history.push('/');
  }

  
  render() {
    console.log(this.state.recipientUserId)

    const events = (!this.state.events) ? [] : this.state.events.map(event => 
      <option key={event.id} value={event.id} id='event'>{event.event_name}</option>
      )
     
    return(
      <div className="eventify-form">
        <fieldset>
          <form onSubmit={this.handleChooseEvent}>
            <h2>Choose one of your events to invite this person:</h2>
            <select  
              name="event" 
              onChange={e => this.handleMenuChange(e.target.value)} >
              {events}
            </select><br></br>
            <Button>Choose event</Button><br></br>
            <Button type="click" onClick={this.routeChange}>Cancel</Button>    
          </form>
        </fieldset>
      </div>
    )
  }
}
